"use client";

import React, { useState } from "react";
import { UpdateModal } from "./UpdateModal";
import { EditIcon } from "../constants/Icons";

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
          <h4 className="block mb-2 text-sm font-medium text-gray-200">
            {label}
          </h4>
          <div className="bg-[#14345c] border-[#0f2847] rounded-md flex items-center pr-5">
            <input
              className="w-full py-2 px-5 bg-inherit rounded-md outline-none"
              value={value}
              type={label == "Pin" ? "password" : "text"}
            ></input>
            <div onClick={handleModalTrigger}>
              <EditIcon />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileData;
