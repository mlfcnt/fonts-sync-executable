import React, { useState } from "react";
import {
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  Form,
} from "rsuite";
import { createUser } from "../../Api";

export const SignIn = ({ close, toggleModalBody }) => {
  const defaultFormValues = {
    username: "",
    email: "",
    password: "",
  };
  const [formValue, setFormValue] = useState(defaultFormValues);
  const [error, setError] = useState("");

  const handleChange = (value) => setFormValue(value);
  const handleSubmit = async () => {
    const { username, email, password } = formValue;
    if (!username || !email | !password)
      return setError("Tous les champs doivent être rempli");

    const { token, success, errorMessage } = await createUser(formValue);
    if (!success) return setError(errorMessage);
    return (
      handleClose(),
      localStorage.setItem("username", username),
      localStorage.setItem("token", token)
    );
  };

  const handleClose = () => {
    setFormValue(defaultFormValues);
    setError();
    return close();
  };

  return (
    <>
      <Modal.Header>
        <Modal.Title>Créer un compte</Modal.Title>
        <p>
          Déjà un compte ?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={toggleModalBody}
          >
            Connexion
          </span>
        </p>
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
    </>
  );
};
