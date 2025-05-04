export interface SeatData {
    seatNo: string;
    type: "upper" | "middle" | "lower";
  }
  
  export const seatLayout = {
    layout: Array.from({ length: 32 }, (_, i) => ({
      seatNo: `${i + 1}`,
      type: i % 3 === 0 ? "lower" : i % 3 === 1 ? "middle" : "upper",
    })),
    booked: ["5", "12", "18", "27"],
  };
  