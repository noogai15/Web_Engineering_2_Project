import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as registerActions from "../actions/RegisterActions";

function mapStateToProps(state) {
  return state.authenticationReducer;
}

function UserRegisterWidget() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  function handleShow() {
    setShow(true);
  }
  function handleClose() {
    setShow(false);
  }

  function handleUsernameChange(e) {
    const { value } = e.target;
    setUserName(value);
  }

  function handlePasswordChange(e) {
    const { value } = e.target;
    setPassword(value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    registerActions.registerUser(username, password);
    console.log("Pushed submit");
    setShow(false);
  }

  return (
    <div>
      <Button id="login_button" variant="primary" onClick={handleShow}>
        Register
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                name="username"
                onChange={handleUsernameChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
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
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      showRegisterDialogAction: registerActions.getShowRegisterDialogAction,
      hideRegisterDialogAction: registerActions.getHideRegisterDialogAction,
      registerUserAction: registerActions.registerUser,
    },
    dispatch
  );

const ConnectedUserRegisterWidget = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserRegisterWidget);

export default ConnectedUserRegisterWidget;
