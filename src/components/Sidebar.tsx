import { auth } from "../config/firebase";

const Sidebar = () => {
  return (
    <div className="fixed flex flex-col items-center p-4 w-48 h-screen bg-[#050505] shadow-lg shadow-black text-white">
      <h1 className="text-3xl font-semibold select-none">Space</h1>
      <p className="text-lg font-semibold">{auth.currentUser?.displayName}</p>
    </div>
  );
};

export default Sidebar;
