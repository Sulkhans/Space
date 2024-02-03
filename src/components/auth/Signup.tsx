import { useState } from "react";
import { auth, db } from "../../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { handleFirebaseError } from "../../config/firebaseErrors";
import { doc, setDoc } from "firebase/firestore";
//@ts-ignore
import Eye from "../../assets/eye.svg?react";
import { Button } from "../Button";

type SignupProps = {
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Signup = ({ setIsRegistered }: SignupProps) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();
  const formatName = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const signUp = async () => {
    if (firstName === "" || lastName === "") {
      setError("Please enter your name");
      return;
    }
    if (/[^a-zA-Z]/.test(firstName) || /[^a-zA-Z]/.test(lastName)) {
      setError("Names can only contain letters");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      setError("Password must contain one capital letter");
      return;
    }
    try {
      const acc = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(acc.user, {
        displayName: formatName(firstName) + " " + formatName(lastName),
      }).catch((err) => console.log(err));
      const uid = acc.user.uid;
      const userRef = doc(db, "users", uid);
      const userData = {
        uid: acc.user.uid,
        displayName: formatName(firstName) + " " + formatName(lastName),
        photoURL: "",
      };
      await setDoc(userRef, userData);
      navigate("/Space/dashboard");
    } catch (err: any) {
      setError(handleFirebaseError(err.code));
    }
  };
  return (
    <div className="flex flex-col gap-3 w-64 lg:w-80 ">
      <h2 className="text-center font-bold text-neutral-900 md:text-lg mb-2">
        Create a new account
      </h2>
      <div className="flex justify-between">
        <input
          type="text"
          placeholder="First name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="py-2 rounded-md indent-3 bg-neutral-100 font-medium w-1/2 mr-3"
        />
        <input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="py-2 rounded-md indent-3 bg-neutral-100 font-medium w-1/2"
        />
      </div>
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
          onClick={() => setShowPassword(!showPassword)}
          className={`absolute w-6 h-6 right-3 cursor-pointer transition-all 
          ${showPassword ? "fill-neutral-700" : "fill-neutral-400"}`}
        />
      </div>
      {error && (
        <p className="text-center text-xs font-bold text-red-600">{error}</p>
      )}
      <Button text="Sign up" onClick={signUp} style="" />
      <button
        onClick={() => setIsRegistered(true)}
        className="text-sm font-bold text-neutral-600 hover:text-neutral-900 transition-all"
      >
        Already have an account? Sign in
      </button>
    </div>
  );
};
