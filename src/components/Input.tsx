type InputProps = {
  value: string;
  setValue: (value: React.SetStateAction<string>) => void;
  placeholder: string;
  maxLength: number;
  style: string;
};

export const Input = ({
  value,
  setValue,
  placeholder,
  maxLength,
  style,
}: InputProps) => {
  return (
    <input
      value={value}
      onChange={(e: any) => setValue(e.target.value)}
      maxLength={maxLength}
      placeholder={placeholder}
      className={`${style} p-2 border-2 border-neutral-900 shadow-md rounded-md font-bold placeholder:text-neutral-900`}
    />
  );
};
