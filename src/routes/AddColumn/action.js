import { removeDelimiter, findBoard, addColumn } from "../../utilities";
import { redirect } from "react-router-dom";

export async function action({ request, params }) {
  // Extract board name from params
  const boardName = removeDelimiter(params.boardId, "-");

  // Get data from the add column form
  const column = await request.json();

  // Find the board in the database
  const boardSnap = await findBoard(boardName);

  // If the board doesn't exist, log a message and return
  if (boardSnap.empty) {
    console.log("Board not found");
    return;
  }

  // Extract the ID of the found board
  const boardId = boardSnap.docs[0].id;

  // add new column to board
  addColumn(boardId, column);

  // Redirect to the board after adding the task
  return redirect(`/board/${params.boardId}`);
}
