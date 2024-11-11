"use client";
import { Button } from "@lm.swiftpay/ui/button";
import { Card } from "@lm.swiftpay/ui/card";
import { Select } from "@lm.swiftpay/ui/select";
import { useState } from "react";
import { TextInput } from "@lm.swiftpay/ui/textinput";
import { useSession } from "next-auth/react";
import ErrorModal from "./ErrorModal";
import { CheckPin } from "./CheckPin";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

interface TransferMoneyProps {
  title: string;
  callbackFunc: Function;
  btnText: string;
}

export const TransferMoney = ({
  title,
  callbackFunc,
  btnText,
}: TransferMoneyProps) => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [value, setValue] = useState(0);
  const [showError, setShowError] = useState(false);
  const [showPinModal, setShowPinModal] = useState(false);
  const session = useSession();
  const [errMsg, setErrMsg] = useState({
    title: "",
    description: "",
  });

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

    await callbackFunc(provider, value);
    window.location.reload();
  };

  return (
    <Card
      title={title}
      classname="bg-[#1e3a5f] rounded-lg border-none"
      titleClass="text-white font-semibold"
    >
      <ErrorModal
        title={errMsg.title}
        description={errMsg.description}
        continueBtn="Okay"
        open={showError}
        setOpen={setShowError}
      />
      <CheckPin
        buttonText={title}
        open={showPinModal}
        setOpen={handleTriggerPinModal}
        addMoneyHandler={transferMoneyHandler}
      />

      <div className="w-full">
        <TextInput
          label={"Amount"}
          placeholder={"Amount"}
          labelClass="text-gray-400"
          classname="bg-[#112d4f] text-gray-200"
          onChange={(val) => {
            setValue(Number(val));
          }}
        />
        <div className="py-4 text-left text-gray-400">Bank</div>
        <Select
          classname="bg-[#112d4f] text-gray-200"
          onSelect={(value) => {
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
            );
            setProvider(
              SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
            );
          }}
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.name,
          }))}
        />
        <div className="flex justify-center pt-4">
          <Button
            disable={value === 0 ? true : false}
            classname="bg-[#4A9FF5] text-gray-100 font-semibold hover:bg-gray-200"
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
            {btnText}
          </Button>
        </div>
      </div>
    </Card>
  );
};
