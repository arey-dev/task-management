/* eslint-disable no-undef */

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: "fem-task-management.firebaseapp.com",
  projectId: "fem-task-management",
  storageBucket: "fem-task-management.appspot.com",
  messagingSenderId: "883356806951",
  appId: "1:883356806951:web:60bd106cbf457b45f7c302",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
