// import { CustomCalendar } from "@/components/Dashboard/Seller/Schuduling/CustomCalendar";
import EventDashboard from "@/components/Dashboard/Seller/Scheduling/EventDashboard";
import SchudulingHeader from "@/components/Dashboard/Seller/Scheduling/SchudulingHeader";
import SchudulTable from "@/components/Dashboard/Seller/Scheduling/SchudulTable";

function Scheduling() {
  return (
    <div>
      <SchudulingHeader></SchudulingHeader>
      <div className="gird grid-cols-1 md:grid-cols-12">
        {/* <CustomCalendar></CustomCalendar> */}
        <EventDashboard></EventDashboard>
        <SchudulTable></SchudulTable>
      </div>
    </div>
  );
}

export default Scheduling;
