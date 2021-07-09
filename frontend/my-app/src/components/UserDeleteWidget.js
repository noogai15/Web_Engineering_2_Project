import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import * as userActions from "../actions/UserActions";

function mapStateToProps(state) {
  return state.authenticationReducer;
}

function UserDeleteWidget(props) {
  const accessToken = props.accessToken;
  const [show, setShow] = useState(false);
  const [userName, setUserName] = useState("");

  function handleShow() {
    setShow(true);
  }

  function handleClose() {
    setShow(false);
  }

  function handleUserNameChange(e) {
    e.preventDefault();
    const { value } = e.target;
    setUserName(value);
  }

  function handleSubmitDeleteUser(e) {
    e.preventDefault();
    userActions.deleteUser(userName, accessToken);
  }

  function handleSubmitDeleteGroup(e) {
    e.preventDefault();
    userActions.deleteGroup(userName);
  }

  return (
    <div>
      <Button id="login_button" variant="primary" onClick={handleShow}>
        Admin Privilege: Delete User
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Delete User with username:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Username"
                name="receiver"
                onChange={handleUserNameChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox"></Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={handleSubmitDeleteUser}
            >
              Delete User
            </Button>

            <Button
              variant="primary"
              type="submit"
              onClick={handleSubmitDeleteGroup}
            >
              Delete Group
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

const ConnectedUserDeleteWidget = connect(
  mapStateToProps,
  null
)(UserDeleteWidget);

export default ConnectedUserDeleteWidget;
