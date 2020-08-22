import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Navbar as rsNav, Nav, Icon } from "rsuite";
import { AuthModal } from "../AuthModal/AuthModal";
import { UserContext } from "../context/UserProvider";
import { eTokenStatus } from "../../constants/tokenStatus";

export const Navbar = () => {
  const [active, setActive] = useState("home");
  const [showUserModal, setShowUserModal] = useState(false);
  // const [theme, toggleTheme] = useContext(ThemeContext);
  const [loadingUser, tokenStatus, user] = useContext(UserContext);
  const username = user?.username || "";

  const styles = {
    marginBottom: 50,
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
              <Nav.Item icon={<Icon icon="help-o" />}>Aide</Nav.Item>
            </Link>
            <Link to="/mes-polices-locales">
              <Nav.Item eventKey="upload" icon={<Icon icon="cloud-upload" />}>
                Téléverser
              </Nav.Item>
            </Link>
            <Link eventKey="download" to="/mes-polices-en-ligne">
              <Nav.Item icon={<Icon icon="download2" />}>Télécharger</Nav.Item>
            </Link>
            {!loadingUser &&
              [eTokenStatus.NOTOKEN, eTokenStatus.EXPIRED].includes(
                tokenStatus
              ) && (
                <Nav.Item onClick={() => setShowUserModal(true)}>
                  Connexion / Créer un compte
                </Nav.Item>
              )}

            {!loadingUser && tokenStatus === eTokenStatus.OK && (
              <Nav.Item>
                Connecté en tant que {username} -{" "}
                <a
                  onClick={() => {
                    console.log("deleting localStorage");
                    window.localStorage.removeItem("token");
                    window.localStorage.removeItem("username");
                    window.location.reload(false);
                  }}
                >
                  Déconnexion{" "}
                </a>
              </Nav.Item>
            )}
          </Nav>
        </rsNav.Body>
      </rsNav>

      <AuthModal show={showUserModal} close={() => setShowUserModal(false)} />
    </>
  );
};
