type ButtonProps = {
  onClick: () => void;
  text: string;
  style: string;
};

export const Button = ({ onClick, text, style }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`${style} py-2 text-white bg-neutral-900 rounded-md hover:bg-neutral-950 shadow-md transition-all`}
    >
      {text}
    </button>
  );
};
