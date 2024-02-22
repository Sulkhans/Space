import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { db } from "../config/firebase";
import { collection, doc, updateDoc } from "firebase/firestore";
import { Button } from "../components/Button";
//@ts-ignore
import Eye from "../assets/eye.svg?react";

export const Settings = () => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const auth = getAuth();

  const formatName = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();

  const handleUpdateProfile = async () => {
    try {
      if (firstName === "" || lastName === "") {
        setError("Please enter valid name");
        setMessage("");
        return;
      }
      if (/[^a-zA-Z]/.test(firstName) || /[^a-zA-Z]/.test(lastName)) {
        setError("Names can only contain letters");
        setMessage("");
        return;
      }
      const newDisplayName = formatName(firstName) + " " + formatName(lastName);
      await updateProfile(auth.currentUser!, { displayName: newDisplayName });
      const userRef = collection(db, "users");
      const userDoc = doc(userRef, auth.currentUser?.uid);
      await updateDoc(userDoc, { displayName: newDisplayName });
      setError("");
      setMessage("Updated successfully");
    } catch (err) {
      setError("Failed to update");
      setMessage("");
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col gap-6 sm:p-6">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold">Edit profile</h1>
        <p className="font-medium">Display name</p>
        <div className="flex justify-between gap-3">
          <input
            type="text"
            placeholder="First name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className="py-2 rounded-md indent-3 bg-neutral-100 font-medium w-1/2"
          />
          <input
            type="text"
            placeholder="Last name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="py-2 rounded-md indent-3 bg-neutral-100 font-medium w-1/2"
          />
        </div>
        <Button text="Save" onClick={() => handleUpdateProfile()} style="" />
        {error && (
          <p className="text-center text-xs font-bold text-red-600">{error}</p>
        )}
        {message && (
          <p className="text-center text-xs font-bold text-green-600">
            {message}
          </p>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold">Security</h1>
        <p className="font-medium">Password</p>
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
        <Button text="Change password" onClick={() => {}} style="" />
      </div>
    </div>
  );
};
