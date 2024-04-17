import React, { ChangeEvent, useContext, useState } from "react";
import { NewsContext, UserProps } from "../../context/NewsContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../config/Firebase";

type EditProfileProps = {
  user: UserProps | null | undefined;
};

export default function EditProfile({ user }: EditProfileProps) {
  const { currentUser } = useContext(NewsContext) || {};
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [age, setAge] = useState<string>("");

  const defaultFirstName = user?.firstName;
  const defaultLastName = user?.lastName;
  const defaultAge = user?.age;

  const handleApplyChanges = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (firstName === "" || lastName === "" || age === "") return;

    if (currentUser) {
      const userRef = doc(db, "users", currentUser.id);

      await updateDoc(userRef, {
        firstName: firstName,
        lastName: lastName,
        age: age,
        completed: true,
        inEditing: false,
      });
    }

    setFirstName("");
    setLastName("");
    setAge("");
  };

  const handleCancelChanges = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (currentUser) {
      const userRef = doc(db, "users", currentUser.id);

      await updateDoc(userRef, { inEditing: false });
    }
  };

  const handleFirstNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handleAgeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAge(e.target.value);
  };

  return (
    <>
      <div className="w-[100dvw] h-screen flex justify-center items-center absolute top-0 left-0 bg-slate-900 bg-opacity-70">
        <div className="w-full max-w-[80%] md:max-w-[25%] flex flex-col gap-5 bg-white p-10 rounded-xl">
          <h1 className="flex justify-center items-center text-2xl font-medium">
            User detail
          </h1>
          <form className="w-full flex flex-col gap-10">
            <div className="w-full flex flex-col gap-4">
              <label htmlFor="firstName" className="w-full">
                <p className="text-slate-400">First Name:</p>
                <input
                  type="text"
                  className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 outline-none"
                  placeholder={defaultFirstName}
                  value={firstName}
                  onChange={handleFirstNameChange}
                />
              </label>
              <label htmlFor="firstName">
                <p className="text-slate-400">Last Name:</p>
                <input
                  type="text"
                  className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 outline-none"
                  placeholder={defaultLastName}
                  value={lastName}
                  onChange={handleLastNameChange}
                />
              </label>
              <label htmlFor="firstName">
                <p className="text-slate-400">Age:</p>
                <input
                  type="number"
                  className="w-full bg-slate-50 border border-slate-200 rounded-md p-2 outline-none"
                  placeholder={defaultAge}
                  value={age}
                  onChange={handleAgeChange}
                />
              </label>
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
