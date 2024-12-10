import { useDataMatrixStore, useSongStreamStore } from "./store";

export const generateDummyMatrixData = async () => {
  const { state, setUsers, setTotalStream, setRevenue, setTopArtist } =
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

export const generateDummySongStream = async () => {
  const { setSongs } = useSongStreamStore.getState();

  // Generate random songs
  const dummySongs = Array.from({ length: 5 }, (_, i) =>
    generateRandomSong(i + 6)
  ); // IDs start from 6

  // Update the store
  setSongs(dummySongs);
};
