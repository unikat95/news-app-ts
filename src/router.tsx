import React from "react";

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "./Layout";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Home from "./pages/Home";
import Articles from "./pages/Articles";
import Article from "./pages/Article";
import Users from "./pages/Users";
import User from "./pages/User";
import Profile from "./pages/Profile";
import AdminPanel from "./pages/AdminPanel";
import APCreateArticle from "./components/AdminPanel/APCreateArticle/APCreateArticle";
import APUsers from "./components/AdminPanel/APUsers/APUsers";
import APArticles from "./components/AdminPanel/APArticles/APArticles";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import Messages from "./pages/Messages";
import SendMessage from "./components/SendMessage/SendMessage";
import Message from "./components/Message/Message";
import IncomingMessages from "./components/IncomingMessages/IncomingMessages";
import SentMessages from "./components/SentMessages/SentMessages";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />

      <Route path="/articles" element={<Articles />} />
      <Route path="/articles/:id" element={<Article />} />

      <Route path="/users" element={<Users />} />
      <Route path="/users/user/:id" element={<User />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route path="/messages" element={<Messages />}>
        <Route path="incoming-messages" element={<IncomingMessages />}>
          <Route path=":id" element={<Message />} />
        </Route>
        <Route path="sent-messages" element={<SentMessages />}>
          <Route path=":id" element={<Message />} />
        </Route>
        <Route path="send-message" element={<SendMessage />} />
      </Route>

      <Route path="/admin-panel" element={<AdminPanel />}>
        <Route index element={<div>APHome</div>} />
        <Route path="create-article" element={<APCreateArticle />} />
        <Route path="users" element={<APUsers />} />
        <Route path="articles-list" element={<APArticles />} />
      </Route>

      <Route path="/auth" element={<Auth />} />
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);
