import { onAuthStateChanged, User } from "firebase/auth";
import React, {
  createContext,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { auth, db } from "../config/Firebase";
import { doc, onSnapshot } from "firebase/firestore";

type UserProps = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
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

  if (loading || initializing) return "loading..";

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
      }}
    >
      {children}
    </NewsContext.Provider>
  );
}
