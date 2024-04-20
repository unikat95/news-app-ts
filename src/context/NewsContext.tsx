import { onAuthStateChanged, User } from "firebase/auth";
import React, {
  createContext,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { auth, db } from "../config/Firebase";
import { doc, onSnapshot } from "firebase/firestore";

export type UserProps = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  age: string;
  isAdmin: boolean;
  completed: boolean;
  inEditing: boolean;
};

type NewsContextProps = {
  user: User | null;
  setUser: React.Dispatch<SetStateAction<User | null>>;
  currentUser: UserProps | null;
  setCurrentUser: React.Dispatch<SetStateAction<UserProps | null>>;
  loading: boolean;
  setLoading: React.Dispatch<SetStateAction<boolean>>;
  initializing: boolean;
  setInitializing: React.Dispatch<SetStateAction<boolean>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<SetStateAction<boolean>>;
  handleCloseModal: () => void;
  handleOpenModal: () => void;
  openPopout: boolean;
  setOpenPopout: React.Dispatch<SetStateAction<boolean>>;
};

type NewsProviderProps = {
  children: React.ReactNode;
};

export const NewsContext = createContext<NewsContextProps | null>(null);

export default function NewsProvider({ children }: NewsProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openPopout, setOpenPopout] = useState<boolean>(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

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
      const userDataObj = userData.data();
      if (userDataObj) {
        setCurrentUser(userDataObj as UserProps);
      } else {
        setCurrentUser(null);
      }
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

  if (loading || initializing)
    return (
      <div className="w-[100dvw] h-screen flex justify-center items-center">
        Loading...
      </div>
    );

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
        handleCloseModal,
        handleOpenModal,
        openPopout,
        setOpenPopout,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
}
