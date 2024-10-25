//@ts-nocheck
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { userType } from "../types/types";
import SidebarButton from "./SidebarButton";
import userDefault from "../assets/user.svg";
import List from "../assets/sidebar/list.svg?react";
import Note from "../assets/sidebar/note.svg?react";
import Coin from "../assets/sidebar/coins.svg?react";
import Pomodoro from "../assets/sidebar/pomodoro.svg?react";
import Count from "../assets/sidebar/count.svg?react";
import Countdown from "../assets/sidebar/countdown.svg?react";
import Settings from "../assets/sidebar/settings.svg?react";
import Home from "../assets/sidebar/home.svg?react";

type SidebarProps = {
  isHidden: boolean;
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
  width: number;
  user: userType;
};

const Sidebar = ({ isHidden, setIsHidden, width, user }: SidebarProps) => {
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
      className={`fixed z-50 flex flex-col items-center w-48 min-[1700px]:w-56 px-2 py-4 gap-8 h-screen bg-dark text-white duration-1000 transition-all select-none 
      ${isHidden && "-translate-x-52 min-[1700px]:-translate-x-60"}`}
    >
      <h1 className="text-3xl font-semibold">Space</h1>
      <div className="flex flex-col items-center gap-2">
        <img
          src={user.photoURL ? user.photoURL : userDefault}
          className="size-20 min-[1700px]:size-24 rounded-full fill-white"
        />
        <p className="text-lg font-semibold">{auth.currentUser?.displayName}</p>
      </div>
      <div className="flex flex-col items-center gap-2 px-2 w-full overflow-y-auto">
        <SidebarButton
          value="Dashboard"
          svg={<Home className="fill-white w-4 h-4" />}
          width={width}
          setIsHidden={setIsHidden}
        />
        <SidebarButton
          value="To-Do List"
          svg={<List className="fill-white w-4 h-4" />}
          width={width}
          setIsHidden={setIsHidden}
        />
        <SidebarButton
          value="Notes"
          svg={<Note className="fill-white w-4 h-4" />}
          width={width}
          setIsHidden={setIsHidden}
        />
        <SidebarButton
          value="Expense Tracker"
          svg={<Coin className="fill-white w-4 h-4" />}
          width={width}
          setIsHidden={setIsHidden}
        />
        <SidebarButton
          value="Pomodoro Clock"
          svg={<Pomodoro className="fill-white w-4 h-4" />}
          width={width}
          setIsHidden={setIsHidden}
        />
        <SidebarButton
          value="Countdown"
          svg={<Countdown className="fill-white w-4 h-4" />}
          width={width}
          setIsHidden={setIsHidden}
        />
        <SidebarButton
          value="Counter"
          svg={<Count className="fill-white w-4 h-4" />}
          width={width}
          setIsHidden={setIsHidden}
        />
        <SidebarButton
          value="Settings"
          svg={<Settings className="fill-white w-4 h-4" />}
          width={width}
          setIsHidden={setIsHidden}
        />
      </div>
      <button
        className="mt-auto text-sm text-neutral-300 hover:text-white transition-all"
        onClick={handleSignOut}
      >
        Sign out
      </button>
    </div>
  );
};

export default Sidebar;
