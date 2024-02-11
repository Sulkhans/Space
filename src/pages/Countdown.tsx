import { useEffect, useState } from "react";
import useAuthLoad from "../hooks/useAuthLoad";
import Loading from "../components/Loading";
import { Button } from "../components/Button";
//@ts-ignore
import Delete from "../assets/trash.svg?react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../config/firebase";

type countdownType = {
  id: string;
  title: string;
  date: Date;
  timeLeft: number;
};

export const Countdown = () => {
  const [countdowns, setCountdowns] = useState<Array<countdownType>>([]);
  const [current, setCurrent] = useState<countdownType>();
  const [editor, setEditor] = useState<boolean>(false);
  const [inputTitle, setInputTitle] = useState<string>("");
  const [inputDate, setInputDate] = useState<string>("");
  const [fetching, setFetching] = useState<boolean>(false);
  const { user, loading } = useAuthLoad();

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdowns((prevCountdowns) => {
        const now = new Date().getTime() / 1000;
        const updatedCountdowns = prevCountdowns.map((item) => {
          const until = item.date.getTime() / 1000;
          const TimeLeft = until - now;
          return {
            ...item,
            timeLeft: TimeLeft,
          };
        });
        return updatedCountdowns;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [countdowns]);

  const format = (time: number) => {
    const day = Math.floor(time / 86400);
    const hr = Math.floor((time % 86400) / 3600);
    const min = Math.floor((time % 3600) / 60);
    const sec = Math.floor(time % 60);
    return [day, hr, min, sec];
  };
  const formatDate = (date: Date) =>
    date.toLocaleString("de-DE", {
      day: "numeric",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  const closeEditor = () => {
    setInputTitle("");
    setInputDate("");
    setEditor(false);
  };
  const handleNew = async () => {
    if (inputTitle.replace(/ /g, "") != "" && inputDate != "") {
      const countdownRef = collection(db, "users", user!.uid, "countdown");
      await addDoc(countdownRef, {
        title: inputTitle,
        date: inputDate,
      });
      setFetching(true);
      closeEditor();
    }
  };

  return fetching && countdowns.length === 0 ? (
    <Loading />
  ) : (
    <div className="flex flex-col gap-3">
      <p>{new Date("2024-02-22T22:24").getTime()}</p>
      <Button
        onClick={() => setEditor(true)}
        text="Create a new countdown"
        style=""
      />
      {editor && (
        <div>
          <div className="p-5 flex flex-col gap-3 font-bold border-2 border-neutral-900 shadow-md rounded-md transition-all">
            <input
              placeholder="Title"
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
              maxLength={25}
              className="text-2xl"
            />
            <input
              type="datetime-local"
              value={inputDate}
              onChange={(e) => setInputDate(e.target.value)}
              min={new Date().toISOString().slice(0, 16)}
              className="text-lg"
            />
            <div className="flex gap-2 font-normal">
              <Button onClick={handleNew} text="Save" style="w-1/2" />
              <Button onClick={closeEditor} text="Discard" style="w-1/2" />
            </div>
          </div>
        </div>
      )}
      <div className="flex flex-col gap-3 md:flex-row md:flex-wrap">
        {countdowns.map((item, i) => (
          <div
            key={i}
            className="p-3 flex flex-col items-center gap-3 sm:gap-5 md:flex-grow border-2 border-neutral-900 font-bold shadow-md rounded-md select-none cursor-pointer transition-all"
          >
            <p className="text-xl sm:text-2xl">{item.title}</p>
            <div className="px-3 grid grid-cols-4 grid-rows-2 place-items-center text-sm sm:text-base gap-x-6">
              {format(item.timeLeft).map((val, i) => (
                <p key={i} className="leading-7 text-3xl">
                  {val}
                </p>
              ))}
              <p>DAYS</p>
              <p>HOURS</p>
              <p>MINS</p>
              <p>SECS</p>
            </div>
            <p className="leading-3 text-sm">To {formatDate(item.date)}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
