import { format } from "date-fns";
import {
  useDataMatrixStore,
  useSongStore,
  useSongStreamStore,
  useUsersStore,
  useDateTimeRangeStore,
} from "./store";

export const generateDummyMatrixData = async () => {
  const { setUsers, setTotalStream, setRevenue, setTopArtist } =
    useDataMatrixStore.getState();

  // Generate dummy data
  const totalUser = Math.floor(Math.random() * 100000);
  const activeUser = Math.floor(totalUser * 0.8); // 80% of total users are active
  const totalStream = Math.floor(Math.random() * 1000000);
  const totalRevenue = parseFloat((Math.random() * 50000).toFixed(2));
  const subscriptions = parseFloat((totalRevenue * 0.6).toFixed(2)); // 60% from subscriptions
  const advertisements = parseFloat((totalRevenue * 0.4).toFixed(2)); // 40% from ads
  const topArtist = {
    name: "John Doe", // Example artist name
    totalStream: Math.floor(totalStream * 0.1), // 10% of total streams
  };

  // Update the store
  setUsers({ totalUser, activeUser });
  setTotalStream(totalStream);
  setRevenue({ totalRevenue, subscriptions, advertisements });
  setTopArtist(topArtist);
};

export const generateDummySongStream = async () => {
  const { setSongs } = useSongStreamStore.getState();

  const dummySongs = Array.from({ length: 5 }, (_, i) =>
    generateRandomSong(i + 6)
  );
  setSongs(dummySongs);
};

export const generateDummyUserChartData = async () => {
  const { setChartData } = useUsersStore.getState();

  const dummyData = Array.from({ length: 5 }, (_, i) => {
    const totalUser = Math.floor(Math.random() * 10000) + 500; // Random total users between 500 and 10,500
    const activeUser = Math.floor(Math.random() * totalUser); // Random active users less than totalUser

    return {
      id: i + 1,
      labels: `Label ${i + 1}`,
      totalUser,
      activeUser,
    };
  });

  setChartData(dummyData);
};

const generateRandomSong = (id: number) => {
  const songNames = [
    "Shape of You",
    "Blinding Lights",
    "Levitating",
    "Stay",
    "Bad Bunny",
    "Peaches",
    "Good 4 U",
    "Save Your Tears",
    "Kiss Me More",
    "MONTERO",
  ];

  const artists = [
    "Ed Sheeran",
    "The Weeknd",
    "Dua Lipa",
    "Justin Bieber",
    "Bad Bunny",
    "Olivia Rodrigo",
    "Doja Cat",
    "Lil Nas X",
  ];

  return {
    id,
    songName: songNames[Math.floor(Math.random() * songNames.length)],
    artist: artists[Math.floor(Math.random() * artists.length)],
    streams: (Math.floor(Math.random() * 50000) + 10000).toString(), // Random streams between 10,000 and 60,000
  };
};

const generateRandomSongList = (id: number) => {
  const { state } = useDateTimeRangeStore.getState();
  const songNames = [
    "Shape of You",
    "Blinding Lights",
    "Levitating",
    "Stay",
    "Peaches",
    "Save Your Tears",
    "Good 4 U",
    "MONTERO",
    "Drivers License",
    "Watermelon Sugar",
  ];

  const artists = [
    "Ed Sheeran",
    "The Weeknd",
    "Dua Lipa",
    "Justin Bieber",
    "Doja Cat",
    "Lil Nas X",
    "Olivia Rodrigo",
    "Harry Styles",
    "Ariana Grande",
    "Drake",
  ];
  const startDate = new Date(state.startDate).getTime();
  const endDate = new Date(state.endDate).getTime();
  // Generate a random date within the past month

  const randomTimestamp =
    Math.floor(Math.random() * (endDate - startDate + 1)) + startDate;

  const randomDate = new Date(randomTimestamp).toISOString(); // Convert to ISO string

  return {
    id: id.toString(), // Convert ID to string
    stream: Math.floor(Math.random() * 50000) + 10000, // Streams between 10,000 and 60,000
    songName: songNames[Math.floor(Math.random() * songNames.length)],
    artist: artists[Math.floor(Math.random() * artists.length)],
    dateStreamed: format(randomDate, "dd/MM/yyyy"), // Random date within the past month
  };
};

export const generateDummySongs = () => {
  const { setSongs } = useSongStore.getState();
  const randomNumber = Math.floor(Math.random() * (35 - 10 + 1)) + 10;
  const dummySongs = Array.from({ length: randomNumber }, (_, i) =>
    generateRandomSongList(i + 1)
  ); // Generate 10 songs

  setSongs(dummySongs); // Update the store with dummy songs
};
