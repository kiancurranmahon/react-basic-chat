// components/ChatMessage.jsx
import React from "react";
import { auth } from "../databaseCredentials";

function ChatMessage(props) {
  const { text, uid, photoURL, imageUrl } = props.message;
  const messageClass = uid === auth.currentUser.uid ? "sent" : "received";
  const defaultAvatar = "https://example.com/default-avatar.png"; // Update with a real image URL if needed

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL || defaultAvatar} alt="User avatar" className="avatar" />
      
  {imageUrl && text ? ( 
    <div className="textImg">
      <img src={imageUrl} alt="Uploaded content" />
      <p>{text}</p>
    </div>
  ) : (
    <>
      {imageUrl && <img src={imageUrl} alt="Uploaded content" className="uploadImg" />}
      {text && <p>{text}</p>}
    </>
  )}
</div>
  );
}

export default ChatMessage;

