import React, { ChangeEvent, useContext, useEffect, useState } from "react";

import { v4 as uuidv4 } from "uuid";

import { NewsContext } from "../../context/NewsContext";
import { MdClear } from "react-icons/md";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/Firebase";

export default function SendMessage() {
  const { usersList, currentUser } = useContext(NewsContext) || {};
  const [recipient, setRecipient] = useState<string | null>(null);
  const [openUserList, setOpenUserList] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<boolean>(false);
  const [selectedUserId, setSelectedUserId] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (!recipient) {
      setOpenUserList(false);
    }
  }, [recipient]);

  if (!currentUser) return;

  const usersListFiltered = usersList?.filter(
    (user) =>
      user.firstName.toLowerCase().includes(recipient || "") ||
      user.lastName.toLowerCase().includes(recipient || "")
  );

  const handleFindUser = (e: ChangeEvent<HTMLInputElement>) => {
    setRecipient(e.target.value);
    setOpenUserList(true);
  };

  const handleSelectUser = (userId: string) => {
    const selectedUser = usersList?.find((user) => user.id === userId);
    const firstName = selectedUser?.firstName || "";
    const lastName = selectedUser?.lastName || "";
    const email = selectedUser?.email || "";
    if (userId === currentUser.id) return;

    if (selectedUser) {
      setSelectedUserId(selectedUser.id);
    }

    setRecipient(firstName + " " + lastName + " (" + email + ")");
    setOpenUserList(false);
    setSelectedUser(true);
  };

  const handleRemoveSelectedUser = () => {
    setSelectedUser(false);
    setRecipient("");
    setSelectedUserId("");
  };

  const handleSendMessage = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (!title || !message) return;

    const messageId = uuidv4();

    const messageData = {
      id: messageId,
      from: currentUser.id,
      to: selectedUserId,
      title: title,
      message: message,
      replies: [],
      unread: true,
      createdAt: new Date().toISOString(),
    };

    await setDoc(doc(db, "messages", messageId), messageData);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleMessageChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
  };

  return (
    <div className="w-full flex gap-10">
      <div className="w-full bg-white border-[1px] p-5">
        <form className="w-full flex flex-col justify-start items-end gap-5 relative">
          <div className="w-full flex flex-col relative">
            {!selectedUser && (
              <input
                type="text"
                name="to"
                id="to"
                placeholder="To..."
                className="w-full border-[1px] p-2 outline-none"
                value={recipient || ""}
                onChange={handleFindUser}
              />
            )}
            {selectedUser && (
              <div className="w-full bg-white flex justify-start items-center border-[1px] p-2 outline-none">
                <span className="flex bg-blue-50 px-2 justify-center items-center gap-2 rounded-sm text-sm py-1">
                  {recipient || ""}
                  <button type="button" onClick={handleRemoveSelectedUser}>
                    <MdClear
                      size={16}
                      className="text-black hover:text-red-500"
                    />
                  </button>
                </span>
              </div>
            )}
            {openUserList && (
              <div className="w-full h-auto bg-white p-2 gap-2 border-[1px] flex flex-col justify-start items-start absolute top-10">
                {usersListFiltered?.map((user) => (
                  <button
                    type="button"
                    key={user.id}
                    onClick={() => handleSelectUser(user.id)}
                    className={`w-full bg-neutral-50 hover:bg-neutral-100 flex flex-col justify-start items-start p-2 ${
                      currentUser.id === user.id &&
                      "bg-neutral-100 cursor-not-allowed"
                    }`}
                  >
                    {user.firstName + " " + user.lastName}
                  </button>
                ))}
              </div>
            )}
          </div>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Title..."
            value={title}
            onChange={handleTitleChange}
            className="w-full border-[1px] p-2 outline-none"
          />
          <textarea
            name="message"
            id="message"
            cols={30}
            rows={10}
            placeholder="Message..."
            value={message}
            onChange={handleMessageChange}
            className="w-full border-[1px] p-2 outline-none resize-none"
          />
          <button
            className="bg-black text-white px-4 py-2"
            onClick={handleSendMessage}
          >
            Send message
          </button>
        </form>
      </div>{" "}
    </div>
  );
}
