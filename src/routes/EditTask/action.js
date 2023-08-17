import { redirect } from "react-router-dom";
import {
  findBoardAndTaskIds,
  updateTask,
  removeDelimiter,
} from "../../utilities";

export async function action({ params, request }) {
  // Get updated task data from the request JSON
  const updatedTaskData = await request.json();

  // Extract board and task names from params
  const boardName = removeDelimiter(params.boardId, "-");
  const taskName = removeDelimiter(params.taskId, "-");

  // Find the board and task IDs
  const { boardId, taskId } = await findBoardAndTaskIds(boardName, taskName);

  // If board or task not found, return
  if (!boardId || !taskId) {
    console.log("Board or task not found");
    return;
  }

  // Update the task in Firestore
  await updateTask(boardId, taskId, updatedTaskData);

  // Redirect to the board
  return redirect(`/board/${params.boardId}`);
}
