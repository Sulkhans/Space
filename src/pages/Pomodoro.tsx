import { useEffect, useState } from "react";
import { Button } from "../components/Button";
//@ts-ignore
import Reset from "../assets/reset.svg?react";
//@ts-ignore
import Switch from "../assets/sidebar/pomodoro.svg?react";

export const Pomodoro = () => {
  const [time, setTime] = useState<number>(1500);
  const [isOn, setIsOn] = useState<boolean>(false);
  const [mode, setMode] = useState<boolean>(true);

  useEffect(() => {
    let timer: any;
    if (isOn) {
      timer = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            playSound();
            setMode(!mode);
            setIsOn(false);
            return mode ? 600 : 1500;
          }
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isOn]);

  const format = (time: number) => {
    const min = Math.floor(time / 60).toString();
    const sec = (time % 60).toString();
    return `${min.padStart(2, "0")}:${sec.padStart(2, "0")}`;
  };
  const handleReset = () => {
    setTime(mode ? 1500 : 600);
    setIsOn(false);
  };
  const handleSwitch = () => {
    setTime(mode ? 600 : 1500);
    setMode(!mode);
    setIsOn(false);
  };
  const playSound = () => {
    const sound = new Audio("/alarm.mp3");
    sound.play();
  };

  return (
    <div className="flex flex-col items-center gap-4 h-[calc(100%-44px)] select-none">
      <div className="flex flex-col justify-center items-center rounded-md h-full ">
        <p className="text-[7rem] sm:text-9xl md:text-[10rem] text-neutral-900 font-semibold tracking-wide">
          {format(time)}
        </p>
      </div>
      <div className="flex gap-2 w-full justify-center">
        <Switch
          onClick={handleSwitch}
          className="w-11 h-11 p-[11px] rounded-md fill-white bg-neutral-900 hover:bg-neutral-950 shadow-md cursor-pointer transition-all"
        />
        <Button
          onClick={() => setIsOn(!isOn)}
          text={isOn ? "Pause" : "Start"}
          style="text-lg w-48"
        />
        <div
          onClick={handleReset}
          className="flex w-11 h-11 rounded-md bg-neutral-900 hover:bg-neutral-950 group shadow-md cursor-pointer transition-all"
        >
          <Reset className="w-full h-full p-3 fill-white group-hover:rotate-[-360deg] duration-1000 transition-all" />
        </div>
      </div>
    </div>
  );
};
