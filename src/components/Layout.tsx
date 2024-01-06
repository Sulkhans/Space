import { useEffect, useState } from "react";
import { auth } from "../config/firebase";
import Sidebar from "./Sidebar";
import Loading from "./Loading";

type LayoutProps = {
  children: JSX.Element;
};

const Layout = ({ children }: LayoutProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const checkAuth = auth.onAuthStateChanged(() => setLoading(false));
    return () => checkAuth();
  }, []);
  return loading ? (
    <Loading />
  ) : (
    <div className="flex">
      <Sidebar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
