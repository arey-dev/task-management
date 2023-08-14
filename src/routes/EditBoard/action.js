import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { redirect } from "react-router-dom";
import { hypenateString, removeDelimiter } from "../../utilities";

export async function action({ request, params }) {
  // Extract board name from params and prepare for Firestore query
  const boardName = removeDelimiter(params.boardId, "-");

  // Get updated board data from request JSON
  const updatedBoardData = await request.json();

  // Find the ID of the board to be updated
  const boardId = await findBoardId(boardName);

  // If board doesn't exist, return
  if (!boardId) {
    console.log("Board not found");
    return;
  }

  // Update the board in Firestore
  await updateBoard(boardId, updatedBoardData);

  // Redirect to the updated board's path
  return redirect(`/board/${hypenateString(updatedBoardData.name)}`);
}

// Function to find the ID of the board
async function findBoardId(boardName) {
  const qBoard = query(
    collection(db, "boards"),
    where("name", "==", boardName)
  );
  const boardSnap = await getDocs(qBoard);

  if (boardSnap.empty) {
    return null; // Return null if board doesn't exist
  }

  // Extract and return the board ID
  return boardSnap.docs[0].id;
}

// Function to update the board in Firestore
async function updateBoard(boardId, updatedBoardData) {
  await updateDoc(doc(db, "boards", boardId), updatedBoardData);
}
