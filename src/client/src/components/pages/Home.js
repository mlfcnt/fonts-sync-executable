import React from "react";
import { PageLayout } from "../UI/PageLayout";
// import { ThemeContext } from "../context/ThemeProvider";

export const Home = () => {
  // const [theme] = useContext(ThemeContext);
  // useEffect(() => {
  //   if (theme === "light") {
  //     return import("rsuite/dist/styles/rsuite-default.css");
  //   } else {
  //     return import("rsuite/dist/styles/rsuite-dark.css");
  //   }
  // }, [theme]);

  return (
    <PageLayout>
      <h3>Fonts sync</h3>
      <p>Coucou</p>
    </PageLayout>
  );
};
