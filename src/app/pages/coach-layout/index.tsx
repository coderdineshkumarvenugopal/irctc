import Train from "../../components/train";
import { trainSeatsData } from "./seatsData";
import SeatSelection from "./SeatSelection";

const CoachLayout = () => {


  return (
    <div className="p-10 flex-row gap-6 ">
      <Train/>
    <div className="">
      <SeatSelection seatsData={trainSeatsData} />
    </div>
    </div>
  );
};

export default CoachLayout;
