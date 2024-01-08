import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { userType } from "../types/types";
import defaultimg from "../assets/user.png";

type SidebarProps = {
  isHidden: boolean;
  width: number;
  user: userType;
};

const Sidebar = ({ isHidden, width, user }: SidebarProps) => {
  const navigate = useNavigate();
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate("/Space/auth");
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div
      className={`fixed z-50 w-full flex flex-col items-center p-4 gap-8 h-screen bg-dark shadow-def text-white duration-1000 transition-all select-none sm:w-48 
      ${isHidden && width <= 640 && "-translate-x-[105%]"}
      ${isHidden && width >= 640 && "-translate-x-52"}`}
    >
      <h1
        className="text-3xl font-semibold cursor-pointer"
        onClick={() => navigate("/Space/dashboard")}
      >
        Space
      </h1>
      <div className="flex flex-col items-center gap-2 cursor-pointer">
        <img
          src={user.photoURL ? user.photoURL : defaultimg}
          className="w-20 h-20 rounded-full none"
        />
        <p className="text-lg font-semibold">{auth.currentUser?.displayName}</p>
      </div>
      <div className="flex flex-col items-center gap-3 px-2 h-full w-full overflow-y-auto"></div>
      <button
        className="mt-auto text-neutral-300 hover:text-white transition-all"
        onClick={handleSignOut}
      >
        Sign out
      </button>
    </div>
  );
};

export default Sidebar;
