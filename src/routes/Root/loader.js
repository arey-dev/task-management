import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export async function loader() {
  // Initialize an array to store board data
  const boardList = [];

  // Get a snapshot of all boards from the database
  const querySnapshot = await getAllBoards();

  // Populate the boardList array with data from each board
  querySnapshot.forEach((doc) => {
    boardList.push(doc.data());
  });

  // Return the array of board data
  return { boardList };
}

// Function to get a snapshot of all boards from the database
async function getAllBoards() {
  const querySnapshot = await getDocs(collection(db, "boards"));
  return querySnapshot;
}
