import React from "react";
import { PageLayout } from "../UI/PageLayout";
import travGif from "./travolta.gif";

export const NotFound = () => {
  return (
    <PageLayout>
      <h2>Oops... cette page n'éxiste pas...</h2>
      <img src={travGif} alt="where is it" />
    </PageLayout>
  );
};
