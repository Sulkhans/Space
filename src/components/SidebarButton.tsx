import { useNavigate } from "react-router-dom";

type SidebarButtonProps = {
  value: string;
  svg: JSX.Element;
};

const SidebarButton = ({ value, svg }: SidebarButtonProps) => {
  const navigate = useNavigate();
  return (
    <button
      className="flex items-center gap-3 pl-3 w-full text-start text-sm hover:bg-neutral-900 py-2 rounded-md transition-all"
      onClick={() =>
        navigate(`/Space/${value.toLowerCase().replace(" ", "-")}`)
      }
    >
      {svg}
      {value}
    </button>
  );
};

export default SidebarButton;
