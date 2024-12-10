import { useDateTimeRangeStore, useDataMatrixStore } from "./store";

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
