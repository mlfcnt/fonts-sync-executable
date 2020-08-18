import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar as rsNav, Nav, Icon, Button } from "rsuite";
import { SignInModal } from "../SignInModal";

export const Navbar = () => {
  const [active, setActive] = useState("home");
  const [showUserModal, setShowUserModal] = useState(false);
  // const [theme, toggleTheme] = useContext(ThemeContext);

  console.log({ showUserModal });
  const styles = {
    marginBottom: 50,
  };
  // const displayThemeIcon = () =>
  //   theme === "light" ? (
  //     <Icon icon="moon-o" size="lg" />
  //   ) : (
  //     <Icon icon="sun-o" size="lg" />
  //   );

  return (
    <>
      <rsNav>
        <rsNav.Body>
          <Nav
            appearance="subtle"
            activeKey={active}
            onSelect={(activeKey) => setActive(activeKey)}
            style={styles}
          >
            <Link to="/">
              <Nav.Item icon={<Icon icon="home" />}>Accueil</Nav.Item>
            </Link>
            <Link to="/mes-polices-locales">
              <Nav.Item eventKey="upload" icon={<Icon icon="cloud-upload" />}>
                Téléverser
              </Nav.Item>
            </Link>
            <Link eventKey="download" to="/mes-polices-en-ligne">
              <Nav.Item icon={<Icon icon="download2" />}>Télécharger</Nav.Item>
            </Link>
            <Button onClick={() => setShowUserModal(true)}>
              Créer un compte
            </Button>
          </Nav>
        </rsNav.Body>
      </rsNav>
      <SignInModal show={showUserModal} close={() => setShowUserModal(false)} />
    </>
  );
};
