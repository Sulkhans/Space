import Calendar from "../components/Calendar";
import Clock from "../components/Clock";
import Quote from "../components/Quote";
import Weather from "../components/Weather";

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col lg:grid lg:grid-cols-[1fr_18.5rem] gap-3">
        <Clock />
        <Calendar />
      </div>
      <div className="flex flex-col lg:grid lg:grid-cols-2 gap-3">
        <Weather />
        <Quote />
      </div>
    </div>
  );
};

export default Dashboard;
