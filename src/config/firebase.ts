import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfLJkTbS-szkfrU0LuFulP2tMCwA-D8uA",
  authDomain: "space-6d966.firebaseapp.com",
  projectId: "space-6d966",
  storageBucket: "space-6d966.appspot.com",
  messagingSenderId: "811064267960",
  appId: "1:811064267960:web:c9ec83eaa04eb16f1d104d",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
