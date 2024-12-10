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
      name: "",
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
    songs: [],
  },
  setSongs: (songs) => set((state) => ({ ...state, state: { songs } })),
}));

interface Users {
  id: number;
  labels: string;
  totalUser: number;
  activeUser: number;
}

interface UserType {
  state: {
    chartData: Users[];
  };

  setChartData: (data: Users[]) => void;
  updateChartData: (id: number, updatedData: Partial<Users>) => void;
  addChartData: (newData: Users) => void;
  removeChartData: (id: number) => void;
}

export const useUsersStore = create<UserType>((set) => ({
  state: {
    chartData: [
      { id: 1, labels: "January", totalUser: 186, activeUser: 80 },
      { id: 2, labels: "February", totalUser: 305, activeUser: 200 },
      { id: 3, labels: "March", totalUser: 237, activeUser: 120 },
      { id: 4, labels: "April", totalUser: 73, activeUser: 190 },
      { id: 5, labels: "May", totalUser: 209, activeUser: 130 },
      { id: 6, labels: "June", totalUser: 214, activeUser: 140 },
    ],
  },

  setChartData: (data) =>
    set((state) => ({
      state: { ...state.state, chartData: data },
    })),

  updateChartData: (id, updatedData) =>
    set((state) => ({
      state: {
        ...state.state,
        chartData: state.state.chartData.map((item) =>
          item.id === id ? { ...item, ...updatedData } : item
        ),
      },
    })),
  addChartData: (newData) =>
    set((state) => ({
      state: {
        ...state.state,
        chartData: [...state.state.chartData, newData],
      },
    })),

  removeChartData: (id) =>
    set((state) => ({
      state: {
        ...state.state,
        chartData: state.state.chartData.filter((item) => item.id !== id),
      },
    })),
}));

export type Song = {
  id: string;
  stream: number;
  songName: string;
  artist: string;
  dateStreamed: string;
};

interface SongStore {
  state: { songs: Song[] };
  setSongs: (songs: Song[]) => void;
  addSong: (song: Song) => void;
  removeSong: (id: string) => void;
  updateSong: (id: string, updatedData: Partial<Song>) => void;
}

export const useSongStore = create<SongStore>((set) => ({
  state: {
    songs: [
      {
        id: "m5gr84i9",
        stream: 316,
        songName: "wedfrgt",
        artist: "sdfg23",
        dateStreamed: "22/11/2023",
      },
      {
        id: "m5gr84i9",
        stream: 316,
        songName: "wedfrgt",
        artist: "sdfg3432e",
        dateStreamed: "22/11/2023",
      },
      {
        id: "m5gr84i9",
        songName: "wedfrgt",
        stream: 316,
        artist: "asdsdfg",
        dateStreamed: "22/11/2023",
      },
      {
        id: "m5gr84i9",
        songName: "wedfrgt",
        stream: 316,
        artist: "sdffsdfg",
        dateStreamed: "22/11/2023",
      },
      {
        id: "m5gr84i9",
        songName: "wedfrgt",
        stream: 316,
        artist: "sdfg",
        dateStreamed: "22/11/2023",
      },
      {
        id: "m5gr84i9",
        songName: "wedfrgt",
        stream: 316,
        artist: "sdfg",
        dateStreamed: "22/11/2023",
      },
      {
        id: "m5gr84i9",
        songName: "wedfrgt",
        stream: 316,
        artist: "sdfg",
        dateStreamed: "22/11/2023",
      },
      {
        id: "m5gr84i9",
        songName: "wedfrgt",
        stream: 316,
        artist: "sdfg",
        dateStreamed: "22/11/2023",
      },
      {
        id: "m5gr84i9",
        songName: "wedfrgt",
        stream: 316,
        artist: "sdfg",
        dateStreamed: "22/11/2023",
      },
      {
        id: "m5gr84i9",
        songName: "wedfrgt",
        stream: 316,
        artist: "sdfg",
        dateStreamed: "22/11/2023",
      },
      {
        id: "m5gr84i9",
        songName: "wedfrgt",
        stream: 316,
        artist: "sdfg",
        dateStreamed: "22/11/2023",
      },
      {
        id: "m5gr84i9",
        songName: "wedfrgt",
        stream: 316,
        artist: "sdfg",
        dateStreamed: "22/11/2023",
      },
      {
        id: "m5gr84i9",
        songName: "wedfrgt",
        stream: 316,
        artist: "sdfg",
        dateStreamed: "22/11/2023",
      },
      {
        id: "3u1reuv4",
        songName: "wedfrgt",
        stream: 242,

        artist: "sdfg",
        dateStreamed: "22/11/2023",
      },
      {
        id: "derv1ws0",
        songName: "rohit",
        stream: 837,
        artist: "sdfg",
        dateStreamed: "22/11/2023",
      },
      {
        id: "5kma53ae",
        songName: "wedfrgt",
        stream: 874,

        artist: "sdfg",
        dateStreamed: "22/11/2023",
      },
      {
        id: "bhqecj4p",
        songName: "wedfrgt",
        stream: 721,
        artist: "sdfg",
        dateStreamed: "22/11/2023",
      },
    ],
  },
  setSongs: (songs) => set({ state: { songs } }),
  addSong: (song) =>
    set((state) => ({
      state: { songs: [...state.state.songs, song] },
    })),
  removeSong: (id) =>
    set((state) => ({
      state: { songs: state.state.songs.filter((song) => song.id !== id) },
    })),
  updateSong: (id, updatedData) =>
    set((state) => ({
      state: {
        songs: state.state.songs.map((song) =>
          song.id === id ? { ...song, ...updatedData } : song
        ),
      },
    })),
}));
