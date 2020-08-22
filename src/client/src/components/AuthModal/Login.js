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

export const LogIn = ({ show, close }) => {
  const defaultFormValues = {
    username: "",
    password: "",
  };
  const [formValue, setFormValue] = useState(defaultFormValues);
  const [error, setError] = useState("");

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
    return window.location.reload(false);
  };

  const handleClose = () => {
    setFormValue(defaultFormValues);
    setError();
  };

  return (
    <Form onChange={handleChange} formValue={formValue}>
      <h5>Connexion</h5>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <FormGroup>
        <ControlLabel>Identifiant</ControlLabel>
        <FormControl name="username" />
      </FormGroup>
      <FormGroup>
        <ControlLabel>Mot de passe</ControlLabel>
        <FormControl name="password" type="password" />
      </FormGroup>
      <Button onClick={handleSubmit} appearance="primary">
        Connexion
      </Button>
    </Form>
  );
};
