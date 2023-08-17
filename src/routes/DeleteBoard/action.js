import { redirect } from "react-router-dom";
import { findBoard, deleteBoard, removeDelimiter } from "../../utilities";

export async function action({ params }) {
  // Extract board name from params
  const boardName = removeDelimiter(params.boardId, "-");

  // Find the board in the database
  const boardSnap = await findBoard(boardName);

  // If board not found, return null
  if (boardSnap.empty) {
    return null;
  }

  // Extract and return the board ID
  const boardId = boardSnap.docs[0].id;

  // Delete the board
  await deleteBoard(boardId);

  // Redirect to the homepage
  return redirect("/");
}
