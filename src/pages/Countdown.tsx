import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../config/firebase";
import useAuthLoad from "../hooks/useAuthLoad";
import Loading from "../components/Loading";
import { Button } from "../components/Button";
//@ts-ignore
import Delete from "../assets/trash.svg?react";
//@ts-ignore
import Back from "../assets/back.svg?react";

type countdownType = {
  id: string;
  title: string;
  date: number;
  timeLeft: number;
};

export const Countdown = () => {
  const [countdowns, setCountdowns] = useState<Array<countdownType>>([]);
  const [current, setCurrent] = useState<number>();
  const [editor, setEditor] = useState<boolean>(false);
  const [inputTitle, setInputTitle] = useState<string>("");
  const [inputDate, setInputDate] = useState<string>("");
  const [fetching, setFetching] = useState<boolean>(false);
  const { user, loading } = useAuthLoad();

  useEffect(() => {
    const fetch = async () => {
      const countdownRef = collection(db, "users", user!.uid, "countdown");
      const q = query(countdownRef, orderBy("date"));
      const res = await getDocs(q);
      const fetched = res.docs.map((doc) => ({
        id: doc.id,
        timeLeft: 0,
        ...doc.data(),
      }));
      setCountdowns(fetched as countdownType[]);
      setFetching(false);
    };
    if (!loading) fetch();
  }, [user, fetching]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdowns((prevCountdowns) => {
        const now = new Date().getTime() / 1000;
        const updatedCountdowns = prevCountdowns.map((item) => {
          const until = item.date / 1000;
          const TimeLeft = until - now;
          return {
            ...item,
            timeLeft: TimeLeft > 0 ? TimeLeft : 0,
          };
        });
        return updatedCountdowns;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [countdowns]);

  const handleNew = async () => {
    if (inputTitle.replace(/ /g, "") != "" && inputDate != "") {
      const countdownRef = collection(db, "users", user!.uid, "countdown");
      await addDoc(countdownRef, {
        title: inputTitle,
        date: new Date(inputDate).getTime(),
      });
      setFetching(true);
      closeEditor();
    }
  };
  const handleDelete = async () => {
    const countdownRef = collection(db, "users", user!.uid, "countdown");
    await deleteDoc(doc(countdownRef, countdowns[current!]?.id));
    setFetching(true);
    setCurrent(undefined);
  };
  const closeEditor = () => {
    setInputTitle("");
    setInputDate("");
    setEditor(false);
  };
  const format = (time: number) => {
    const day = Math.floor(time / 86400);
    const hr = Math.floor((time % 86400) / 3600);
    const min = Math.floor((time % 3600) / 60);
    const sec = Math.floor(time % 60);
    return [day, hr, min, sec];
  };
  const formatDate = (date: number) =>
    new Date(date).toLocaleString("de-DE", {
      day: "numeric",
      month: "2-digit",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });

  return fetching && countdowns.length === 0 ? (
    <Loading />
  ) : current != undefined ? (
    <div>
      <div className="h-10 flex items-center justify-between">
        <Back
          onClick={() => {
            setCurrent(undefined);
          }}
          className="w-10 h-10 p-0.5 shadow-md cursor-pointer border-2 border-neutral-900 rounded-md"
        />
        <Delete
          onClick={handleDelete}
          className="w-10 h-10 p-2 shadow-md cursor-pointer border-2 border-neutral-900 rounded-md hover:fill-red-600 transition-all"
        />
      </div>
      <div className="flex flex-col items-center gap-4 md:gap-10 xl:gap-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center font-bold select-none">
        <p className="w-screen text-2xl md:text-4xl xl:text-6xl">
          {countdowns[current].title}
        </p>
        <div className="px-3 grid grid-cols-4 grid-rows-2 place-items-center text-sm md:text-2xl xl:text-4xl gap-x-6 md:gap-x-16 md:gap-y-4">
          {format(countdowns[current].timeLeft).map((val, i) => (
            <p key={i} className="leading-7 text-3xl md:text-6xl md:leading-7">
              {val}
            </p>
          ))}
          <p>DAYS</p>
          <p>HOURS</p>
          <p>MINS</p>
          <p>SECS</p>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex flex-col gap-3">
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
      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 2xl:grid-cols-3">
        {countdowns.map((item, i) => (
          <div
            key={i}
            onClick={() => setCurrent(i)}
            className="p-3 flex flex-col items-center gap-3 sm:gap-5 border-2 border-neutral-900 font-bold rounded-md select-none cursor-pointer transition-all"
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
