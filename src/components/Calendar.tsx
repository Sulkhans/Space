import { useEffect, useState } from "react";
//@ts-ignore
import Caret from "../assets/caret.svg?react";

const Calendar = () => {
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth());
  const [days, setDays] = useState<string[]>([]);
  const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const getCurrentMonth = () => {
    const index = new Date(year, month, 1).getDay() - 1;
    let lastdate = new Date(year, month + 1, 0).getDate();
    let updatedDays = new Array(index >= 0 ? index : 6).fill("");
    for (let i = 1; i <= lastdate; i++) {
      updatedDays.push(i.toString());
    }
    setDays(updatedDays);
  };

  useEffect(() => {
    getCurrentMonth();
  }, [month]);

  const handleNext = () => {
    if (month === 11) {
      setMonth(0);
      setYear((prev) => prev + 1);
    } else setMonth((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (month === 0) {
      setMonth(11);
      setYear((prev) => prev - 1);
    } else setMonth((prev) => prev - 1);
  };

  const isToday = (day: string) => {
    const today = new Date();
    const d = today.getDate().toString();
    const m = today.getMonth();
    const y = today.getFullYear();
    if (day === d && month === m && year === y)
      return "py-1 w-full text-center bg-neutral-900 text-white rounded-md";
    else return "py-1 w-full text-center";
  };

  return (
    <div className="flex flex-col gap-2 w-full font-semibold p-3 border-2 border-neutral-900 shadow-md rounded-md select-none transition-all">
      <div className="flex justify-between">
        <Caret
          className="w-6 h-6 -rotate-90 cursor-pointer"
          onClick={handlePrev}
        />
        <div className="flex gap-2 text-lg">
          <span>{months[month]}</span>
          <span>{year}</span>
        </div>
        <Caret
          className="w-6 h-6 rotate-90 cursor-pointer"
          onClick={handleNext}
        />
      </div>
      <div className="grid grid-rows-6 grid-cols-7 self-center gap-x-1.5 gap-y-0.5 place-items-center">
        {weekdays.map((day, i) => (
          <span key={i}>{day}</span>
        ))}
        {days.map((day, i) => (
          <span key={i} className={isToday(day)}>
            {day}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
