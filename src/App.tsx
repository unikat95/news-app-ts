import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Layout from "./Layout";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import NewsProvider from "./context/NewsContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import Articles from "./pages/Articles";
import Users from "./pages/Users";
import User from "./pages/User";
import Article from "./pages/Article";
import CreateArticle from "./components/Dashboard/CreateArticle";
import AdminPanel from "./pages/AdminPanel";
import APArticles from "./components/AdminPanel/APArticles/APArticles";
import APUsers from "./components/AdminPanel/APUsers/APUsers";

function App() {
  const router = createBrowserRouter(
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
        <Route path="/admin-panel" element={<AdminPanel />}>
          <Route path="create-article" element={<CreateArticle />} />
          <Route path="users" element={<APUsers />} />
          <Route path="articles-list" element={<APArticles />} />
        </Route>
        <Route path="/auth" element={<Auth />} />
      </Route>
    )
  );

  return (
    <>
      <NewsProvider>
        <RouterProvider router={router}></RouterProvider>
      </NewsProvider>
    </>
  );
}

export default App;
