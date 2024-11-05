// Import react and firebase
import React, { useRef, useState } from "react";
import firebase from "firebase/compat/app";  // Import Firebase to access FieldValue
import { firestore, auth, storage } from "../databaseCredentials";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

// Icon imports
import { IoArrowRedoCircle } from "react-icons/io5";
import { RiVideoUploadFill } from "react-icons/ri";

// JSX imports
import ChatMessage from "./chatMessage";

function ChatRoom() {
  const messagesRef = firestore.collection("messages");
  const query = messagesRef.orderBy("createdAt").limit(25);
  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState("");
  const [img, setImg] = useState(null);
  const [imgUrl, setImgUrl] = useState([]);
  const dummy = useRef();

  const sendMessage = async (e) => {
    e.preventDefault();
    const { uid, photoURL } = auth.currentUser;
    let imageUrl = null;

    // Upload the image if there is one
    if (img !== null) {
      const imgRef = ref(storage, `files/${img.name}`);
      const uploadResult = await uploadBytes(imgRef, img);
      console.log(uploadResult);

      imageUrl = await getDownloadURL(uploadResult.ref);
      setImgUrl((data) => [...data, imageUrl]);
    }

    // Add the message to the database
    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
      imageUrl: imageUrl || null  // image URL if it exists, otherwise null
    });

    setFormValue("");
    setImg(null);
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "image/png" || file.type === "image/jpeg")) {
      setImg(file);
    } else {
      alert("Please upload a PNG or JPG image.");
    }
  };

  return (
    <>
      <main>
        {messages && messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} />
        ))}
        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          type="text"
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="Say something nice"
        />


        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageUpload}
          style={{ display: "none" }} 
          id="upload-button"
        />
      
        {/*file input */}
        <button
          type="button"
          onClick={() => document.getElementById('upload-button').click()}  
          style={{ cursor: "pointer" }}
        >
          <RiVideoUploadFill />
        </button>

        <button type="submit" disabled={!formValue && !img}>
          <IoArrowRedoCircle />
        </button>
      </form>
    </>
  );
}

export default ChatRoom;
