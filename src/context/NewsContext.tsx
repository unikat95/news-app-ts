import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";

import { auth, db } from "../config/Firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";
import PageLoading from "../components/PageLoading/PageLoading";
import {
  ArticleProps,
  NewsContextProps,
  NewsProviderProps,
  UserProps,
} from "./ContextType";

import {
  handleOpenModal,
  handleCloseModal,
  handleOpenDropdown,
  handleCloseDropdown,
} from "./UIFunctios";

export const NewsContext = createContext<NewsContextProps | null>(null);

export default function NewsProvider({ children }: NewsProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [usersList, setUsersList] = useState<UserProps[]>([]);
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const [articles, setArticles] = useState<ArticleProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openPopout, setOpenPopout] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);

  const sortedArticles = articles.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
      if (!user) {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!user) {
      return;
    }
    const userUnsubscribe = onSnapshot(
      doc(db, "users", user.uid),
      (userData) => {
        setCurrentUser(userData.data() ? (userData.data() as UserProps) : null);
      }
    );

    return () => {
      userUnsubscribe();
    };
  }, [user]);

  useEffect(() => {
    const userListUnsubscribe = onSnapshot(collection(db, "users"), (users) => {
      const usersData: UserProps[] = [];
      users.forEach((doc) => {
        usersData.push(doc.data() as UserProps);
      });
      setUsersList(usersData);
    });

    const articlesListUnsubscribe = onSnapshot(
      collection(db, "articles"),
      (articles) => {
        const articlesData: ArticleProps[] = [];
        articles.forEach((article) => {
          articlesData.push(article.data() as ArticleProps);
        });
        setArticles(articlesData);
        setInitializing(false);
      }
    );

    return () => {
      userListUnsubscribe();
      articlesListUnsubscribe();
    };
  }, []);

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
        handleOpenDropdown: () =>
          handleOpenDropdown(setOpenDropdown, openDropdown),
        handleCloseDropdown: () => handleCloseDropdown(setOpenDropdown),
        usersList,
        setUsersList,
        articles,
        setArticles,
        sortedArticles,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
}
