import Calendar from "../components/Calendar";
import Quote from "../components/Quote";

const Dashboard = () => {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[1fr_20rem] gap-3">
      <Quote />
      <Calendar />
    </div>
  );
};

export default Dashboard;
