import db from "@lm.swiftpay/db";
import express from "express";
import dotenv from "dotenv";
import path from "path";

const app = express();
app.use(express.json());

dotenv.config({ path: path.resolve(__dirname, "../../../packages/db/.env") });

app.post("/hdfcWebhook", async (req, res) => {
  //TODO: Add zod validation here?
  //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
  const paymentInformation: {
    token: string;
    userId: string;
    amount: string;
    type: string;
  } = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
    type: req.body.type,
  };

  // Update balance in db, add txn
  try {
    await db.$transaction([
      db.balance.updateMany({
        where: {
          userId: Number(paymentInformation.userId),
        },
        data: {
          amount:
            paymentInformation.type == "credit"
              ? {
                  increment: Number(paymentInformation.amount),
                }
              : paymentInformation.type == "debit"
                ? {
                    decrement: Number(paymentInformation.amount),
                  }
                : {},
        },
      }),
      paymentInformation.type == "credit"
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

    res.json({
      message: "Captured",
    });
  } catch (e) {
    console.error(e);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(3003);
