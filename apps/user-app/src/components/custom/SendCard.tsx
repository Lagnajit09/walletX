"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Center } from "@repo/ui/center";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../../../app/lib/actions/p2pTransfer";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="w-[40%] mt-10">
      <Card
        title="Send"
        classname="bg-[#023e8a] rounded-lg text-gray-300"
        titleClass="text-white font-semibold"
      >
        <div className="min-w-72 pt-2">
          <TextInput
            placeholder={"Number"}
            label="Number"
            onChange={(value) => {
              setNumber(value);
            }}
            labelClass="text-gray-200"
          />
          <TextInput
            placeholder={"Amount"}
            label="Amount"
            onChange={(value) => {
              setAmount(value);
            }}
            labelClass="text-gray-200"
          />
          <div className="pt-4 flex justify-center">
            <Button
              onClick={async () => {
                await p2pTransfer(number, Number(amount) * 100);
              }}
              classname="bg-gray-100 text-gray-800 font-semibold hover:bg-gray-800 hover:text-gray-100"
            >
              Send
            </Button>{" "}
          </div>
        </div>
      </Card>
    </div>
  );
}
