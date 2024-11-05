import db from "@lm.swiftpay/db";
import express from "express";
import { z } from "zod";
import dotenv from "dotenv";
import path from "path";
import { createServer } from "http";

// Validation schema
const webhookSchema = z.object({
  token: z.string(),
  user_identifier: z.number(),
  amount: z.number(),
  type: z.enum(["credit", "debit"]),
});

const app = express();
app.use(express.json());

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../../../packages/db/.env") });

// Health check endpoint
app.get("/health", async (req, res) => {
  try {
    // Test database connection
    await db.$queryRaw`SELECT 1`;
    res.json({ status: "healthy", database: "connected" });
  } catch (error) {
    console.error("Health check failed:", error);
    res.status(500).json({
      status: "unhealthy",
      database: "disconnected",
      error:
        process.env.NODE_ENV === "development"
          ? error
          : "Internal server error",
    });
  }
});

app.post("/hdfcWebhook", async (req, res) => {
  console.log("Received webhook payload:", req.body);

  try {
    // Validate request body
    const paymentInformation = webhookSchema.parse(req.body);

    // Start transaction
    const result = await db.$transaction(async (tx) => {
      // Update balance
      await tx.balance.updateMany({
        where: {
          userId: Number(paymentInformation.user_identifier),
        },
        data: {
          amount: {
            [paymentInformation.type === "credit" ? "increment" : "decrement"]:
              paymentInformation.amount,
          },
        },
      });

      // Update transaction status
      if (paymentInformation.type === "credit") {
        await tx.onRampTransaction.updateMany({
          where: {
            token: paymentInformation.token,
          },
          data: {
            status: "Success",
          },
        });
      } else {
        await tx.offRampTransaction.updateMany({
          where: {
            token: paymentInformation.token,
          },
          data: {
            status: "Success",
          },
        });
      }

      return { success: true };
    });

    console.log("Transaction processed successfully:", result);
    res.json({
      message: "Captured",
      data: result,
    });
  } catch (error) {
    console.error("Webhook processing error:", error);

    // Check if it's a validation error
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Invalid request data",
        errors: error.errors,
      });
    }

    res.status(500).json({
      message: "Error while processing webhook",
      error:
        process.env.NODE_ENV === "development"
          ? error
          : "Internal server error",
    });
  }
});

// For local development
if (process.env.NODE_ENV !== "production") {
  app.listen(3003, () => {
    console.log("Webhook server running on port 3003");
  });
}

// For Vercel serverless deployment
export default createServer(app);
