import React, { useState } from "react";
import {
  Button,
  Checkbox,
  Label,
  Modal,
  TextInput,
  Toast,
} from "flowbite-react";
import { Exclamation } from "heroicons-react";
import { register } from "../../../services/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const initialState = {
    email: "",
    password: "",
    confirmPassword: "",
  };
  const [accountSignUp, setAccountSignUp] = useState(initialState);
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <React.Fragment>
        <Button onClick={() => setShow(true)}>Sign up</Button>
        <Modal
          show={show}
          size="md"
          popup={true}
          id="signInModal"
          onClose={() => setShow(false)}
        >
          <Modal.Header />
          <Modal.Body>
            <form className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8 font-lexend">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                Sign up to our platform
              </h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="email" value="Your email" />
                </div>
                <TextInput
                  id="email"
                  type="email"
                  name="email"
                  placeholder="name@company.com"
                  required={true}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Your password" />
                </div>
                <TextInput
                  id="password"
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  required={true}
                  onChange={handleChange}
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="password" value="Confirm your password" />
                </div>
                <TextInput
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  required={true}
                  onChange={handleChange}
                />
              </div>
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <Checkbox id="remember" />
                  <Label htmlFor="remember">Remember me</Label>
                </div>
              </div>
              {error && (
                <Toast>
                  <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-orange-100 text-orange-500 dark:bg-orange-700 dark:text-orange-200">
                    <Exclamation className="h-5 w-5" />
                  </div>
                  <div className="ml-3 text-sm font-normal">{errorMessage}</div>
                  <Toast.Toggle />
                </Toast>
              )}
              <div className="w-full">
                <Button className="w-full" onClick={handleSubmit}>
                  Sign up to your account
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </React.Fragment>
    </div>
  );

  function handleChange(event: { target: { name: any; value: any } }) {
    setError(false);
    setAccountSignUp({
      ...accountSignUp,
      [event.target.name]: event.target.value,
    });
  }

  function checkPassword(password: string) {
    const validPassword = new RegExp(
      "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{6,14}$"
    );
    if (!validPassword.test(password)) {
      return false;
    } else return true;
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (!checkPassword(accountSignUp.password)) {
      setError(true);
      setErrorMessage(
        "Password must be 6-14 characters long, contain at least 1 uppercase letter and at least 1 special character!"
      );
    } else if (accountSignUp.password !== accountSignUp.confirmPassword) {
      setError(true);
      setErrorMessage("Password not match!");
    } else {
      await register(accountSignUp.email, accountSignUp.password).catch(
        (err) => {
          setError(true);
          setErrorMessage(err.response.data.error);
        }
      );
    }
    if (!error) {
      window.alert("Check your email!");
      
    }
  }
}
