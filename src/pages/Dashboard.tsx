import { memo } from "react";
import Calendar from "../components/Calendar";
import Clock from "../components/Clock";
import Quote from "../components/Quote";
import Weather from "../components/Weather";
import Links from "../components/Links";
import Spotify from "../components/Spotify";

// Memoize individual sections to prevent unnecessary re-renders

const Section = memo(() => (
  <>
    <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3">
      <Weather />
      <Quote />
    </div>
    <div className="flex flex-col lg:flex-row gap-3">
      <Links />
      <Spotify />
    </div>
  </>
));

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_18.5rem] min-[1600px]:grid-cols-[1fr_22rem] gap-3">
        <Clock />
        <Calendar />
      </div>
      <Section />
    </div>
  );
};

export default Dashboard;
