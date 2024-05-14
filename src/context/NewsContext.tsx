import { onAuthStateChanged, User } from "firebase/auth";
import React, { createContext, useEffect, useState } from "react";

import { auth, db } from "../config/Firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";
import PageLoading from "../components/PageLoading/PageLoading";
import {
  ArticleProps,
  MessageProps,
  NewsContextProps,
  NewsProviderProps,
  UserProps,
} from "./ContextType";

import {
  handleOpenModal,
  handleCloseModal,
  handleOpenDropdown,
  handleCloseDropdown,
  handleSignOut,
  handleEditProfile,
  handleOpenMenu,
  handleCloseMenu,
  removeStyles,
} from "./UIFunctios";

export const NewsContext = createContext<NewsContextProps | null>(null);

export default function NewsProvider({ children }: NewsProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [usersList, setUsersList] = useState<UserProps[]>([]);
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);

  const [articles, setArticles] = useState<ArticleProps[]>([]);
  const [category, setCategory] = useState<string>("");
  const [releaseSort, setReleaseSort] = useState<boolean>(false);

  const [messageList, setMessageList] = useState<MessageProps[]>([]);

  const [loading, setLoading] = useState(true);
  const [initializing, setInitializing] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openPopout, setOpenPopout] = useState<boolean>(false);
  const [openDropdown, setOpenDropdown] = useState<boolean>(false);
  const [openMenu, setOpenMenu] = useState<boolean>(false);

  const [dot, setDot] = useState<boolean>(false);

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
    const messageListUnsubscribe = onSnapshot(
      collection(db, "messages"),
      (messages) => {
        const messagesData: MessageProps[] = [];
        messages.forEach((doc) => {
          messagesData.push(doc.data() as MessageProps);
        });
        setMessageList(messagesData);
      }
    );

    return () => messageListUnsubscribe();
  }, []);

  useEffect(() => {
    if (openPopout) {
      setTimeout(() => {
        setOpenPopout(false);
      }, 5000);
    }
  }, [openPopout]);

  useEffect(() => {
    const hasUnreadMessage = messageList?.some((msg) => {
      const hasUnreadReply = msg.replies.some((reply) => {
        if (reply.author === currentUser?.id && reply.unread) {
          reply.unread = false;
        }
        return reply.unread;
      });
      return (msg.unread && msg.from !== currentUser?.id) || hasUnreadReply;
    });

    if (hasUnreadMessage) {
      setDot?.(true);
    } else {
      setDot?.(false);
    }
  }, [messageList, currentUser, setDot]);

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
        usersList,
        setUsersList,
        articles,
        setArticles,
        category,
        setCategory,
        releaseSort,
        setReleaseSort,
        sortedArticles,
        openMenu,
        setOpenMenu,
        messageList,
        setMessageList,
        dot,
        setDot,

        handleOpenModal: () => handleOpenModal(setIsModalOpen),
        handleCloseModal: () => handleCloseModal(setIsModalOpen),
        handleOpenDropdown: () =>
          handleOpenDropdown(setOpenDropdown, openDropdown),
        handleCloseDropdown: () => handleCloseDropdown(setOpenDropdown),
        handleSignOut: () =>
          handleSignOut(setUser, setCurrentUser, setOpenDropdown, setLoading),
        handleEditProfile: () => handleEditProfile(currentUser),
        handleOpenMenu: () => handleOpenMenu(openMenu, setOpenMenu),
        handleCloseMenu: () => handleCloseMenu(setOpenMenu),
        removeStyles: (html: string) => removeStyles(html),
      }}
    >
      {children}
    </NewsContext.Provider>
  );
}
