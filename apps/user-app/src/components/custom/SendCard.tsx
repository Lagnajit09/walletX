"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { TextInput } from "@repo/ui/textinput";
import { useState } from "react";
import { p2pTransfer } from "../../../app/lib/actions/p2pTransfer";
import { useSession } from "next-auth/react";
import ErrorModal from "./ErrorModal";
import { CheckPin } from "./CheckPin";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState(0);
  const [errMsg, setErrMsg] = useState({
    title: "",
    description: "",
  });
  const [showError, setShowError] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const session = useSession();

  const handleTriggerPinModal = () => {
    setShowPinModal(!showPinModal);
  };

  const transferMoneyHandler = async (pinIsValid: boolean) => {
    if (!pinIsValid) {
      setErrMsg({
        title: "Incorrect Pin",
        description: "Please provide the correct pin.",
      });
      setShowError(true);
      return;
    }
    try {
      await p2pTransfer(number, amount * 100);
      setErrMsg({
        title: "Success",
        description: `${amount} INR sent to ${number} successfully!`,
      });
      setShowError(true);
    } catch (error) {
      setErrMsg({
        title: "Failed",
        description: "Failed to send money.",
      });
      setShowError(true);
    } finally {
      window.location.reload();
    }
  };

  return (
    <div className="w-[40%] mt-10">
      <Card
        title="Send"
        classname="bg-[#023e8a] rounded-lg text-gray-300"
        titleClass="text-white font-semibold"
      >
        <ErrorModal
          title={errMsg.title}
          description={errMsg.description}
          continueBtn="Okay"
          open={showError}
          setOpen={setShowError}
        />
        <ErrorModal
          title={errMsg.title}
          description={errMsg.description}
          continueBtn="Okay"
          open={showError}
          setOpen={setShowError}
        />
        <CheckPin
          open={showPinModal}
          setOpen={handleTriggerPinModal}
          addMoneyHandler={transferMoneyHandler}
        />
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
              setAmount(Number(value));
            }}
            labelClass="text-gray-200"
          />
          <div className="pt-4 flex justify-center">
            <Button
              disable={amount === 0 || number === "" ? true : false}
              classname="bg-white text-black font-semibold hover:bg-gray-200"
              onClick={async () => {
                if (session?.data?.user?.pin) {
                  handleTriggerPinModal();
                } else {
                  setErrMsg({
                    title: "Please Set Your Pin First!",
                    description:
                      "To update your pin, Go to Profile > Settings > Pin",
                  });
                  setShowError(true);
                }
              }}
            >
              Send
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
