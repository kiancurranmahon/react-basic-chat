//import logo from './logo.svg';
import "./App.css";

// Import database connections
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// Firebase hacks
import { useAuthState } from "react-firebase-hooks/auth";
import { useCollectionData } from "react-firebase-hooks/firestore";

//import icons
import { useRef, useState } from "react";
import { IoArrowRedoCircle } from "react-icons/io5";

// Connect to firebase
firebase.initializeApp({
  apiKey: "AIzaSyD1rzcF-bWyhPYQLDnM288koXTdRLbCoow",
  authDomain: "samplechat-68538.firebaseapp.com",
  projectId: "samplechat-68538",
  storageBucket: "samplechat-68538.appspot.com",
  messagingSenderId: "321463709349",
  appId: "1:321463709349:web:b7deea3175671c01d4274c",
  measurementId: "G-ZELJNKN9T9",
});

// Create constants
const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth); // user constant
  document.title = "Super Chat";
  // if user is defined, chat room.
  return (
    <div className="App">
      <header >
        <h1>Super Chat</h1>
        <SignOut />
      </header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function SignIn() {
  // sign in function, temporarliy using google
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };

  return <button onClick={signInWithGoogle}>Sign in with Google</button>;
}

function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
  );
}

// Main Chat room
function ChatRoom() {
  const messagesRef = firestore.collection("messages"); // Create messages store in database
  const query = messagesRef.orderBy("createdAt").limit(25); // Get other messages, limited to 25

  const [messages] = useCollectionData(query, { idField: "id" });
  const [formValue, setFormValue] = useState(""); // store the new message content
  const dummy = useRef();

  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    });

    setFormValue("");
    dummy.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <main>
        {messages &&
          messages.map((msg) => <ChatMessage key={msg.id} message={msg} />)}

        <span ref={dummy}></span>
      </main>

      <form onSubmit={sendMessage}>
        <input
          value={formValue}
          onChange={(e) => setFormValue(e.target.value)}
          placeholder="say something nice"
        />

        <button type="submit" disabled={!formValue}>
          <IoArrowRedoCircle />
        </button>
      </form>
    </>
  );
}

//What is a message
function ChatMessage(props) {
  const { text, uid, photoURL } = props.message; // message text + user id + user icon

  const messageClass = uid === auth.currentUser.uid ? "sent" : "received"; // link messages to current user to show sent and recieved
  const defaultAvatar = "https://example.com/default-avatar.png"; // Replace with your default avatar URL

  // Log photoURL for debugging
  console.log("photoURL:", photoURL);

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img src={photoURL || defaultAvatar } alt="User avatar" />

        <p>{text}</p>
      </div>
    </>
  );
}

export default App;
