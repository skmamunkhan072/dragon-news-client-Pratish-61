import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../contexts/AuthProvider/AuthProvider";
import { toast } from "react-hot-toast";

const Register = () => {
  const {
    createUser,
    handelUserCreate,
    userProfileAndNameUpdate,
    handelUserVeryfy,
  } = useContext(AuthContext);
  const [terms, setTerms] = useState(false);

  const nevigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;
    const profileUrl = form.photoURL.value;
    const name = form.name.value;
    handelUserCreate(email, password)
      .then((result) => {
        const user = result.user;
        // console.log(user);
        userEmailVerify();
        nevigate("/");
        form.reset();
        userNameProfileUpdate(name, profileUrl);
        toast.success("please  verify email address");
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  // user name and profile update function
  const userNameProfileUpdate = (name, profileURL) => {
    const profile = { displayName: name, photoURL: profileURL };
    userProfileAndNameUpdate(profile)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };
  // handel user email verify function
  const userEmailVerify = () => {
    handelUserVeryfy()
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  // chack and register bun disabled and anabol function
  const hentelTermsAndConditionCheck = (event) => {
    setTerms(event.target.checked);
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Your Name</Form.Label>
        <Form.Control name="name" type="text" placeholder="Your Name" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Photo URL</Form.Label>
        <Form.Control name="photoURL" type="text" placeholder="Phot URL" />
      </Form.Group>

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
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          onClick={hentelTermsAndConditionCheck}
          label={
            <>
              Accept <Link to="/terms">Terms and Condition</Link>
            </>
          }
        />
      </Form.Group>
      <Button variant="primary" type="submit" disabled={!terms}>
        Register
      </Button>
      <Form.Text className="text-danger"></Form.Text>
    </Form>
  );
};

export default Register;
