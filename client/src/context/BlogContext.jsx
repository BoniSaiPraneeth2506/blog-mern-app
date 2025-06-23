import { createContext } from "react";

export const BlogContext = createContext();

const BlogContextProvider = (props) => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const value = {
    backendUrl,
  };

  return (
    <BlogContext.Provider value={value}>{props.children}</BlogContext.Provider>
  );
};

export default BlogContextProvider;
