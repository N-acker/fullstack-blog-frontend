import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBR6nZp9tb6UhzP3d9sId2UrDG1DJ1mbA0",
  authDomain: "my-react-blog-c1727.firebaseapp.com",
  projectId: "my-react-blog-c1727",
  storageBucket: "my-react-blog-c1727.firebasestorage.app",
  messagingSenderId: "64623181707",
  appId: "1:64623181707:web:b550f833f0fe631905798e"
};
// above these are public keys so its okay to have them in the git repo
// if they were privat keys it would be a bad idea to have them in a publiv git repo

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
