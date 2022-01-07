import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { BiUser } from "react-icons/bi";
import { RiDraftLine, RiInboxLine, RiInboxUnarchiveLine } from "react-icons/ri";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as authenticationActions from "../actions/AuthenticationActions";
import * as messageActions from "../actions/MessageActions";
import * as userActions from "../actions/UserActions";
import profPic from "../images/userProfPic.png";
import "../styles/PrivatePage.css";
import ConnectedGroupManager from "./GroupManager";
import GroupRegisterWidget from "./GroupRegisterWidget";
import ConnectedInboxMessage from "./InboxMessage";
import SendMessageWidget from "./SendMessageWidget";
import Trending from "./Trending";
import ConnectedUserManager from "./UserManager";

class PrivatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userMessages: [],
      groupMessages: [],
      userGroups: [],
      loggedInUser: props.user.userName,
      isAdmin: props.isAdmin,
    };
  }
  componentDidMount() {
    const { getUserMessages } = this.props;
    const { getGroupMessages } = this.props;
    const { getAllUsers } = this.props;
    const { getAllGroups } = this.props;
    userActions.getUserGroups(this.props.user.id).then((groups) => {
      if (!groups) return;
      this.setState({ userGroups: groups });
    });
    getUserMessages(this.props.user.userName);
    getGroupMessages(this.props.user.userName);
    getAllUsers();
    getAllGroups();
    if (this.state.userMessages !== []) return;
    this.setState({ userMessages: this.props.userMessages });
    this.setState({ groupMessages: this.props.groupMessages });
  }

  handleLogout = () => {
    const logout = this.props.logout;
    logout();
  };

  createUserInbox = (userMessages) => {
    if (userMessages === undefined) return;
    return userMessages.map((message) => (
      <ConnectedInboxMessage
        sender={message.senderName}
        content={message.messageContent}
        subject={message.subject}
        dateSent={message.dateSent}
        _id={message._id}
        key={message._id}
      />
    ));
  };

  RenderGroupmanager = () => {
    if (this.state.isAdmin) {
      return <ConnectedGroupManager />;
    } else {
      return null;
    }
  };
  createGroupInbox = (groupMessages) => {
    if (groupMessages === undefined) return;
    return groupMessages.map((message) => (
      <ConnectedInboxMessage
        sender={message.senderName}
        content={message.messageContent}
        subject={message.subject}
        dateSent={message.dateSent}
        _id={message._id}
        key={message._id}
      />
    ));
  };
  RenderUserManager = () => {
    if (this.state.isAdmin) {
      return <ConnectedUserManager />;
    } else {
      return null;
    }
  };
  render() {
    return (
      <div className="main-wrapper-private">
        <div className="left-sidebar-private"></div>
        <div className="main-content-inbox">
          <div className="user-corner-inbox">
            <img src={profPic} alt="profile Pic" id="prof_pic" />
            <div className="welcome-corner">
              <div className="welcome-header">
                <h4>Your Profile</h4>
                <h5>{this.state.loggedInUser}</h5>
                <div className="delete_buttons">
                  <Link to="/">
                    <Button onClick={this.handleLogout}>LOG OUT</Button>
                  </Link>
                  {this.RenderUserManager()}
                  {this.RenderGroupmanager()}
                </div>
              </div>
            </div>
          </div>
          <div className="private-page-buttons">
            <SendMessageWidget />
            <GroupRegisterWidget />
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
          </div>
          <div className="inbox-content">
            <div></div>
            <h3 id="user_inbox_header"> User Inbox</h3>
            {this.createUserInbox(this.props.userMessages)}
            <h4 id="group_inbox_header"> Group Inbox</h4>
            <div className="group_inbox_wrapper">
              <h4>Your groups:&nbsp;</h4>
              <h5 id="userGroups">
                {this.state.userGroups
                  .map((group) => {
                    return group.groupName;
                  })
                  .join(", ")}
              </h5>
            </div>
            {this.createGroupInbox(this.props.groupMessages)}
          </div>
        </div>

        <div className="right-sidebar-private">
          <Trending />
        </div>
      </div>
    );
  }
}

//Stuff that comes from the Store
const mapStateToProps = (state) => ({
  userMessages: state.messagesReducer.userMessages,
  groupMessages: state.messagesReducer.groupMessages,
  user: state.authenticationReducer.user,
  isAdmin: state.authenticationReducer.user.isAdministrator,
});

//Stuff that comes from Actions
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      getAllUsers: authenticationActions.getAllUsers,
      getAllGroups: userActions.dispatchGetAllGroups,
      getUserMessages: messageActions.getUserMessages,
      getGroupMessages: messageActions.getGroupMessages,
      logout: authenticationActions.logout,
    },
    dispatch
  );

const ConnectedPrivatePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(PrivatePage);
export default ConnectedPrivatePage;
