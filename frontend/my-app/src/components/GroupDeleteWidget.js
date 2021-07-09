import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { connect } from "react-redux";
import * as userActions from "../actions/UserActions";

function mapStateToProps(state) {
  return state.authenticationReducer;
}

function GroupDeleteWidget(props) {
  const accessToken = props.accessToken;
  const [show, setShow] = useState(false);
  const [groupName, setGroupName] = useState("");

  function handleShow() {
    setShow(true);
  }

  function handleClose() {
    setShow(false);
  }

  function handleGroupNameChange(e) {
    e.preventDefault();
    const { value } = e.target;
    setGroupName(value);
  }

  function handleSubmitDeleteGroup(e) {
    e.preventDefault();
    userActions.deleteGroup(groupName);
  }

  return (
    <div>
      <Button id="login_button" variant="primary" onClick={handleShow}>
        Delete Group
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Delete Group with group name:</Form.Label>
              <Form.Control
                type="text"
                placeholder="groupName"
                name="receiver"
                onChange={handleGroupNameChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox"></Form.Group>

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

const ConnectedGroupDeleteWidget = connect(
  mapStateToProps,
  null
)(GroupDeleteWidget);

export default ConnectedGroupDeleteWidget;
