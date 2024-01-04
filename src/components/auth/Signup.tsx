import { useState } from "react";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

type SignupProps = {
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Signup = ({ setIsRegistered }: SignupProps) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const signUp = async () => {
    try {
      const acc = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(acc.user, { displayName: name }).catch((err) =>
        console.log(err)
      );
      navigate("/Space/home");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <input
        type="text"
        placeholder="First name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
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
      <button onClick={signUp}>Sign up</button>
      <button onClick={() => setIsRegistered(true)}>
        Already have an account? Sign in
      </button>
    </div>
  );
};
