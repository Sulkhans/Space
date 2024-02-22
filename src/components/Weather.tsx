import { useEffect, useState } from "react";

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
  const [location, setLocation] = useState<string>("Tokyo");
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
      className="flex flex-col justify-center w-full relative text-neutral-900 py-7 px-5 border-2 border-neutral-900 shadow-md rounded-md select-none transition-all cursor-pointer"
    >
      {forecast && (
        <div className="flex flex-col items-center md:flex-row md:justify-center md:gap-6 lg:gap-4 lg:flex-col xl:flex-row xl:gap-8 2xl:gap-12">
          <div className="flex justify-center items-center gap-4 xl:gap-0 xl:flex-col xl:text-center 2xl:flex-row 2xl:gap-6 2xl:text-start">
            <div>
              <h1 className="text-xl font-semibold">{location}</h1>
              <p className="text-xs sm:text-sm font-semibold xl:leading-4">
                {forecast.current.condition.text}
              </p>
            </div>
            <div className="flex items-center gap-1 pr-8">
              <img src={forecast.current.condition.icon} />
              <p className="relative text-5xl">
                {Math.round(
                  unit ? forecast.current.temp_c : forecast.current.temp_f
                )}
                <span className="absolute text-3xl font-medium">
                  {unit ? "°C" : "°F"}
                </span>
              </p>
            </div>
          </div>
          <hr className="w-full border-[1px] border-neutral-900 my-6 md:w-0 md:h-24 md:m-0 lg:h-0 lg:w-full xl:h-full xl:w-0" />
          <div className="flex gap-8 sm:gap-12 md:gap-6 2xl:gap-10">
            {forecast.forecast.map((each, i) => (
              <div key={i} className="flex flex-col items-center gap-1">
                <p className="text-lg leading-4 font-semibold">
                  {new Date(each.date).toDateString().slice(0, 3)}
                </p>
                <div className="flex items-center gap-1">
                  <img src={each.day.condition.icon} />
                  <div className="flex flex-col items-end font-medium text-xl leading-6">
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
                <p className="text-xs text-center leading-3 font-bold">
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
