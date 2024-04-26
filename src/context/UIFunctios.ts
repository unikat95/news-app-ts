import { signOut, User } from "firebase/auth";
import { auth, db } from "../config/Firebase";
import { UserProps } from "./ContextType";
import { SetStateAction } from "react";
import { doc, updateDoc } from "firebase/firestore";

export const handleOpenModal = (setIsModalOpen: (isOpen: boolean) => void) => {
  setIsModalOpen(true);
};

export const handleCloseModal = (setIsModalOpen: (isOpen: boolean) => void) => {
  setIsModalOpen(false);
};

export const handleOpenDropdown = (
  setOpenDropdown: (isOpen: boolean) => void,
  isOpen: boolean
) => {
  setOpenDropdown(!isOpen);
};

export const handleCloseDropdown = (
  setOpenDropdown: (isOpen: boolean) => void
) => {
  setOpenDropdown(false);
};

export const handleSignOut = async (
  setUser: React.Dispatch<SetStateAction<User | null>>,
  setCurrentUser: React.Dispatch<SetStateAction<UserProps | null>>,
  setOpenDropdown: React.Dispatch<SetStateAction<boolean>>,
  setLoading: React.Dispatch<SetStateAction<boolean>>
) => {
  setLoading(true);
  setTimeout(async () => {
    await signOut(auth);
    setLoading(false);
  }, 500);
  if (setUser && setCurrentUser) {
    setUser(null);
    setCurrentUser(null);
    setOpenDropdown(false);
  }
};

export const handleEditProfile = async (currentUser: UserProps | null) => {
  if (currentUser) {
    const userRef = doc(db, "users", currentUser.id);
    await updateDoc(userRef, {
      inEditing: true,
    });
  }
};

export const handleOpenMenu = (
  open: boolean,
  setOpen: React.Dispatch<SetStateAction<boolean>>
) => {
  setOpen(!open);
};

export const handleCloseMenu = (
  setOpen: React.Dispatch<SetStateAction<boolean>>
) => {
  setOpen(false);
};

export const removeStyles = (html: string): string => {
  return html.replace(/(<([^>]+)>)/gi, "");
};
