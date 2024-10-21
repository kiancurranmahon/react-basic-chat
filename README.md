# React Super Chat

This project is a real-time chat application built with [React](https://reactjs.org/), [Firebase](https://firebase.google.com/), and [Firestore](https://firebase.google.com/products/firestore). It allows users to sign in with Google, send and receive real-time messages, and displays user avatars in the chat.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in development mode.  
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.  
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.  
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.  
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.  
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc.) directly into your project so you have full control over them. All the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them.

## Firebase Setup

1. Create a Firebase project and enable Firebase Authentication (Google Sign-In) and Firestore.
2. Replace the Firebase configuration in `databaseCredentials.js` with your own Firebase project’s config:

   ```javascript
   firebase.initializeApp({
     apiKey: "YOUR_API_KEY",
     authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
     projectId: "YOUR_PROJECT_ID",
     storageBucket: "YOUR_PROJECT_ID.appspot.com",
     messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
     appId: "YOUR_APP_ID",
     measurementId: "YOUR_MEASUREMENT_ID",
   });
   ```

## Learn More

You can learn more about Firebase and React here:

- [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started)
- [Firebase documentation](https://firebase.google.com/docs)
- [React documentation](https://reactjs.org/)

### Code Splitting

Learn more about [code splitting](https://facebook.github.io/create-react-app/docs/code-splitting).

### Analyzing the Bundle Size

Learn more about [analyzing the bundle size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size).

### Making a Progressive Web App

Learn more about [making a Progressive Web App](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app).

### Deployment

Learn more about [deployment](https://facebook.github.io/create-react-app/docs/deployment).

### `npm run build` fails to minify

Learn more about [troubleshooting build errors](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify).
