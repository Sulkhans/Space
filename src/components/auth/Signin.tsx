import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, googleProvider } from "../../config/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { handleFirebaseError } from "../../config/firebaseErrors";
import { userType } from "../../types/types";
//@ts-ignore
import Eye from "../../assets/eye.svg?react";
import Google from "../../assets/google.svg";
import { Button } from "../Button";

type SigninProps = {
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>;
  user: userType | null;
  setUser: React.Dispatch<any>;
};

export const Signin = ({ setIsRegistered, user, setUser }: SigninProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const handleSignIn = async () => {
    if (email === "" && password === "") return;
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/Space/dashboard");
    } catch (err: any) {
      setError(handleFirebaseError(err.code));
    }
  };
  const handleSignInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      const uid = user.uid;
      const displayName = user.displayName;
      const photoURL = user.photoURL || "";
      const userRef = doc(db, "users", uid);
      const userData = {
        uid,
        displayName,
        photoURL,
      };
      await setDoc(userRef, userData, { merge: true });
      navigate("/Space/dashboard");
    } catch (err: any) {
      setError(handleFirebaseError(err.code));
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
  return (
    <div className="flex flex-col gap-3 w-64 lg:w-80 ">
      {user ? (
        <>
          <h1 className="text-center text-xl font-bold my-4 md:text-2xl">
            Welcome back, {user.displayName && user.displayName.split(" ")[0]}!
          </h1>
          <Link
            to={"/Space/dashboard"}
            className="text-center text-white bg-neutral-900 py-2 rounded-md shadow-xl hover:bg-neutral-950 transition-all"
          >
            Go to dashboard
          </Link>
          <button
            onClick={handleSignOut}
            className="mb-2 rounded-md self-center font-semibold text-neutral-600 hover:text-neutral-950 transition-all"
          >
            Sign out
          </button>
        </>
      ) : (
        <>
          <h2 className="text-center font-bold text-neutral-900 md:text-lg mb-2">
            Welcome back !
          </h2>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="py-2 rounded-md indent-3 bg-neutral-100 font-medium"
          />
          <div className="relative flex flex-col justify-center">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="py-2 rounded-md indent-3 bg-neutral-100 font-medium pr-12"
            />
            <Eye
              className={`absolute w-6 h-6 right-3 cursor-pointer transition-all ${
                showPassword ? "fill-neutral-700" : "fill-neutral-400"
              } `}
              onClick={() => setShowPassword(!showPassword)}
            />
          </div>
          {error && (
            <p className="text-center text-xs font-bold text-red-600">
              {error}
            </p>
          )}
          <Button text="Sign in" onClick={handleSignIn} style="" />
          <button
            onClick={() => setIsRegistered(false)}
            className="text-sm font-bold text-neutral-600 hover:text-neutral-900 transition-all"
          >
            Don't have an account? Sign up
          </button>
          <button
            onClick={handleSignInWithGoogle}
            className="flex justify-center gap-2 py-2 rounded-md border-2 border-neutral-900 font-semibold mt-4"
          >
            Continue with
            <img src={Google} />
          </button>
        </>
      )}
    </div>
  );
};
