import { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import Loading from "./Loading";
import useAuthLoad from "../hooks/useAuthLoad";
import { Navigate } from "react-router-dom";

type LayoutProps = {
  children: JSX.Element;
};

const Layout = ({ children }: LayoutProps) => {
  const { loading, user } = useAuthLoad();
  const [isHidden, setIsHidden] = useState<boolean>(true);
  const [width, setWidth] = useState<number>(window.innerWidth);
  useEffect(() => {
    const screenResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", screenResize);
    setIsHidden(width <= 768);
    return () => window.removeEventListener("resize", screenResize);
  }, []);
  return loading ? (
    <Loading />
  ) : user ? (
    <div className="flex">
      <Sidebar isHidden={isHidden} width={width} />
      <div
        className={`p-4 transition-all duration-1000
        ${width >= 768 && !isHidden && "ml-48"} `}
      >
        <button className="absolute" onClick={() => setIsHidden(!isHidden)}>
          Navbar
        </button>
        {children}
      </div>
    </div>
  ) : (
    <Navigate to={`/Space/auth`} />
  );
};

export default Layout;
