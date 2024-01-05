import { useState } from "react";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
//@ts-ignore
import Eye from "../../assets/eye.svg?react";

type SignupProps = {
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Signup = ({ setIsRegistered }: SignupProps) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const format = (str: string) =>
    str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  const signUp = async () => {
    try {
      const acc = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(acc.user, {
        displayName: format(firstName) + " " + format(lastName),
      }).catch((err) => console.log(err));
      navigate("/Space/home");
    } catch (err) {
      console.error(err);
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
          className="py-2 rounded-md indent-3 bg-neutral-200 font-medium w-1/2 mr-3"
        />
        <input
          type="text"
          placeholder="Last name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="py-2 rounded-md indent-3 bg-neutral-200 font-medium w-1/2"
        />
      </div>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="py-2 rounded-md indent-3 bg-neutral-200 font-medium"
      />
      <div className="relative flex flex-col justify-center">
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="py-2 rounded-md indent-3 bg-neutral-200 font-medium"
        />
        <Eye
          className={`absolute w-6 h-6 right-3 cursor-pointer transition-all ${
            showPassword ? "fill-neutral-700" : "fill-neutral-400"
          } `}
          onClick={() => setShowPassword(!showPassword)}
        />
      </div>
      <button
        onClick={signUp}
        className="text-white bg-neutral-900 py-2 rounded-md shadow-xl hover:bg-neutral-950 transition-all"
      >
        Sign up
      </button>
      <button
        onClick={() => setIsRegistered(true)}
        className="text-sm font-bold text-neutral-600 hover:text-neutral-900 transition-all"
      >
        Already have an account? Sign in
      </button>
    </div>
  );
};
