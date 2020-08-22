import React, { useState } from "react";
import { SignIn } from "./SignIn";
import { LogIn } from "./Login";
import { Modal } from "rsuite";
import { eAuthModal } from "../../constants/authModalType";
export const AuthModal = ({ show, close, type }) => {
  const toggleModalBody = () => setBody(bodies.reverse()[0]);

  const signIn = <SignIn close={close} toggleModalBody={toggleModalBody} />;
  const logIn = <LogIn close={close} toggleModalBody={toggleModalBody} />;
  const [body, setBody] = useState(signIn);

  const bodies = type === eAuthModal.SIGNIN ? [signIn, logIn] : [logIn, signIn];

  return (
    <Modal show={show} onHide={close} size="xs">
      {body}
    </Modal>
  );
};
