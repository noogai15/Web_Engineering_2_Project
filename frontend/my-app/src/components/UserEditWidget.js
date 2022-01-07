import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { connect, useDispatch } from "react-redux";
import * as userActions from "../actions/UserActions";

function mapStateToProps(state) {
  return state;
}

function UserEditWidget(props) {
  const oldUserName = props.authenticationReducer.user.userName;

  const [show, setShow] = useState(false);
  const [newUserName, setnewUserName] = useState("");
  const [newPassword, setnewPassword] = useState("");

  const dispatch = useDispatch();

  function handleShow() {
    setShow(true);
  }
  function handleClose() {
    setShow(false);
  }

  function handleUsernameChange(e) {
    const { value } = e.target;
    setnewUserName(value);
  }

  function handlePasswordChange(e) {
    const { value } = e.target;
    setnewPassword(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    //props.editUser(oldUserName, newUserName, newPassword);

    dispatch(userActions.editUser(oldUserName, newUserName, newPassword));
    console.log("Pushed submit");

    setShow(false);
  }

  return (
    <div>
      <Button id="login_button" variant="primary" onClick={handleShow}>
        Edit
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>New Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                name="username"
                onChange={handleUsernameChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                name="password"
                onChange={handlePasswordChange}
              />
            </Form.Group>
            <Form.Group controlId="formBasicCheckbox"></Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

const ConnectedUserEditWidget = connect(mapStateToProps, null)(UserEditWidget);

export default ConnectedUserEditWidget;
