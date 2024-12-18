"use client";
import { Button } from "@/src/custom-ui/button";
import { Card } from "@/src/custom-ui/card";
import { TextInput } from "@/src/custom-ui/TextInput";
import { useState } from "react";
import { p2pTransfer } from "../../../app/lib/actions/p2pTransfer";
import { useSession } from "next-auth/react";
import ErrorModal from "./ErrorModal";
import { CheckPin } from "./CheckPin";
import { useRouter } from "next/navigation";

export function SendCard() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
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
      setIsLoading(true);
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
      setIsLoading(false);
      setNumber("");
      setAmount(0);
      router.refresh();
    }
  };

  return (
    <div className="my-10">
      <Card
        title="Send Money"
        classname="bg-[#1e3a5f] border-none rounded-lg text-gray-300"
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
          buttonText="Send"
          open={showPinModal}
          setOpen={handleTriggerPinModal}
          addMoneyHandler={transferMoneyHandler}
        />
        <div className=" pt-2">
          <TextInput
            classname="bg-[#112d4f] text-gray-200"
            placeholder={"Number"}
            label="Number"
            value={number}
            onChange={(value) => {
              setNumber(value);
            }}
            labelClass="text-gray-200"
          />
          <TextInput
            classname="bg-[#112d4f] text-gray-200"
            placeholder={"Amount"}
            label="Amount"
            value={`${amount}`}
            onChange={(value) => {
              setAmount(Number(value));
            }}
            labelClass="text-gray-200"
          />
          <div className="pt-4 flex justify-center">
            <Button
              disable={
                amount === 0 || number === "" || isLoading ? true : false
              }
              classname="bg-[#4A9FF5] text-gray-100 font-semibold hover:bg-gray-200 hover:text-[#4A9FF5]"
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
              {isLoading ? "Sending..." : "Send"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
