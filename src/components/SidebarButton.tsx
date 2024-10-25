import { useNavigate } from "react-router-dom";

type SidebarButtonProps = {
  value: string;
  svg: JSX.Element;
  width: number;
  setIsHidden: React.Dispatch<React.SetStateAction<boolean>>;
};

const SidebarButton = ({
  value,
  svg,
  width,
  setIsHidden,
}: SidebarButtonProps) => {
  const navigate = useNavigate();
  return (
    <button
      className="flex items-center gap-3 pl-3 w-full text-start text-sm min-[1600px]:text-base hover:bg-neutral-900 py-2 rounded-md transition-all"
      onClick={() => {
        navigate(`/Space/${value.toLowerCase().replace(" ", "-")}`);
        if (width < 640) setIsHidden(true);
      }}
    >
      {svg}
      {value}
    </button>
  );
};

export default SidebarButton;
