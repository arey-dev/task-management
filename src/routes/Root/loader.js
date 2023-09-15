import { auth } from "../../firebase";
import { getAllBoards } from "../../utilities";

export async function loader() {
  // current user
  const user = auth.currentUser;

  // Initialize an array to store board data
  const boardList = [];

  if (user) {
    // Get a snapshot of all boards from the database
    const querySnapshot = await getAllBoards(user.uid);

    // Populate the boardList array with data from each board
    querySnapshot.forEach((doc) => {
      boardList.push(doc.data());
    });
  }

  // Return the array of board data
  return { boardList, user };
}
