import { initializeApp } from "firebase/app";
import { getAuth, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAVr2yS_rdJFj_5XOMsjH3yadSt6n-Osz0",
  authDomain: "desafio-03-aws-react-b5f7a.firebaseapp.com",
  projectId: "desafio-03-aws-react-b5f7a",
  storageBucket: "desafio-03-aws-react-b5f7a.firebasestorage.app",
  messagingSenderId: "1006035989348",
  appId: "1:1006035989348:web:7700385fd9073d8ea14071",
  measurementId: "G-GEBKKVR8W9"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const githubProvider = new GithubAuthProvider();
