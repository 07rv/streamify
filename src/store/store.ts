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

interface SongStream {
  id: number;
  songName: string;
  artist: string;
  streams: string;
}
interface SongStreamType {
  state: {
    songs: SongStream[];
  };
  setSongs: (songs: SongStream[]) => void;
}
export const useSongStreamStore = create<SongStreamType>((set) => ({
  state: {
    songs: [
      {
        id: 1,
        songName: "Shape of You",
        artist: "Ed Sheeran",
        streams: "15000",
      },
      {
        id: 2,
        songName: "Blinding Lights",
        artist: "The Weeknd",
        streams: "20000",
      },
      { id: 3, songName: "Levitating", artist: "Dua Lipa", streams: "18000" },
      { id: 4, songName: "Stay", artist: "Justin Bieber", streams: "17000" },
      { id: 5, songName: "Bad Bunny", artist: "Bad Bunny", streams: "25000" },
    ],
  },
  setSongs: (songs) => set((state) => ({ ...state, state: { songs } })),
}));
