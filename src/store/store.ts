import { create } from "zustand";
import { format, subDays } from "date-fns";

interface DateTimeRangeType {
  state: {
    startDate: string;
    endDate: string;
  };
  setDateTimeRange: (startDate: string, endDate: string) => void;
}

export const useToggleSideBarStore = create<DateTimeRangeType>()((set) => ({
  state: {
    startDate: format(subDays(new Date(), 30), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd"),
  },
  setDateTimeRange: (startDate, endDate) => {
    set({ state: { startDate, endDate } });
  },
}));
