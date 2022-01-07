import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { connect, useDispatch } from "react-redux";
import "../styles/WidgetStyles.css";
import GroupRow from "./GroupRow";

function mapStateToProps(state, ownProps) {
  return {
    state,
    ownProps,
  };
}

function GroupManager(props) {
  const dispatch = useDispatch();

  useEffect(() => {});
  const [show, setShow] = useState(false);

  function handleShow() {
    setShow(true);
  }
  function handleClose() {
    setShow(false);
  }
  function generateGroupRows() {
    return props.state.groupsReducer.allGroups.map((group) => (
      <GroupRow key={group.id} groupName={group.groupName} />
    ));
  }
  return (
    <div>
      <Button id="manage_groups_button" variant="primary" onClick={handleShow}>
        Manage Groups
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Manage Groups</Modal.Title>
        </Modal.Header>
        <div className="group-manage-rows">{generateGroupRows()}</div>
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
const ConnectedGroupManager = connect(mapStateToProps, null)(GroupManager);

export default ConnectedGroupManager;
