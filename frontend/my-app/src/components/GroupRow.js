import React, { useState } from "react";
import { connect, useDispatch } from "react-redux";
import {
  dispatchDeleteGroup,
  dispatchGetAllGroups,
  editGroup,
} from "../actions/UserActions";
import "../styles/WidgetStyles.css";

function mapStateToProps(state, ownProps) {
  return {
    allGroups: state.groupsReducer.allGroups,
  };
}
function GroupRow(props) {
  const dispatch = useDispatch();
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(props.groupName);

  function handleGroupNameChange(e) {
    setNewName(e.target.value.trim());
  }
  function handleDelete(e) {
    dispatch(dispatchDeleteGroup(props.groupName));
    dispatch(dispatchGetAllGroups());
  }
  return (
    <div class="row-wrapper">
      <div className="info-row">
        <form>
          <input
            id="row-groupName"
            type="text"
            defaultValue={props.groupName}
            onChange={(e) => {
              handleGroupNameChange(e);
            }}
            disabled={!editing}
          ></input>
        </form>
        <div class="manage-buttons">
          <button
            id="edit-button"
            onClick={() => {
              if (!editing) setEditing(true);
              else setEditing(false);
            }}
          >
            Edit
          </button>
          <button id="delete-button" onClick={(e) => handleDelete()}>
            Delete
          </button>
        </div>
      </div>
      <div className="cc-buttons">
        <button
          id="cancel-button"
          hidden={!editing}
          onClick={(e) => {
            setNewName("");
            if (editing) setEditing(false);
          }}
        >
          Cancel
        </button>
        <button
          id="confirm-button"
          hidden={!editing}
          onClick={(e) => {
            editGroup(props.groupName, newName);
            dispatch(dispatchGetAllGroups());
            if (editing) setEditing(false);
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
const ConnectedGroupRow = connect(mapStateToProps, null)(GroupRow);
export default ConnectedGroupRow;
