import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar as rsNav, Nav, Icon, Button } from "rsuite";
import { AuthModal } from "../AuthModal/AuthModal";
import { UserContext } from "../context/UserProvider";
import { eTokenStatus } from "../../constants/tokenStatus";
import { eAuthModal } from "../../constants/authModalType";

export const Navbar = () => {
  const [active, setActive] = useState("home");
  const [showUserModal, setShowUserModal] = useState(false);
  // const [theme, toggleTheme] = useContext(ThemeContext);
  const [loadingUser, tokenStatus, user] = useContext(UserContext);
  const username = user?.username || "";

  const styles = {
    marginBottom: 50,
  };

  const authToDisplay = () => {
    if (loadingUser) return;
    return tokenStatus === eTokenStatus.EXPIRED
      ? eAuthModal.LOGIN
      : eAuthModal.SIGNIN;
  };
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
            {!loadingUser && tokenStatus === eTokenStatus.NOTOKEN && (
              <Nav.Item onClick={() => setShowUserModal(true)}>
                Créer un compte
              </Nav.Item>
            )}
            {!loadingUser && tokenStatus === eTokenStatus.EXPIRED && (
              <Nav.Item onClick={() => setShowUserModal(true)}>
                Se connecter
              </Nav.Item>
            )}
            {!loadingUser && tokenStatus === eTokenStatus.OK && (
              <Nav.Item>Connecté ({username})</Nav.Item>
            )}
          </Nav>
        </rsNav.Body>
      </rsNav>

      <AuthModal
        show={showUserModal}
        close={() => setShowUserModal(false)}
        type={authToDisplay}
      />
    </>
  );
};
