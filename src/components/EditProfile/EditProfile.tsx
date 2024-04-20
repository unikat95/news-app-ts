import React, { ChangeEvent, useContext, useState } from "react";

import { NewsContext, UserProps } from "../../context/NewsContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/Firebase";

import EditProfileInput from "../EditProfileInput/EditProfileInput";

type EditProfileProps = {
  user: UserProps | null | undefined;
};

export default function EditProfile({ user }: EditProfileProps) {
  const { currentUser, setOpenPopout } = useContext(NewsContext) || {};
  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    age: user?.age || "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleApplyChanges = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (Object.values(formData).some((value) => value === "")) return;

    if (currentUser) {
      const userRef = doc(db, "users", currentUser.id);

      await updateDoc(userRef, {
        ...formData,
        completed: true,
        inEditing: false,
      });
    }

    setFormData({
      firstName: "",
      lastName: "",
      age: "",
    });

    if (setOpenPopout) {
      setOpenPopout(true);
    }
  };

  const handleCancelChanges = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (currentUser) {
      const userRef = doc(db, "users", currentUser.id);

      await updateDoc(userRef, { inEditing: false });
    }
  };

  const handleContentClick = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
  };

  return (
    <>
      <div
        className="w-[100dvw] h-[100dvh] flex justify-center items-center fixed top-0 left-0 bg-slate-900 bg-opacity-90 modal-bg"
        onClick={handleCancelChanges}
      >
        <div
          className="w-full max-w-[90%] sm:max-w-[60%] lg:max-w-[40%] xl:max-w-[25%] flex flex-col gap-6 bg-white p-6 rounded-xl modal-anim"
          onClick={handleContentClick}
        >
          <h1 className="flex justify-center items-center text-2xl font-medium">
            User detail
          </h1>
          <form className="w-full flex flex-col gap-7">
            <div className="w-full flex flex-col gap-4">
              <EditProfileInput
                name="First name"
                type="text"
                value="firstName"
                formData={formData.firstName}
                handleInputChange={handleInputChange}
              />
              <EditProfileInput
                name="Last name"
                type="text"
                value="lastName"
                formData={formData.lastName}
                handleInputChange={handleInputChange}
              />
              <EditProfileInput
                name="Age"
                type="number"
                value="age"
                formData={formData.age}
                handleInputChange={handleInputChange}
              />
            </div>
            <div className="flex justify-end items-center gap-2">
              <button
                className="bg-green-500 hover:bg-green-400 text-white px-4 py-2 rounded-md"
                onClick={handleApplyChanges}
              >
                Save
              </button>
              {currentUser?.completed && (
                <button
                  className="bg-red-500 hover:bg-red-400 text-white px-4 py-2 rounded-md"
                  onClick={handleCancelChanges}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
