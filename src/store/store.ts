import { create } from "zustand";
import { format, subDays } from "date-fns";

interface DateTimeRangeType {
  state: {
    startDate: string;
    endDate: string;
  };
  setDateTimeRange: (startDate: string, endDate: string) => void;
}

interface DataMatrixType {
  state: {
    users: {
      totalUser: number;
      activeUser: number;
    };
    totalStream: number;
    revenue: {
      totalRevenue: number;
      subscriptions: number;
      advertisements: number;
    };
    topArtist: {
      name: string;
      totalStream: number;
    };
  };
  setUsers: (users: { totalUser: number; activeUser: number }) => void;
  setTotalStream: (count: number) => void;
  setRevenue: (revenue: {
    totalRevenue: number;
    subscriptions: number;
    advertisements: number;
  }) => void;
  setTopArtist: (artist: { name: string; totalStream: number }) => void;
}

export const useDateTimeRangeStore = create<DateTimeRangeType>()((set) => ({
  state: {
    startDate: format(subDays(new Date(), 30), "yyyy-MM-dd"),
    endDate: format(new Date(), "yyyy-MM-dd"),
  },
  setDateTimeRange: (startDate, endDate) => {
    set({ state: { startDate, endDate } });
  },
}));

export const useDataMatrixStore = create<DataMatrixType>()((set) => ({
  state: {
    users: {
      totalUser: 0,
      activeUser: 0,
    },
    activeUser: 0,
    totalStream: 0,
    revenue: {
      totalRevenue: 0,
      subscriptions: 0,
      advertisements: 0,
    },
    topArtist: {
      name: "#####",
      totalStream: 0,
    },
  },
  setUsers: (users) => {
    set((state) => ({ state: { ...state.state, users: users } }));
  },
  setTotalStream: (count) => {
    set((state) => ({ state: { ...state.state, totalStream: count } }));
  },
  setRevenue: (revenue) => {
    set((state) => ({ state: { ...state.state, revenue } }));
  },
  setTopArtist: (artist) => {
    set((state) => ({ state: { ...state.state, topArtist: artist } }));
  },
}));
