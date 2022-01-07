import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { connect, useDispatch } from "react-redux";
import * as registerActions from "../actions/RegisterActions";

function mapStateToProps(state) {
  return state.authenticationReducer;
}

function GroupRegisterWidget(props) {
  const dispatch = useDispatch();
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState([]);

  const [show, setShow] = useState(false);

  function handleShow() {
    setShow(true);
  }
  function handleClose() {
    setShow(false);
  }

  function handleGroupNameChange(e) {
    const { value } = e.target;
    setGroupName(value);
  }

  async function handleMembersChange(e) {
    const { value } = e.target;
    const memberArray = value.split(", ");
    await memberArray[memberArray.length - 1].trim();
    setMembers(memberArray);
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(
      registerActions.getRegisterGroup(groupName, members, props.accessToken)
    );
    console.log("Pushed submit");
    setShow(false);
  }

  return (
    <div>
      <Button id="login_button" variant="primary" onClick={handleShow}>
        Create Group
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Group Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Group Name"
                name="groupName"
                onChange={handleGroupNameChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Group Members</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. User1, User2, User3..."
                name="members"
                onChange={handleMembersChange}
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

const ConnectedGroupRegisterWidget = connect(
  mapStateToProps,
  null
)(GroupRegisterWidget);

export default ConnectedGroupRegisterWidget;
