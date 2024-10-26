// import db from "@repo/db/client";
// import express from "express";
// import dotenv from "dotenv";
// import path from "path";

// const app = express();
// app.use(express.json());

// dotenv.config({ path: path.resolve(__dirname, "../../../packages/db/.env") });

// app.post("/hdfcWebhook", async (req, res) => {
//   //TODO: Add zod validation here?
//   //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
//   const paymentInformation: {
//     token: string;
//     userId: string;
//     amount: string;
//     type: string;
//   } = {
//     token: req.body.token,
//     userId: req.body.user_identifier,
//     amount: req.body.amount,
//     type: req.body.type,
//   };

//   // Update balance in db, add txn
//   try {
//     await db.$transaction([
//       db.balance.updateMany({
//         where: {
//           userId: Number(paymentInformation.userId),
//         },
//         data: {
//           amount:
//             paymentInformation.type == "credit"
//               ? {
//                   increment: Number(paymentInformation.amount),
//                 }
//               : paymentInformation.type == "debit"
//                 ? {
//                     decrement: Number(paymentInformation.amount),
//                   }
//                 : {},
//         },
//       }),
//       paymentInformation.type == "credit"
//         ? db.onRampTransaction.updateMany({
//             where: {
//               token: paymentInformation.token,
//             },
//             data: {
//               status: "Success",
//             },
//           })
//         : db.offRampTransaction.updateMany({
//             where: {
//               token: paymentInformation.token,
//             },
//             data: {
//               status: "Success",
//             },
//           }),
//     ]);

//     res.json({
//       message: "Captured",
//     });
//   } catch (e) {
//     console.error(e);
//     res.status(411).json({
//       message: "Error while processing webhook",
//     });
//   }
// });

// app.listen(3003);

import db from "@repo/db/client";
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { z } from "zod";
import cors from "cors";

// Validation schema using Zod
const webhookSchema = z.object({
  token: z.string().min(1),
  user_identifier: z.string().min(1),
  amount: z.string().min(1),
  type: z.enum(["credit", "debit"]),
});

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../../../packages/db/.env") });

// Health check endpoint
app.get("/health", (_, res) => {
  res.json({ status: "ok" });
});

app.post("/hdfcWebhook", async (req, res) => {
  try {
    // Validate request body
    const validatedData = webhookSchema.parse(req.body);

    const paymentInformation = {
      token: validatedData.token,
      userId: validatedData.user_identifier,
      amount: validatedData.amount,
      type: validatedData.type,
    };

    // Convert amount to number and validate
    const amountNumber = Number(paymentInformation.amount);
    if (isNaN(amountNumber) || amountNumber <= 0) {
      return res.status(400).json({
        success: false,
        message: "Invalid amount value",
      });
    }

    // Convert userId to number and validate
    const userIdNumber = Number(paymentInformation.userId);
    if (isNaN(userIdNumber)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user identifier",
      });
    }

    // Check if user exists
    const userExists = await db.balance.findFirst({
      where: {
        userId: userIdNumber,
      },
    });

    if (!userExists) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Perform database transaction
    await db.$transaction([
      // Update balance
      db.balance.updateMany({
        where: {
          userId: userIdNumber,
        },
        data: {
          amount: {
            [paymentInformation.type === "credit" ? "increment" : "decrement"]:
              amountNumber,
          },
        },
      }),
      // Update transaction status
      paymentInformation.type === "credit"
        ? db.onRampTransaction.updateMany({
            where: {
              token: paymentInformation.token,
            },
            data: {
              status: "Success",
            },
          })
        : db.offRampTransaction.updateMany({
            where: {
              token: paymentInformation.token,
            },
            data: {
              status: "Success",
            },
          }),
    ]);

    return res.status(200).json({
      success: true,
      message: "Payment processed successfully",
    });
  } catch (error) {
    console.error("Webhook Error:", error);

    // Handle Zod validation errors
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        success: false,
        message: "Invalid request data",
        errors: error.errors,
      });
    }

    // Handle Prisma errors
    if (
      error instanceof Error &&
      error.name === "PrismaClientKnownRequestError"
    ) {
      return res.status(400).json({
        success: false,
        message: "Database operation failed",
        error:
          process.env.NODE_ENV === "development"
            ? error.message
            : "Database error",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

// Global error handler
app.use(
  (
    err: Error,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Global Error:", err);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Something went wrong",
    });
  }
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

// Handle uncaught exceptions
process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});

const port = process.env.PORT || 3003;

// Only start server if not in test environment
if (process.env.NODE_ENV !== "test") {
  app.listen(port, () => {
    console.log(`Bank webhook server running on port ${port}`);
  });
}

export default app;
