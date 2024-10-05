import React, { useState } from "react";
import { UpdateModal } from "./UpdateModal";

interface profileDataProps {
  label: string;
  value: string;
}

const ProfileData = ({ label, value }: profileDataProps) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalTrigger = () => {
    setShowModal(!showModal);
  };

  return (
    <div className="">
      <UpdateModal
        open={showModal}
        setOpen={handleModalTrigger}
        field={label}
        value={value}
      />
      <div className="flex gap-2 items-center">
        <div className="w-full mb-4">
          <h4 className="block mb-2 text-sm font-medium text-gray-900">
            {label}
          </h4>
          <p className="border-b w-full p-2">{value}</p>
        </div>
        <div onClick={handleModalTrigger}>
          <EditIcon />
        </div>
      </div>
    </div>
  );
};

export default ProfileData;

export function EditIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="1.5"
      stroke="currentColor"
      className="size-4 cursor-pointer text-gray-800"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
      />
    </svg>
  );
}
