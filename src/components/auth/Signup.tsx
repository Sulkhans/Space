import { useState } from "react";
import { auth } from "../../config/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

type SignupProps = {
  setIsRegistered: React.Dispatch<React.SetStateAction<boolean>>;
};

export const Signup = ({ setIsRegistered }: SignupProps) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigate = useNavigate();
  const signUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/Space/home");
    } catch (err) {
      console.error(err);
    }
  };
  return (
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
      <button onClick={signUp}>Sign up</button>
      <button onClick={() => setIsRegistered(true)}>
        already have an account
      </button>
    </div>
  );
};
