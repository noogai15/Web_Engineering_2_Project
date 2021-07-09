import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { connect, useDispatch } from "react-redux";
import * as messageActions from "../actions/MessageActions";
import "../styles/WidgetStyles.css";

function mapStateToProps(state) {
  return state.authenticationReducer;
}

function SendMessageWidget(props) {
  const [receiver, setReceiver] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");

  const [show, setShow] = useState(false);

  const dispatch = useDispatch();

  function handleShow() {
    setShow(true);
  }
  function handleClose() {
    setShow(false);
  }

  function handleReceiverChange(e) {
    const { value } = e.target;
    setReceiver(value);
  }

  function handleSubjectChange(e) {
    const { value } = e.target;
    setSubject(value);
  }

  function handleContentChange(e) {
    const { value } = e.target;
    setContent(value);
  }

  function handleSubmitUserMessage(e) {
    e.preventDefault();
    dispatch(
      messageActions.sendUserMessage(
        receiver,
        props.user.userName,
        subject,
        content
      )
    );
    console.log("Pushed submit");
    setShow(false);
  }

  function handleSubmitGroupMessage(e) {
    e.preventDefault();
    dispatch(
      messageActions.sendGroupMessage(
        receiver,
        props.user.userName,
        subject,
        content
      )
    );
    console.log("Pushed submit");
    setShow(false);
  }

  return (
    <div>
      <Button id="send_message_button" variant="primary" onClick={handleShow}>
        Send Message
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Send message</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Send your message to:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username or Group name"
                name="receiver"
                onChange={handleReceiverChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Subject:</Form.Label>
              <Form.Control
                type="subject"
                placeholder="Enter subject"
                name="subject"
                onChange={handleSubjectChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Write your message here:</Form.Label>
              <Form.Control
                type="message"
                placeholder="Enter message"
                name="message"
                onChange={handleContentChange}
              />
            </Form.Group>

            <Form.Group controlId="formBasicCheckbox"></Form.Group>
            <Button
              variant="primary"
              type="submit"
              onClick={handleSubmitUserMessage}
            >
              Send to User
            </Button>
            <Button
              variant="primary"
              type="submit"
              onClick={handleSubmitGroupMessage}
            >
              Send to Group
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

const ConnectedSendMessageWidget = connect(
  mapStateToProps,
  null
)(SendMessageWidget);

export default ConnectedSendMessageWidget;
