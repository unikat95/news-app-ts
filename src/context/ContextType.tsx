import { User } from "firebase/auth";
import { SetStateAction } from "react";

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

export type ArticleProps = {
  id: string;
  author: string;
  image: string;
  text: string;
  title: string;
  createdAt: Date;
  key: string;
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
  sortedArticles: ArticleProps[];

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
