import React, { ChangeEvent, useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../config/Firebase";
import { doc, setDoc } from "firebase/firestore";
import { NewsContext } from "../context/NewsContext";
import FormButton from "../components/FormButton/FormButton";

export default function Auth() {
  const { currentUser } = useContext(NewsContext) || {};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignUp = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user.uid;
        const userData = {
          id: user,
          email: email,
          firstName: "",
          lastName: "",
          age: "--",
          isAdmin: false,
          completed: false,
          inEditing: false,
        };

        await setDoc(doc(db, "users", user), userData);
        navigate("/profile");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleSignIn = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {})
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };
  const handleMethodChange = () => {
    setIsSignedIn(!isSignedIn);
  };

  if (currentUser) return <Navigate to="/"></Navigate>;

  return (
    <>
      <form className="w-full h-auto flex flex-col justify-center items-center gap-5">
        <h1 className="text-xl font-medium text-slate-800">
          {isSignedIn ? "Sign In" : "Sign Up"}
        </h1>
        <div className="w-2/3 flex flex-col gap-2">
          <input
            type="email"
            placeholder="Email..."
            value={email}
            onChange={handleEmailChange}
            className="w-auto h-auto bg-slate-50 border-l-4 border-slate-400 focus:border-blue-500 p-2 outline-none"
          />
          <input
            type="password"
            placeholder="Password..."
            value={password}
            onChange={handlePasswordChange}
            className="w-auto h-auto bg-slate-50 border-l-4 border-slate-400 focus:border-blue-500 p-2 outline-none"
          />
        </div>
        {isSignedIn ? (
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
        {isSignedIn ? (
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
    </>
  );
}
