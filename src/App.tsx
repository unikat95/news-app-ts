import React from "react";
import { RouterProvider } from "react-router-dom";

import NewsProvider from "./context/NewsContext";
import { router } from "./router";

function App() {
  return (
    <>
      <NewsProvider>
        <RouterProvider router={router}></RouterProvider>
      </NewsProvider>
    </>
  );
}

export default App;
