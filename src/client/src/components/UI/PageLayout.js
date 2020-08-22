import React from "react";
import { Header } from "./Header";
import { Container, Content } from "rsuite";

export const PageLayout = ({ children }) => {
  return (
    <Container>
      <Header />
      <Content>{children}</Content>
    </Container>
  );
};
