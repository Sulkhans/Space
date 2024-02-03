type InputProps = {
  value: string;
  onChange: (value: React.SetStateAction<string>) => void;
  placeholder: string;
  maxLength: number;
  style: string;
};

export const Input = ({
  value,
  onChange,
  placeholder,
  maxLength,
  style,
}: InputProps) => {
  return (
    <input
      value={value}
      onChange={(e: any) => onChange(e.target.value)}
      maxLength={maxLength}
      placeholder={placeholder}
      className={`${style} p-2 border-2 border-neutral-900 hover:border-neutral-950 shadow-md rounded-md font-bold placeholder:text-neutral-900`}
    />
  );
};
