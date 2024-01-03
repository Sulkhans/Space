import { useState } from "react";
import { auth, googleProvider } from "../../config/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";

type SigninProps = {
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  setUser: React.Dispatch<any>;
};

export const Signin = ({ setIsRegistered, user, setUser }: SigninProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const handleSignIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/Space/home");
    } catch (err) {
      console.error(err);
    }
  };
  const handleSignInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.error(err);
    }
  };
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (err) {
      console.error(err);
    }
  };
  return user ? (
    <div>
      <h1>you are already signed in with {user.email}</h1>
      <Link to={"/Space/home"} />
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  ) : (
    <div>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSignIn}>Sign in</button>
      <button onClick={handleSignInWithGoogle}>Sign in w google</button>
      <button onClick={() => setIsRegistered(false)}>
        Dont have an account?
      </button>
    </div>
  );
};
