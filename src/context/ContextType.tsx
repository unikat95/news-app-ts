import { User } from "firebase/auth";
import React, { SetStateAction } from "react";

export type UserProps = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  age: string;
  avatar: string;
  isAdmin: boolean;
  isOwner: boolean;
  completed: boolean;
  inEditing: boolean;
};

export type ReplyProps = {
  id: string;
  author: string;
  text: string;
  written: string;
};

export type CommentProps = {
  id: string;
  author: string;
  text: string;
  written: string;
  replies: ReplyProps[];
};

export type ArticleProps = {
  id: string;
  author: string;
  image: string;
  text: string;
  title: string;
  category: string;
  createdAt: Date;
  key: string;
  comments: CommentProps[];
};

export type NewsContextProps = {
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
  openPopout: boolean;
  setOpenPopout: React.Dispatch<SetStateAction<boolean>>;
  openDropdown: boolean;
  setOpenDropdown: React.Dispatch<SetStateAction<boolean>>;
  usersList: UserProps[];
  setUsersList: React.Dispatch<SetStateAction<UserProps[]>>;
  articles: ArticleProps[];
  setArticles: React.Dispatch<SetStateAction<ArticleProps[]>>;
  category: string;
  setCategory: React.Dispatch<SetStateAction<string>>;
  sortedArticles: ArticleProps[];
  releaseSort: boolean;
  setReleaseSort: React.Dispatch<SetStateAction<boolean>>;

  handleCloseModal: () => void;
  handleOpenModal: () => void;
  handleOpenDropdown: () => void;
  handleCloseDropdown: () => void;
  handleSignOut: (() => Promise<void>) | undefined;
  handleEditProfile: (() => Promise<void>) | undefined;
  handleOpenMenu: (() => void) | undefined;
  handleCloseMenu: (() => void) | undefined;
  removeStyles: (html: string) => string;

  openMenu: boolean;
  setOpenMenu: React.Dispatch<SetStateAction<boolean>>;
};

export type NewsProviderProps = {
  children: React.ReactNode;
};
