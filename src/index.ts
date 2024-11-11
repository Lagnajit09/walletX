import express from "express";
import { PrismaClient } from "@prisma/client";
import * as dotenv from "dotenv";
import path from "path";
import cors from "cors";

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../.env") });

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL is not set");
  throw new Error("DATABASE_URL environment variable is required");
}

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
  log: ["error", "warn"],
});

// Verify database connection
const validateDbConnection = async () => {
  try {
    await prisma.$connect();
    console.log("Database connection established");
  } catch (error) {
    console.error("Database connection failed:", error);
    process.exit(1);
  }
};

// Initialize database connection
validateDbConnection();

const app = express();
app.use(express.json());
app.use(cors());

// Root route
app.get("/", (req, res) => {
  res.json({ status: "Server is running" });
});

// Health check route
app.get("/health", async (req, res) => {
  console.log("Health check requested");
  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log("Database connection successful");
    res.json({
      status: "healthy",
      database: "connected",
      env: process.env.NODE_ENV,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error("Health check failed:", error);
    res.status(500).json({
      status: "unhealthy",
      database: "disconnected",
      error:
        process.env.NODE_ENV === "development"
          ? error
          : "Internal server error",
      timestamp: new Date().toISOString(),
    });
  }
});

// Webhook route
app.post("/hdfcWebhook", async (req, res) => {
  console.log("Received webhook request:", {
    ...req.body,
    database_url_exists: !!process.env.DATABASE_URL,
  });

  const paymentInformation = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
    type: req.body.type,
  };

  try {
    const result = await prisma.$transaction(async (tx: any) => {
      const currentBalance = await tx.balance.findFirst({
        where: { userId: Number(paymentInformation.userId) },
      });
      console.log("Current balance:", currentBalance);

      await tx.balance.updateMany({
        where: {
          userId: Number(paymentInformation.userId),
        },
        data: {
          amount:
            paymentInformation.type === "credit"
              ? { increment: Number(paymentInformation.amount) }
              : { decrement: Number(paymentInformation.amount) },
        },
      });

      if (paymentInformation.type === "credit") {
        await tx.onRampTransaction.updateMany({
          where: { token: paymentInformation.token },
          data: { status: "Success" },
        });
      } else {
        await tx.offRampTransaction.updateMany({
          where: { token: paymentInformation.token },
          data: { status: "Success" },
        });
      }

      return { success: true };
    });

    console.log("Transaction completed successfully:", result);
    res.json({ message: "Captured", data: result });
  } catch (error: any) {
    console.error("Error processing webhook:", error);
    res.status(500).json({
      message: "Error while processing webhook",
      error:
        process.env.NODE_ENV === "development"
          ? {
              message: error.message,
              cause: error.cause,
            }
          : "Internal server error",
    });
  }
});

// Handle 404
app.use((req, res) => {
  console.log("404 - Route not found:", req.url);
  res.status(404).json({
    error: "Not Found",
    path: req.url,
  });
});

// Error handling middleware
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error("Error:", err);
    res.status(500).json({
      error:
        process.env.NODE_ENV === "development"
          ? err.message
          : "Internal Server Error",
    });
  }
);

// Start server in development
if (process.env.NODE_ENV !== "production") {
  app.listen(3003, () => {
    console.log("Webhook server running on port 3003");
    console.log("Environment:", {
      database_url_exists: !!process.env.DATABASE_URL,
      node_env: process.env.NODE_ENV,
    });
  });
}

export default app;

// import prisma from "@lm.swiftpay/db";
// import express from "express";
// import dotenv from "dotenv";
// import path from "path";
// import { exec } from "child_process";
// import { promisify } from "util";

// const execAsync = promisify(exec);

// const app = express();
// app.use(express.json());

// // Load environment variables
// dotenv.config({ path: path.resolve(__dirname, "../../../packages/db/.env") });

// // Initialize Prisma
// const initializePrisma = async () => {
//   try {
//     // Force Prisma to generate client
//     await execAsync("npx prisma generate");
//     // Test database connection
//     await prisma.$connect();
//     console.log("Prisma initialized successfully");
//   } catch (error) {
//     console.error("Failed to initialize Prisma:", error);
//     throw error;
//   }
// };

// app.get("/health", async (req, res) => {
//   try {
//     await prisma.$queryRaw`SELECT 1`;
//     res.json({ status: "healthy", database: "connected" });
//   } catch (error) {
//     console.error("Health check failed:", error);
//     res.status(500).json({
//       status: "unhealthy",
//       error:
//         process.env.NODE_ENV === "development"
//           ? error
//           : "Internal server error",
//     });
//   }
// });

// app.post("/hdfcWebhook", async (req, res) => {
//   console.log("Received webhook payload:", req.body);

//   const paymentInformation = {
//     token: req.body.token,
//     userId: req.body.user_identifier,
//     amount: req.body.amount,
//     type: req.body.type,
//   };

//   try {
//     const result = await prisma.$transaction([
//       prisma.balance.updateMany({
//         where: {
//           userId: Number(paymentInformation.userId),
//         },
//         data: {
//           amount:
//             paymentInformation.type === "credit"
//               ? { increment: Number(paymentInformation.amount) }
//               : { decrement: Number(paymentInformation.amount) },
//         },
//       }),
//       paymentInformation.type === "credit"
//         ? prisma.onRampTransaction.updateMany({
//             where: { token: paymentInformation.token },
//             data: { status: "Success" },
//           })
//         : prisma.offRampTransaction.updateMany({
//             where: { token: paymentInformation.token },
//             data: { status: "Success" },
//           }),
//     ]);

//     console.log("Transaction processed successfully:", result);
//     res.json({ message: "Captured" });
//   } catch (error) {
//     console.error("Transaction processing error:", error);
//     res.status(500).json({ message: "Error while processing webhook" });
//   }
// });

// // Initialize Prisma before starting the server
// initializePrisma()
//   .then(() => {
//     if (process.env.NODE_ENV !== "production") {
//       app.listen(3003, () => {
//         console.log("Webhook server running on port 3003");
//       });
//     }
//   })
//   .catch((error) => {
//     console.error("Failed to start server:", error);
//     process.exit(1);
//   });

// export default app;
