import { auth } from "../config/firebase";

type SidebarProps = {
  isHidden: boolean;
  width: number;
};

const Sidebar = ({ isHidden, width }: SidebarProps) => {
  return (
    <div
      className={`fixed z-50 w-full flex flex-col items-center p-4 h-screen bg-[#050505] shadow-lg shadow-black text-white duration-1000 transition-all sm:w-48 
      ${isHidden && width <= 768 && "-translate-x-[105%]"}
      ${isHidden && width >= 768 && "-translate-x-52"}`}
    >
      <h1 className="text-3xl font-semibold select-none">Space</h1>
      <p className="text-lg font-semibold">{auth.currentUser?.displayName}</p>
    </div>
  );
};

export default Sidebar;
