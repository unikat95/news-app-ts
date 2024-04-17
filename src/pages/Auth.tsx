import React, { ChangeEvent, useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "../config/Firebase";
import { doc, setDoc } from "firebase/firestore";
import { NewsContext } from "../context/NewsContext";

export default function Auth() {
  const { currentUser } = useContext(NewsContext) || {};
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [loading, setLoading] = useState(false);

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
          isAdmin: false,
        };

        await setDoc(doc(db, "users", user), userData);
        setLoading(false);
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
      <h1>{isSignedIn ? "Sign In" : "Sign Up"}</h1>
      <form>
        <input
          type="email"
          placeholder="Email..."
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Password..."
          value={password}
          onChange={handlePasswordChange}
        />
        {isSignedIn ? (
          <button onClick={handleSignIn}>Sign In</button>
        ) : (
          <button onClick={handleSignUp}>Sign Up</button>
        )}
      </form>
      {isSignedIn ? (
        <div>
          Don`t have an account?{" "}
          <Link to="" onClick={handleMethodChange}>
            Sign Up!
          </Link>
        </div>
      ) : (
        <div>
          Already have an account?{" "}
          <Link to="" onClick={handleMethodChange}>
            Sign In!
          </Link>
        </div>
      )}
      {loading && <div>loading...</div>}
    </>
  );
}
