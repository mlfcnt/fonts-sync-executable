import React, { useState, useContext } from "react";
import {
  Modal,
  Button,
  FormGroup,
  ControlLabel,
  FormControl,
  Form,
} from "rsuite";
import { logUserIn } from "../../Api";
import { UserContext } from "../context/UserProvider";

export const LogIn = ({ close, toggleModalBody }) => {
  const defaultFormValues = {
    username: "",
    password: "",
  };
  const [formValue, setFormValue] = useState(defaultFormValues);
  const [error, setError] = useState("");
  const [loadingUser, tokenStatus, user, refetch] = useContext(UserContext);

  const handleChange = (value) => setFormValue(value);
  const handleSubmit = async () => {
    const { username, password } = formValue;
    if (!username || !password)
      return setError("Tous les champs doivent être rempli");

    const { token, success, errorMessage } = await logUserIn(formValue);
    if (!success) return setError(errorMessage);
    handleClose();
    localStorage.setItem("username", username);
    localStorage.setItem("token", token);
    return refetch();
  };

  const handleClose = () => {
    setFormValue(defaultFormValues);
    setError();
    return close();
  };

  return (
    <>
      <Modal.Header>
        <Modal.Title>Connexion</Modal.Title>
        <p>
          Pas de compte ?{" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={toggleModalBody}
          >
            Créer un compte
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
