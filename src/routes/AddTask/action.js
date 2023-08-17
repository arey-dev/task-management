import { removeDelimiter, findBoard, addTaskToBoard } from "../../utilities";
import { redirect } from "react-router-dom";

// Main action function
export async function action({ params, request }) {
  // Extract board name from params
  const boardName = removeDelimiter(params.boardId, "-");

  // Get data from the task form
  const task = await request.json();

  // Find the board in the database
  const boardSnap = await findBoard(boardName);

  // If the board doesn't exist, log a message and return
  if (boardSnap.empty) {
    console.log("Board not found");
    return;
  }

  // Extract the ID of the found board
  const boardId = boardSnap.docs[0].id;

  // Add the task to the board and database
  await addTaskToBoard(boardId, task);

  // Redirect to the board after adding the task
  return redirect(`/board/${params.boardId}`);
}
