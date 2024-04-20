import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";

import { auth, db } from "../config/Firebase";
import { doc, onSnapshot } from "firebase/firestore";
import PageLoading from "../components/PageLoading/PageLoading";
import { NewsContextProps, NewsProviderProps, UserProps } from "./ContextType";

import {
  handleOpenModal,
  handleCloseModal,
  handleOpenDropdown,
  handleCloseDropdown,
} from "./UIFunctios";

export const NewsContext = createContext<NewsContextProps | null>(null);

export default function NewsProvider({ children }: NewsProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openPopout, setOpenPopout] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (!user) {
        setInitializing(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }
    const unsubscribe = onSnapshot(doc(db, "users", user.uid), (userData) => {
      setCurrentUser(userData.data() ? (userData.data() as UserProps) : null);
      setInitializing(false);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (openPopout) {
      setTimeout(() => {
        setOpenPopout(false);
      }, 3000);
    }
  }, [openPopout]);

  if (loading || initializing) return <PageLoading />;

  return (
    <NewsContext.Provider
      value={{
        user,
        setUser,
        currentUser,
        setCurrentUser,
        loading,
        setLoading,
        initializing,
        setInitializing,
        isModalOpen,
        setIsModalOpen,
        openPopout,
        setOpenPopout,
        openDropdown,
        setOpenDropdown,
        handleOpenModal: () => handleOpenModal(setIsModalOpen),
        handleCloseModal: () => handleCloseModal(setIsModalOpen),
        handleOpenDropdown: () => handleOpenDropdown(setOpenDropdown),
        handleCloseDropdown: () => handleCloseDropdown(setOpenDropdown),
      }}
    >
      {children}
    </NewsContext.Provider>
  );
}
