import Sidebar from "./Sidebar";

type LayoutProps = {
  children: JSX.Element;
};

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex">
      <Sidebar />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
