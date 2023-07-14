"use client";

import React, { createContext, useContext } from "react";

export interface IUser {
  name: string;
  phone: string;
  email: string;
  age: number;
}
const initialValue: IUser = {
  age: 21,
  name: "Md Sohrab Hossain",
  email: "sk@gmail.com",
  phone: "01740244739",
};
export const UserContext = createContext<IUser>(initialValue);

interface Props {
  children: React.ReactNode;
}
export const UserContextProvider: React.FC<Props> = ({ children }) => {
  return (
    <UserContext.Provider value={initialValue}>{children}</UserContext.Provider>
  );
};

export const useUserContext = () => {
  return useContext(UserContext);
};
