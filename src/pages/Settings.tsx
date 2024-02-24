import { useState } from "react";
import {
  EmailAuthProvider,
  deleteUser,
  getAuth,
  reauthenticateWithCredential,
  signOut,
  updatePassword,
  updateProfile,
} from "firebase/auth";
import { db } from "../config/firebase";
import { collection, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Button } from "../components/Button";
//@ts-ignore
import Eye from "../assets/eye.svg?react";
import { useNavigate } from "react-router-dom";

type nameType = {
  first: string;
  last: string;
};
type passwordType = {
  current: string;
  new: string;
  repeat: string;
};
type messageType = {
  text: string;
  color: string;
  location: number;
};

export const Settings = () => {
  const [name, setName] = useState<nameType>({
    first: "",
    last: "",
  });
  const [password, setPassword] = useState<passwordType>({
    current: "",
    new: "",
    repeat: "",
  });
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [message, setMessage] = useState<messageType>({
    text: "",
    color: "",
    location: 0,
  });
  const [deleting, setDeleting] = useState<boolean>(false);
  const [pass, setPass] = useState<string>("");
  const auth = getAuth();
  const provider = auth.currentUser?.providerData[0].providerId;
  const navigate = useNavigate();

  const formatName = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setName((prev) => ({ ...prev, [name]: value }));
  };
  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setPassword((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async () => {
    const { first, last } = name;
    if (!/[a-zA-Z]/.test(first) || !/[a-zA-Z]/.test(last)) {
      setMessage({
        text: "Please enter valid names",
        color: "text-red-600",
        location: 1,
      });
      return;
    }
    try {
      const newDisplayName = formatName(first) + " " + formatName(last);
      await updateProfile(auth.currentUser!, { displayName: newDisplayName });
      const userRef = collection(db, "users");
      const userDoc = doc(userRef, auth.currentUser?.uid);
      await updateDoc(userDoc, { displayName: newDisplayName });
      setMessage({
        text: "Display name was updated successfully",
        color: "text-green-600",
        location: 1,
      });
    } catch (err) {
      setMessage({
        text: "Failed to update",
        color: "text-red-600",
        location: 1,
      });
      console.error(err);
    }
  };

  const handleUpdatePassword = async () => {
    if (!/[A-Z]/.test(password.new)) {
      setMessage({
        text: "Password must contain at least one capital letter",
        color: "text-red-600",
        location: 2,
      });
      return;
    }
    if (password.new !== password.repeat) {
      setMessage({
        text: "Passwords don't match",
        color: "text-red-600",
        location: 2,
      });
      return;
    }
    try {
      const user = auth.currentUser!;
      const credential = EmailAuthProvider.credential(
        user.email!,
        password.current
      );
      await reauthenticateWithCredential(user, credential);
      await updatePassword(user, password.new);
      setMessage({
        text: "Password was updated successfully",
        color: "text-green-600",
        location: 2,
      });
    } catch (err: any) {
      if (err.code === "auth/user-token-expired") {
        setMessage({
          text: "Too many failed attempts. Try again later",
          color: "text-red-600",
          location: 2,
        });
        return;
      }
      if (err.code === "auth/invalid-credential") {
        setMessage({
          text: "Current password is incorrect",
          color: "text-red-600",
          location: 2,
        });
        return;
      }
      setMessage({
        text: "Failed to update",
        color: "text-red-600",
        location: 2,
      });
      console.error(err.code);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/Space/auth");
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async () => {
    try {
      const user = auth.currentUser!;
      const credential = EmailAuthProvider.credential(user.email!, pass);
      await reauthenticateWithCredential(user, credential);
      const userRef = collection(db, "users");
      await deleteDoc(doc(userRef, auth.currentUser?.uid));
      await deleteUser(user);
      navigate("/Space/auth");
    } catch (err) {
      setMessage({
        text: "Failed to delete an account",
        color: "text-red-600",
        location: 0,
      });
    }
  };

  return (
    <div className="flex flex-col gap-6 sm:px-6 md:w-[34rem]">
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold">Account</h1>
        <Button text="Sign out" onClick={() => handleSignOut()} style="" />
        {!deleting && provider !== "google.com" && (
          <Button
            text="Delete account"
            onClick={() => setDeleting(true)}
            style="bg-red-700 hover:bg-red-600"
          />
        )}
        {deleting && (
          <div className="flex flex-col gap-3">
            <div className="flex gap-3">
              <input
                type="password"
                placeholder="Password"
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                className="w-1/2 py-2 rounded-md indent-3 bg-neutral-100 font-medium pr-12"
              />
              <Button
                text="Delete account"
                onClick={() => handleDelete()}
                style="w-1/2 bg-red-700 hover:bg-red-600"
              />
            </div>
            {!message.location && (
              <p className={`text-center text-xs font-bold ${message.color}`}>
                {message.text}
              </p>
            )}
          </div>
        )}
      </div>
      <div className="flex flex-col gap-3">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="font-medium">Display name</p>
        <div className="flex justify-between gap-3">
          <input
            name="first"
            placeholder="First name"
            value={name.first}
            onChange={(e) => handleName(e)}
            className="py-2 rounded-md indent-3 bg-neutral-100 font-medium w-1/2"
          />
          <input
            name="last"
            placeholder="Last name"
            value={name.last}
            onChange={(e) => handleName(e)}
            className="py-2 rounded-md indent-3 bg-neutral-100 font-medium w-1/2"
          />
        </div>
        <Button text="Save" onClick={() => handleUpdateProfile()} style="" />
        {message.location === 1 && (
          <p className={`text-center text-xs font-bold ${message.color}`}>
            {message.text}
          </p>
        )}
      </div>
      {provider !== "google.com" && (
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">Security</h1>
          <p className="font-medium">Password</p>
          <input
            name="current"
            type="password"
            placeholder="Current password"
            value={password.current}
            onChange={(e) => handlePassword(e)}
            className="py-2 rounded-md indent-3 bg-neutral-100 font-medium pr-12"
          />
          <div className="relative flex flex-col justify-center">
            <input
              name="new"
              type={showPassword ? "text" : "password"}
              placeholder="New password"
              value={password.new}
              onChange={(e) => handlePassword(e)}
              className="py-2 rounded-md indent-3 bg-neutral-100 font-medium pr-12"
            />
            <Eye
              onClick={() => setShowPassword(!showPassword)}
              className={`absolute w-6 h-6 right-3 cursor-pointer transition-all 
              ${showPassword ? "fill-neutral-700" : "fill-neutral-400"}`}
            />
          </div>
          <input
            name="repeat"
            type="password"
            placeholder="Re-enter new password"
            value={password.repeat}
            onChange={(e) => handlePassword(e)}
            className="py-2 rounded-md indent-3 bg-neutral-100 font-medium pr-12"
          />
          <Button
            text="Change password"
            onClick={() => handleUpdatePassword()}
            style=""
          />
          {message.location === 2 && (
            <p className={`text-center text-xs font-bold ${message.color}`}>
              {message.text}
            </p>
          )}
        </div>
      )}
    </div>
  );
};
