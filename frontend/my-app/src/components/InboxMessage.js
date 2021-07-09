import React from "react";
import profPic2 from "../images/userProfPic2.png";
import "../styles/InboxMessage.css";

function InboxMessage(props) {
  // const [sender, setSender] = useState();
  // const [content, setContent] = useState();

  return (
    <div className="main-wrapper-inbox-message">
      <div className="inbox-card">
        <img src={profPic2} alt="Sender Profile Pic" id="sender_prof_pic" />
        <div className="inbox-message-container">
          <h5 id="inbox-message-subject">{props.subject}</h5>
          <span id="inbox-message-preview">{props.content}</span>
          <div className="message-time-and-sender">
            <span id="time_inbox_messages">{props.dateSent}</span>
            <span id="message_sender">von {props.sender}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InboxMessage;
