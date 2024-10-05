"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createOnRampTransaction } from "../../../app/lib/actions/createOnrampTransaction";
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

export const AddMoney = () => {
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

  const addMoneyHandler = async (pinIsValid: boolean) => {
    if (!pinIsValid) {
      setErrMsg({
        title: "Incorrect Pin",
        description: "Please provide the correct pin.",
      });
      setShowError(true);
      return;
    }

    await createOnRampTransaction(provider, value);
    window.location.reload();
  };

  return (
    <Card title="Add Money">
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
        addMoneyHandler={addMoneyHandler}
      />

      <div className="w-full">
        <TextInput
          label={"Amount"}
          placeholder={"Amount"}
          onChange={(val) => {
            setValue(Number(val));
          }}
        />
        <div className="py-4 text-left">Bank</div>
        <Select
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
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};
