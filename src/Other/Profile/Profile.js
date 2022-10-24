import React, { useContext, useRef, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [userName, setUserName] = useState(user.displayName);
  const photoUrlRef = useRef(user?.photoURL);
  console.log(user);
  const handelProfileDetails = (event) => {
    event.preventDefault();
    console.log(userName, photoUrlRef?.current.value);
  };
  const handelUserName = (event) => {
    setUserName(event?.target?.value);
  };
  return (
    <div>
      <h1>This is Profile router</h1>
      <Form onSubmit={handelProfileDetails}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            readOnly
            defaultValue={user?.email}
            type="email"
            placeholder="Enter email"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Your Name</Form.Label>
          <Form.Control
            onChange={handelUserName}
            type="text"
            defaultValue={user?.displayName}
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Photo URL</Form.Label>
          <Form.Control
            ref={photoUrlRef}
            defaultValue={user?.photoURL}
            type="text"
            placeholder="Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check type="checkbox" label="Check me out" />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default Profile;
