// import { CustomCalendar } from "@/components/Dashboard/Seller/Schuduling/CustomCalendar";
import EventDashboard from "@/components/Dashboard/Seller/Schuduling/EventDashboard";
import SchudulingHeader from "@/components/Dashboard/Seller/Schuduling/SchudulingHeader";

function Scheduling() {
  
  return (
    <div>
      <SchudulingHeader></SchudulingHeader>
      <div className="gird grid-cols-1 md:grid-cols-12">
        {/* <CustomCalendar></CustomCalendar> */}
        <EventDashboard></EventDashboard>
      </div>
    </div>
  );
}

export default Scheduling;
