import prisma from "@lm.swiftpay/db";
import express from "express";
import dotenv from "dotenv";
import path from "path";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

const app = express();
app.use(express.json());

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, "../../../packages/db/.env") });

// Initialize Prisma
const initializePrisma = async () => {
  try {
    // Force Prisma to generate client
    await execAsync("npx prisma generate");
    // Test database connection
    await prisma.$connect();
    console.log("Prisma initialized successfully");
  } catch (error) {
    console.error("Failed to initialize Prisma:", error);
    throw error;
  }
};

app.get("/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1`;
    res.json({ status: "healthy", database: "connected" });
  } catch (error) {
    console.error("Health check failed:", error);
    res.status(500).json({
      status: "unhealthy",
      error:
        process.env.NODE_ENV === "development"
          ? error
          : "Internal server error",
    });
  }
});

app.post("/hdfcWebhook", async (req, res) => {
  console.log("Received webhook payload:", req.body);

  const paymentInformation = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
    type: req.body.type,
  };

  try {
    const result = await prisma.$transaction([
      prisma.balance.updateMany({
        where: {
          userId: Number(paymentInformation.userId),
        },
        data: {
          amount:
            paymentInformation.type === "credit"
              ? { increment: Number(paymentInformation.amount) }
              : { decrement: Number(paymentInformation.amount) },
        },
      }),
      paymentInformation.type === "credit"
        ? prisma.onRampTransaction.updateMany({
            where: { token: paymentInformation.token },
            data: { status: "Success" },
          })
        : prisma.offRampTransaction.updateMany({
            where: { token: paymentInformation.token },
            data: { status: "Success" },
          }),
    ]);

    console.log("Transaction processed successfully:", result);
    res.json({ message: "Captured" });
  } catch (error) {
    console.error("Transaction processing error:", error);
    res.status(500).json({ message: "Error while processing webhook" });
  }
});

// Initialize Prisma before starting the server
initializePrisma()
  .then(() => {
    if (process.env.NODE_ENV !== "production") {
      app.listen(3003, () => {
        console.log("Webhook server running on port 3003");
      });
    }
  })
  .catch((error) => {
    console.error("Failed to start server:", error);
    process.exit(1);
  });

export default app;
