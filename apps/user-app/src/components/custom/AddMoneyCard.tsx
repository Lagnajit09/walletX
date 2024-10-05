"use client";
import { Button } from "@repo/ui/button";
import { Card } from "@repo/ui/card";
import { Select } from "@repo/ui/select";
import { useState } from "react";
import { TextInput } from "@repo/ui/textinput";
import { createOnRampTransaction } from "../../../app/lib/actions/createOnrampTransaction";
import { useSession } from "next-auth/react";
import ErrorModal from "./ErrorModal";

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
  const session = useSession();

  return (
    <Card title="Add Money">
      <ErrorModal
        title="Please Set Your Pin First!"
        description="To update your pin, Go to Profile > Settings > Pin"
        continueBtn="Okay"
        open={showError}
        setOpen={setShowError}
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
                const res = await createOnRampTransaction(provider, value);
                window.location.reload();
              } else {
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
