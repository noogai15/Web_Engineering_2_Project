import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { connect, useDispatch } from "react-redux";
import "../styles/WidgetStyles.css";
import UserRow from "./UserRow";

function mapStateToProps(state, ownProps) {
  return {
    state,
    ownProps,
  };
}

function UserManager(props) {
  useEffect(() => {});
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();

  function handleShow() {
    setShow(true);
  }
  function handleClose() {
    setShow(false);
  }
  function generateUserRows() {
    return props.state.authenticationReducer.users.map((user) => (
      <UserRow
        key={user.id}
        userName={user.userName}
        isAdmin={user.isAdministrator}
        token={props.state.authenticationReducer.accessToken}
      />
    ));
  }
  return (
    <div>
      <Button id="manage_users_button" variant="primary" onClick={handleShow}>
        Manage Users
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Manage Users</Modal.Title>
        </Modal.Header>
        <div className="user-manage-rows">{generateUserRows()}</div>
        <Modal.Body></Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
const ConnectedUserManager = connect(mapStateToProps, null)(UserManager);

export default ConnectedUserManager;
