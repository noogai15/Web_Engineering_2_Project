import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import { BiUser } from "react-icons/bi";
import { RiDraftLine, RiInboxLine, RiInboxUnarchiveLine } from "react-icons/ri";
import { connect, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import * as authenticationActions from "../actions/AuthenticationActions";
import * as messageActions from "../actions/MessageActions";
import profPic from "../images/userProfPic.png";
import "../styles/PrivatePage.css";
import InboxMessage from "./InboxMessage";
import SendMessageWidget from "./SendMessageWidget";
import Trending from "./Trending";
import UserDeleteWidget from "./UserDeleteWidget";
import GroupRegisterWidget from "./GroupRegisterWidget";
import GroupDeleteWidget from "./GroupDeleteWidget";

function mapStateToProps(state) {
  return state;
}

function PrivatePage(props) {
  useEffect(() => {
    fetchMessages();
  }, []);

  const dispatch = useDispatch();

  const user = useSelector(
    (state) => state.authenticationReducer.user.userName
  );

  const isAdmin = useSelector(
    (state) => state.authenticationReducer.user.isAdministrator
  );

  const redUserMessages = useSelector((state) => {
    return state.messagesReducer.userMessages;
  });

  const redGroupMessages = useSelector((state) => {
    return state.messagesReducer.groupMessages;
  });

  const [userMessages, setUserMessages] = useState([{}]);
  const [groupMessages, setGroupMessages] = useState([{}]);
  const [loggedInUser, setLoggedInUser] = useState(user);

  function fetchMessages() {
    //This only runs when the Component is mounted
    dispatch(messageActions.getUserMessages(user));
    dispatch(messageActions.getGroupMessages(user));
    debugger;
    setUserMessages(redUserMessages);
    debugger;

    setGroupMessages(redGroupMessages);
  }

  function handleLogout() {
    // const logout = props.logout;
    // logout();
    dispatch(authenticationActions.logout());
  }

  const RenderDeleteWidget = () => {
    if (isAdmin) {
      return <UserDeleteWidget />;
    } else {
      return null;
    }
  };

  return (
    <div className="main-wrapper-private">
      <div className="left-sidebar-private"></div>
      <div className="main-content-inbox">
        <div className="user-corner-inbox">
          <img src={profPic} alt="profile Pic" id="prof_pic" />
          <div className="welcome-corner">
            <div className="welcome-header">
              <h4>Your Profile</h4>
              <h5>{loggedInUser}</h5>
              <div className="delete_buttons">
                <Link to="/">
                  <Button onClick={handleLogout}>LOG OUT</Button>
                </Link>
                <RenderDeleteWidget />
                <GroupDeleteWidget />
              </div>
            </div>
          </div>
        </div>
        <div className="inbox-header">
          <div className="user-posts">
            <BiUser size={"26"} />
            <span>Your posts</span>
          </div>
          <div className="user-inbox">
            <RiInboxLine size={"26"} />
            <span>Inbox</span>
          </div>
          <div className="user-outbox">
            <RiInboxUnarchiveLine size={"26"} />
            <span>Outbox</span>
          </div>
          <div className="user-drafts">
            <RiDraftLine size={"26"} />
            <span>Drafts</span>
          </div>
          <div className="private-page-buttons">
            <SendMessageWidget />
            <GroupRegisterWidget />
          </div>
        </div>
        <div className="inbox-content">
          <h4 id="user_inbox_header"> User Inbox</h4>
          {userMessages.map((message) => {
            return (
              <InboxMessage
                sender={message.senderName}
                content={message.messageContent}
                subject={message.subject}
                dateSent={message.dateSent}
                key={message._id}
              />
            );
          })}
          <h4 id="group_inbox_header"> Group Inbox</h4>
          {groupMessages.map((message) => {
            return (
              <InboxMessage
                sender={message.senderName}
                content={message.messageContent}
                subject={message.subject}
                dateSent={message.dateSent}
                key={message._id}
              />
            );
          })}
        </div>
      </div>

      <div className="right-sidebar-private">
        <Trending />
      </div>
    </div>
  );
}

const ConnectedPrivatePage = connect(mapStateToProps, null)(PrivatePage);

export default ConnectedPrivatePage;
