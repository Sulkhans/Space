import { useEffect, useState } from "react";
//@ts-ignore
import Sun from "../assets/weather/sun.svg?react";
//@ts-ignore
import Moon from "../assets/weather/moon.svg?react";
//@ts-ignore
import CloudSun from "../assets/weather/cloud-sun.svg?react";
//@ts-ignore
import CloudMoon from "../assets/weather/cloud-moon.svg?react";
//@ts-ignore
import Clouds from "../assets/weather/clouds.svg?react";
//@ts-ignore
import Rain from "../assets/weather/rain.svg?react";
//@ts-ignore
import Wind from "../assets/weather/wind.svg?react";
//@ts-ignore
import Thunderstorm from "../assets/weather/thunderstorm.svg?react";
//@ts-ignore
import Hail from "../assets/weather/hail.svg?react";
//@ts-ignore
import Fog from "../assets/weather/fog.svg?react";

interface forecastType {
  current: {
    is_Day: boolean;
    temp_c: number;
    temp_f: number;
    condition: {
      icon: string;
      text: string;
      code: number;
    };
  };
  forecast: [
    {
      date: string;
      day: {
        maxtemp_c: number;
        maxtemp_f: number;
        mintemp_c: number;
        mintemp_f: number;
        condition: {
          icon: string;
          text: string;
          code: number;
        };
      };
    },
    {
      date: string;
      day: {
        maxtemp_c: number;
        maxtemp_f: number;
        mintemp_c: number;
        mintemp_f: number;
        condition: {
          icon: string;
          text: string;
          code: number;
        };
      };
    }
  ];
}

const Weather = () => {
  const [location, setLocation] = useState<string>("Warsaw");
  const [forecast, setForecast] = useState<forecastType>();
  const [unit, setUnit] = useState<boolean>(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      fetch(url)
        .then((res) => res.json())
        .then((data) => setLocation(data.address.city));
    });
  }, []);

  useEffect(() => {
    if (location) {
      const url = `https://api.weatherapi.com/v1/forecast.json?key=8e91677bb9e941ccbbd115808231309&q=${location}&days=3&aqi=no&alerts=no`;
      fetch(url)
        .then((res) => res.json())
        .then((json) => {
          const {
            current,
            forecast: {
              forecastday: [, day1, day2],
            },
          } = json;
          setForecast({ current: current, forecast: [day1, day2] });
        })
        .catch((err) => console.error("Error fetching weather data:", err));
    }
  }, [location]);

  return (
    <div
      onClick={() => setUnit(!unit)}
      className="flex flex-col justify-center w-full relative font-semibold text-neutral-900 py-7 px-5 border-2 border-neutral-900 shadow-md rounded-md select-none transition-all cursor-pointer"
    >
      {forecast && (
        <div className="flex flex-col items-center md:flex-row md:justify-center md:gap-8 lg:gap-6 xl:gap-12">
          <div className="flex justify-center gap-12 md:gap-4 lg:gap-0 xl:gap-8">
            <div className="text-sm xl:text-lg">
              <h1 className="text-xl xl:text-2xl">{location}</h1>
              <p>Today</p>
              <p className="leading-5">{forecast.current.condition.text}</p>
            </div>
            <div className="flex items-center gap-1 pr-8">
              <img src={forecast.current.condition.icon} />
              <div className="relative">
                <span className="text-5xl font-thin xl:font-normal">
                  {Math.round(
                    unit ? forecast.current.temp_c : forecast.current.temp_f
                  )}
                </span>
                <span className="absolute text-3xl font-normal xl:font-semibold">
                  {unit ? "°C" : "°F"}
                </span>
              </div>
            </div>
          </div>
          <div className="w-full border-[1px] border-neutral-900 my-6 md:w-0 md:h-24 md:m-0 xl:h-full" />
          <div className="flex gap-4 xl:gap-12">
            {forecast.forecast.map((each, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-1 xl:gap-2"
              >
                <p className="text-lg leading-4 xl:text-2xl xl:leading-5">
                  {new Date(each.date).toDateString().slice(0, 3)}
                </p>
                <div className="flex items-center gap-1">
                  <img src={each.day.condition.icon} />
                  <div className="flex flex-col items-end font-semibold text-xl leading-6 xl:text-2xl xl:leading-7">
                    <p>
                      {Math.round(
                        unit ? each.day.mintemp_c : each.day.mintemp_f
                      )}
                      {unit ? "°C" : "°F"}
                    </p>
                    <p>
                      {Math.round(
                        unit ? each.day.maxtemp_c : each.day.maxtemp_f
                      )}
                      {unit ? "°C" : "°F"}
                    </p>
                  </div>
                </div>
                <p className="text-xs text-center leading-3 font-bold xl:text-sm">
                  {each.day.condition.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Weather;
