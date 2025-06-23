import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./navigation.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { UserContextProvider } from "./UserContext";
import BlogContextProvider from "./context/BlogContext";
createRoot(document.getElementById("root")).render(
  <BlogContextProvider>
    <UserContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </UserContextProvider>
  </BlogContextProvider>
);
