import React, { useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import { toast } from "react-hot-toast";

const Login = () => {
  const { handelLoginGmailPassword, setLoding } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const forms = location?.state?.from?.pathname || "/";

  // console.log(form);
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    handelLoginGmailPassword(email, password)
      .then((result) => {
        form.reset();
        if (result.user.emailVerified) {
          navigate(forms, { replace: true });
        } else {
          toast.error("Your email is no't verified. please your email verify");
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoding(false);
      });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          name="email"
          type="email"
          placeholder="Enter email"
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          name="password"
          type="password"
          placeholder="Password"
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Login
      </Button>
      <Form.Text className="text-danger"></Form.Text>
    </Form>
  );
};

export default Login;
