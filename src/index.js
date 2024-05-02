import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import ApolloConnection from './apollo/apollo_gql_wrapper';
import { RecoilRoot } from "recoil";
import { App } from './App';

const firebaseConfig = {
  apiKey: "AIzaSyA09-qbO-9RiOKPLTwkeFkdGflyhM8-7-c",
  authDomain: "youassign-connect.firebaseapp.com",
  projectId: "youassign-connect",
  storageBucket: "youassign-connect.appspot.com",
  messagingSenderId: "98321837550",
  appId: "1:98321837550:web:0d297adac11ec6aef672ff",
  measurementId: "G-M7P6CX8HV4"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const main_container = createRoot(document.getElementById('root'));
main_container.render(
  <React.StrictMode>
    <ApolloConnection>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </ApolloConnection>
  </React.StrictMode>
);