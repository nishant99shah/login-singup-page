import React, {createContext, useState} from "react";

export const UserContext = createContext();

export const UserProvider = ({children}) => {
  const [users, setUsers] = useState([]);

  const addUser = (user) => {
    setUsers([...users, user]);
  };

  const findUser = (email, password) => {
    return users.find(
      (user) => user.email === email && user.password === password
    );
  };

  const userContextValue = {
    users,
    addUser,
    findUser,
  };

  return (
    <UserContext.Provider value={userContextValue}>
      {children}
    </UserContext.Provider>
  );
};
