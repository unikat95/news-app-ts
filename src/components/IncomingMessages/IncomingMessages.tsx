import React, { useContext } from "react";
import { NewsContext } from "../../context/NewsContext";
import { Link, Outlet, useLocation } from "react-router-dom";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../../config/Firebase";

export default function IncomingMessages() {
  const { currentUser, messageList, usersList } = useContext(NewsContext) || {};
  const location = useLocation();

  if (!currentUser) return;

  const incomingMessages = messageList
    ?.filter((msg) => msg.to === currentUser.id)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  const handleMarkAsRead = async (msgId: string) => {
    try {
      const msgRef = doc(db, "messages", msgId);
      const messageDoc = await getDoc(msgRef);

      if (messageDoc.exists()) {
        const replies = messageDoc.data().replies;
        const lastReply = replies[replies.length - 1];

        if (
          lastReply &&
          lastReply.unread &&
          lastReply.author !== currentUser.id
        ) {
          lastReply.unread = false;

          const newReplies = [...replies.slice(0, -1), lastReply];

          await updateDoc(msgRef, { replies: newReplies });

          if (messageDoc.data().unread) {
            await updateDoc(msgRef, { unread: false });
          }
        } else {
          await updateDoc(msgRef, { unread: false });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {location.pathname === "/messages/incoming-messages" && (
        <div className="w-full flex flex-col gap-2">
          {incomingMessages?.map((msg) => {
            const author = usersList?.find((user) => user.id === msg.from);
            const lastRep = msg.replies.slice(-1)[0];

            const backgroundColor =
              (msg.unread || (lastRep?.unread && lastRep.author !== msg.to)) &&
              "bg-sky-100";

            return (
              <Link
                to={`/messages/incoming-messages/${msg.id}`}
                key={msg.id}
                className={`w-full flex justify-between items-center p-5 border-[1px] ${backgroundColor}`}
                onClick={() => handleMarkAsRead(msg.id)}
              >
                <div className="flex justify-center items-center gap-10">
                  <div className="flex flex-col">
                    <span className="text-xs">From:</span>
                    <div className="flex justify-center items-center gap-2">
                      {author?.avatar ? (
                        <img
                          src={author?.avatar}
                          alt=""
                          className="w-6 h-6 rounded-full"
                        />
                      ) : (
                        <div className="w-6 h-6 bg-slate-600 flex justify-center items-center rounded-full text-white text-xs font-bold">
                          {author?.firstName.slice(0, 1)}
                          {author?.lastName.slice(0, 1)}
                        </div>
                      )}
                      <p>{author?.firstName + " " + author?.lastName}</p>
                    </div>
                  </div>
                  <div className="flex flex-col line-clamp-1">
                    <span className="text-xs">Title:</span>Title: {msg.title}
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-xs">Date:</span>
                  {new Date(msg.createdAt).toLocaleString()}
                </div>
              </Link>
            );
          })}
        </div>
      )}
      <Outlet />
    </>
  );
}
