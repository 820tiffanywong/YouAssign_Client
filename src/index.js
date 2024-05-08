import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import ApolloConnection from './apollo/apollo_gql_wrapper';
import { RecoilRoot } from "recoil";
import App from './App';
import ReactDOM from 'react-dom';

const firebaseConfig = {
  apiKey: "AIzaSyCZEaQ9Op9Cchl3koN5iERCZyghR1GM1g4",
  authDomain: "youassignclient.firebaseapp.com",
  projectId: "youassignclient",
  storageBucket: "youassignclient.appspot.com",
  messagingSenderId: "363910897759",
  appId: "1:363910897759:web:833f8400733b7e1ff33bea",
  measurementId: "G-22BYRVDS39"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Assuming your HTML file has a div with id='root' for the React app
const rootElement = document.getElementById('root');
console.log("Root is: ", root)
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <ApolloConnection>
      <App />
      </ApolloConnection>
    </React.StrictMode>
  );
}