import React from "react";
import { Header } from "./Header";

export const PageLayout = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};
