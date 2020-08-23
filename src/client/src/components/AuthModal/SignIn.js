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

export const SignIn = ({ show, close }) => {
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
      localStorage.setItem("token", token),
      window.location.reload(false)
    );
  };

  const handleClose = () => {
    setFormValue(defaultFormValues);
    setError();
  };

  return (
    <Form onChange={handleChange} formValue={formValue}>
      <h5>Créer un compte</h5>
      {error && <p style={{ color: "red" }}>{error}</p>}
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
      <Button onClick={handleSubmit} appearance="primary">
        Créer mon compte
      </Button>
    </Form>
  );
};
