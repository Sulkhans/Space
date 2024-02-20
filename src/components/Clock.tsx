import { useEffect, useState } from "react";

const Clock = () => {
  const [time, setTime] = useState<Date>(new Date());
  const [format, setFormat] = useState<boolean>(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const greeting = () => {
    const hr = time.getHours();
    if (hr >= 5 && hr < 12) {
      return "Good morning";
    } else if (hr >= 12 && hr < 18) {
      return "Good afternoon";
    } else if (hr >= 18 && hr < 22) {
      return "Good evening";
    } else {
      return "Good night";
    }
  };

  return (
    <div
      onClick={() => setFormat(!format)}
      className="p-6 text-2xl sm:text-3xl lg:text-5xl bg-[url('./assets/background.jpg')] bg-[length:300%_1300%] sm:bg-[length:250%_1000%] lg:bg-[length:200%_700%] animate-bg bg-neutral-900 text-white font-semibold flex flex-col justify-center items-center gap-3 w-full border-neutral-900 shadow-md rounded-md select-none transition-all cursor-pointer"
    >
      <p>{greeting()}</p>
      <p className="tracking-wider">
        {time.toLocaleTimeString(format ? "ru-RU" : "en-US")}
      </p>
    </div>
  );
};

export default Clock;
