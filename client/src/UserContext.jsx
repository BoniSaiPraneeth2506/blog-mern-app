import { createContext, useState, useEffect } from "react";

// Create the context
export const UserContext = createContext();

// Create the provider
export const UserContextProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState(null);

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
