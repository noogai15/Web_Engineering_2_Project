import React, { useState } from "react";
import { GrUserAdmin } from "react-icons/gr";
import { connect, useDispatch } from "react-redux";
import { dispatchDeleteUser } from "../actions/AuthenticationActions";
import { editUser } from "../actions/UserActions";
import "../styles/WidgetStyles.css";

function mapStateToProps(state, ownProps) {
  return {
    token: state.authenticationReducer.accessToken,
    user: state.authenticationReducer.user,
  };
}
function UserRow(props) {
  const dispatch = useDispatch();
  const [deletedUser, setDeletedUser] = useState();
  const [editing, setEditing] = useState(false);
  const [newName, setNewName] = useState(props.userName);
  const [newPW, setNewPW] = useState("");

  function handleUsernameChange(e) {
    setNewName(e.target.value.trim());
  }
  function handlePasswordChange(e) {
    setNewPW(e.target.value.trim());
  }
  function handleDelete(e) {
    dispatch(dispatchDeleteUser(props.userName, props.token));
  }

  function makeAdminIcon() {
    if (props.isAdmin) return <GrUserAdmin id="admin-icon" />;
  }

  return (
    <div class="row-wrapper">
      <div className="info-row">
        <form>
          <input
            id="row-username"
            type="text"
            defaultValue={props.userName}
            onChange={(e) => {
              handleUsernameChange(e);
            }}
            disabled={!editing}
          ></input>
          <input
            hidden={!editing}
            placeholder="new password..."
            type="text"
            id="row-password"
            onChange={(e) => handlePasswordChange(e)}
          ></input>
        </form>
        {makeAdminIcon()}

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
            setNewPW("");
            if (editing) setEditing(false);
          }}
        >
          Cancel
        </button>
        <button
          id="confirm-button"
          hidden={!editing}
          onClick={(e) => {
            if (newPW.trim() === "") return;
            dispatch(editUser(props.userName, newName, newPW));
            if (editing) setEditing(false);
          }}
        >
          Confirm
        </button>
      </div>
    </div>
  );
}
const ConnectedUserRow = connect(mapStateToProps, null)(UserRow);
export default ConnectedUserRow;
