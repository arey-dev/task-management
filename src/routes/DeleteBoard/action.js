import {
  doc,
  deleteDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
import { redirect } from "react-router-dom";
import { removeDelimiter } from "../../utilities";

export async function action({ params }) {
  // Extract board name from params
  const boardName = removeDelimiter(params.boardId, "-");

  // Find the board in the database
  const boardId = await findBoardId(boardName);

  // If board not found, log a message and return
  if (!boardId) {
    console.log("Board not found");
    return;
  }

  // Delete the board
  await deleteBoard(boardId);

  // Redirect to the homepage
  return redirect("/");
}

// Function to find board ID
async function findBoardId(boardName) {
  const qBoard = query(
    collection(db, "boards"),
    where("name", "==", boardName)
  );
  const boardSnap = await getDocs(qBoard);

  // If board not found, return null
  if (boardSnap.empty) {
    return null;
  }

  // Extract and return the board ID
  return boardSnap.docs[0].id;
}

// Function to delete a board
async function deleteBoard(boardId) {
  await deleteDoc(doc(db, "boards", boardId));
}
