
import React from "react";
import "./App.css";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./databaseCredentials.jsx";

// Import database connections
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";


// Import Components
import ChatRoom from "./components/chatRoom";

function App() {
  const [user] = useAuthState(auth); // user constant
  document.title = "React Super Chat";

  return (
    <div className="App">
      <header>
        <h1>React Super Chat</h1>
        <SignOut />
      </header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

function SignOut() {
  return (
    auth.currentUser && <button onClick={() => auth.signOut()}>Sign Out</button>
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

export default App;
