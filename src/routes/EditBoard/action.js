import { redirect } from "react-router-dom";
import {
  findBoard,
  hypenateString,
  updateBoard,
  removeDelimiter,
} from "../../utilities";
import { auth } from "../../firebase";

export async function action({ request, params }) {
  const user = auth.currentUser;

  // Extract board name from params and prepare for Firestore query
  const boardName = removeDelimiter(params.boardId, "-");

  // Get updated board data from request JSON
  const updatedBoardData = await request.json();

  // Find the ID of the board to be updated
  const boardSnap = await findBoard(user.uid, boardName);

  if (boardSnap.empty) {
    return null; // Return null if board doesn't exist
  }

  // Extract and return the board ID
  const boardId = boardSnap.docs[0].id;

  // If board doesn't exist, return
  if (!boardId) {
    console.log("Board not found");
    return;
  }

  // Update the board in Firestore
  await updateBoard(user.uid, boardId, updatedBoardData);

  // Redirect to the updated board's path
  return redirect(`/board/${hypenateString(updatedBoardData.name)}`);
}
