import React from "react";
import { PageLayout } from "../UI/PageLayout";
import { FlexboxGrid, Panel, Divider } from "rsuite";

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
      <FlexboxGrid justify="center">
        <FlexboxGrid.Item colspan={12}>
          <h3 style={{ marginBottom: "1.5rem" }}>fonts-sync</h3>
          <Panel>
            <Divider>Téléverser</Divider>
            <p>
              Sur la page <strong>Téléverser</strong>, vous retrouverez la liste
              des polices d'écriture présentes sur
              <strong> votre ordinateur </strong>.
            </p>
            <p>
              Vous pouvez sélectionner les polices à sauvegarder sur le cloud
            </p>
            <Divider>Télecharger</Divider>
            <p>
              Sur la page <strong>Télecharger</strong>, vous retrouverez la
              liste des polices d'écriture présentes sur{" "}
              <strong>le cloud</strong>
            </p>
            <p>
              Vous pouvez sélectionner les polices à télecharger sur votre
              ordinateur
            </p>
            <Divider>Pourquoi créer un compte est-il nécessaire ?</Divider>
            <p>
              Pour pouvoir synchroniser vos polices nous les stockons sur un
              serveur. Afin de différencier votre liste de polices de celle d'un
              autre utilisateur, nous devons vous donner un identifiant unique.
            </p>
          </Panel>
        </FlexboxGrid.Item>
      </FlexboxGrid>
    </PageLayout>
  );
};
