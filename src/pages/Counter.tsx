import { useState } from "react";
//@ts-ignore
import Caret from "../assets/caret.svg?react";

export const Counter = () => {
  const [count, setCount] = useState<number>(0);
  return (
    <div>
      <span className="font-bold text-8xl md:text-9xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 select-none">
        {count}
      </span>
      <div className="flex gap-4 absolute bottom-4 left-1/2 -translate-x-1/2">
        <Caret
          onClick={() => setCount((prev) => prev + 1)}
          className="h-10 w-10 pb-0.5 fill-white bg-neutral-900 hover:bg-neutral-950 rounded-md shadow-md cursor-pointer"
        />
        <Caret
          onClick={() => setCount((prev) => prev - 1)}
          className="rotate-180 h-10 w-10 pb-0.5 fill-white bg-neutral-900 hover:bg-neutral-950 rounded-md shadow-md cursor-pointer"
        />
      </div>
    </div>
  );
};
