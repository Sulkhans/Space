import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Loading from "./Loading";
import useAuthLoad from "../hooks/useAuthLoad";
import { Navigate, useLocation } from "react-router-dom";
//@ts-ignore
import Menu from "../assets/menu.svg?react";

type LayoutProps = {
  children: JSX.Element;
};

const Layout = ({ children }: LayoutProps) => {
  const { loading, user } = useAuthLoad();
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [width, setWidth] = useState<number>(window.innerWidth);
  const location = useLocation();
  const format = (path: string) =>
    path
      .slice(7)
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  useEffect(() => {
    const screenResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", screenResize);
    setIsHidden(width <= 640);
    return () => window.removeEventListener("resize", screenResize);
  }, []);

  return loading ? (
    <Loading />
  ) : user ? (
    <div className="flex h-screen">
      <Sidebar
        isHidden={isHidden}
        setIsHidden={setIsHidden}
        width={width}
        user={user}
      />
      <div
        className={`p-4 w-screen relative transition-all duration-1000
        ${width >= 640 && !isHidden && "ml-48"} `}
      >
        <div className="flex w-full items-center justify-center mb-4">
          <Menu
            className="w-5 h-5 fill-dark absolute left-4 cursor-pointer"
            onClick={() => setIsHidden(!isHidden)}
          />
          <h1 className="font-bold text-xl leading-5">
            {format(location.pathname)}
          </h1>
        </div>
        {children}
      </div>
    </div>
  ) : (
    <Navigate to={`/Space/auth`} />
  );
};

export default Layout;
