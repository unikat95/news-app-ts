import React, { ChangeEvent, useContext, useState } from "react";

import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

import { FaHome } from "react-icons/fa";
import { RiErrorWarningLine } from "react-icons/ri";

import { auth, db } from "../config/Firebase";
import { doc, setDoc } from "firebase/firestore";
import { NewsContext } from "../context/NewsContext";

import FormButton from "../components/FormButton/FormButton";

export default function Auth() {
  const { currentUser } = useContext(NewsContext) || {};
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleSignUp = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setEmailError(false);
    setPasswordError(false);

    createUserWithEmailAndPassword(auth, formData.email, formData.password)
      .then(async (userCredential) => {
        const currUser = userCredential.user.uid;
        const userData = {
          id: currUser,
          email: formData.email,
          firstName: "",
          lastName: "",
          age: "--",
          isAdmin: false,
          isOwner: false,
          completed: false,
          inEditing: false,
        };

        navigate("/profile");
        await setDoc(doc(db, "users", currUser), userData);
      })
      .catch((err) => {
        console.log(err);
        setError(err.code);
        if (formData.email === "") {
          setEmailError(true);
          setLoading(false);
        }
        if (formData.password === "") {
          setPasswordError(true);
          setLoading(false);
        }
        setLoading(false);
      });
  };

  const handleSignIn = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setEmailError(false);
    setPasswordError(false);

    signInWithEmailAndPassword(auth, formData.email, formData.password)
      .then(() => {})
      .catch((err) => {
        console.log(err.code);
        setError(err.code);
        if (formData.email === "") {
          setEmailError(true);
          setLoading(false);
        }
        if (formData.password === "") {
          setPasswordError(true);
          setLoading(false);
        }
        if (error === "auth/invalid-credential") {
          setEmailError(true);
          setPasswordError(true);
          setLoading(false);
        }
        setLoading(false);
      });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setError("");
    setEmailError(false);
    setPasswordError(false);
  };

  const handleMethodChange = () => {
    setIsSignedIn(!isSignedIn);
    setFormData((prev) => ({
      ...prev,
      email: "",
      password: "",
    }));

    setError("");
    setEmailError(false);
    setPasswordError(false);
  };

  function getErrorMessage(error: string | null) {
    switch (error) {
      case "auth/email-already-in-use":
        return "Email already in use";
      case "auth/invalid-email":
        return "Invalid email";
      case "auth/missing-email":
        return "Field email can not be empty";
      case "auth/missing-password":
        return "Field password can not be empty";
      case "auth/user-disabled":
      case "auth/user-not-found":
      case "auth/invalid-credential":
        return "Invalid email or password";
      case "auth/too-many-requests": {
        return "Please try again for a moment";
      }
      default:
        return "Invalid email or password";
    }
  }

  if (currentUser?.completed) return <Navigate to="/"></Navigate>;

  return (
    <>
      <div className="w-[100dvw] h-[100dvh] absolute top-0 left-0 bg-white md:bg-gradient-to-tr md:from-blue-300 md:to-red-100 flex flex-col justify-center items-center gap-5">
        <form className="w-full sm:w-[50%] lg:w-[40%] xl:w-[27%] flex md:bg-white flex-col justify-center items-center gap-7 px-5 md:p-8 rounded-md">
          {loading && <div className="sign-loading"></div>}
          <h1 className="inline-flex uppercase text-2xl pb-10 text-gray-500 relative after:absolute after:w-full after:h-[2px] after:bg-purple-600 after:bottom-8 after:left-0">
            {!isSignedIn ? "Account Login" : "Create Account"}
          </h1>
          <div className="w-full flex flex-col gap-3">
            <label htmlFor="email" className="w-full flex flex-col gap-1">
              <p className="text-xs text-slate-500">Email:</p>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Email..."
                value={formData.email}
                onChange={handleInputChange}
                required={emailError}
                className="bg-zinc-100 outline-none border-l-4 border-slate-300 focus:border-blue-500 text-slate-700 p-3 rounded-sm  required:bg-red-50 required:border-red-500"
              />
            </label>
            <label htmlFor="password" className="w-full flex flex-col gap-1">
              <p className="text-xs text-slate-500">Password:</p>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Password..."
                value={formData.password}
                onChange={handleInputChange}
                required={passwordError}
                className="bg-zinc-100 outline-none border-l-4 border-slate-300 focus:border-blue-500 text-slate-700 p-3 rounded-sm  required:bg-red-50 required:border-red-500"
              />
              <p className="text-xs text-slate-400 text-end">
                (min 6 characters)
              </p>
            </label>
          </div>
          {!isSignedIn ? (
            <FormButton
              text="Sign In"
              handleClick={handleSignIn}
              loading={loading}
            />
          ) : (
            <FormButton
              text="Sign Up"
              handleClick={handleSignUp}
              loading={loading}
            />
          )}
          {error && (
            <div className="w-full bg-red-400 text-red-800 text-sm flex justify-between items-center rounded-md overflow-hidden">
              <div className="w-auto bg-red-500 text-red-700 p-2">
                <RiErrorWarningLine size="22" />
              </div>
              <div className="w-full flex justify-center items-center">
                {error && getErrorMessage(error)}
              </div>
            </div>
          )}
          {!isSignedIn ? (
            <div>
              Don`t have an account?{" "}
              <Link to="" onClick={handleMethodChange} className="underline">
                Sign Up!
              </Link>
            </div>
          ) : (
            <div>
              Already have an account?{" "}
              <Link to="" onClick={handleMethodChange} className="underline">
                Sign In!
              </Link>
            </div>
          )}
        </form>
        <Link
          to="/"
          className="bg-slate-700 hover:bg-blue-500 p-3 rounded-full text-white duration-200"
        >
          <FaHome size="22" />
        </Link>
      </div>
    </>
  );
}
