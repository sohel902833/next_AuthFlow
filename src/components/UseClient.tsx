"use client";

import { Toaster } from "react-hot-toast";

const UseClient = ({ children }: any) => {
  return (
    <>
      {children} <Toaster />
    </>
  );
};

export default UseClient;
