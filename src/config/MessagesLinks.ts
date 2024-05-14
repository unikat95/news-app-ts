import { RiSendPlaneFill, RiMailSendFill } from "react-icons/ri";
import { IoMdCreate } from "react-icons/io";

export const MessagesLinks = [
  {
    id: 1,
    text: "Incoming messages",
    to: "/messages/incoming-messages",
    path: "/incoming",
    linkIcon: RiMailSendFill,
  },
  {
    id: 2,
    text: "Sent messages",
    to: "/messages/sent-messages",
    path: "/sent",
    linkIcon: RiSendPlaneFill,
  },
  {
    id: 3,
    text: "Send message",
    to: "/messages/send-message",
    path: "/send",
    linkIcon: IoMdCreate,
  },
];
