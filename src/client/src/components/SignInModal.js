import React, { useState } from "react";
import {
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  Form,
} from "rsuite";
import { createUser } from "../Api";

export const SignInModal = ({ show, close }) => {
  const [formValue, setFormValue] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (value) => setFormValue(value);
  const handleSubmit = async () => {
    const { username, email, password } = formValue;
    if (!username || !email | !password) {
      return setError("Tous les champs doivent être rempli");
    }
    await createUser(formValue, setError);
  };

  const handleClose = () => {
    setFormValue({
      username: "",
      email: "",
      password: "",
    });
    setError();
    return close();
  };

  return (
    <Modal show={show} onHide={handleClose} size="xs">
      <Modal.Header>
        <Modal.Title>Nouvel utilisateur</Modal.Title>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </Modal.Header>
      <Modal.Body>
        <Form fluid onChange={handleChange} formValue={formValue}>
          <FormGroup>
            <ControlLabel>Identifiant</ControlLabel>
            <FormControl name="username" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Email</ControlLabel>
            <FormControl name="email" type="email" />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Mot de passe</ControlLabel>
            <FormControl name="password" type="password" />
          </FormGroup>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit} appearance="primary">
          Ok
        </Button>
        <Button onClick={handleClose} appearance="subtle">
          Pas ok
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
