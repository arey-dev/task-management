import { redirect } from "react-router-dom";
import {
  removeDelimiter,
  findBoardAndTaskIds,
  deleteTask,
} from "../../utilities";
import { auth } from "../../firebase";

export async function action({ params }) {
  // current user
  const user = auth.currentUser;

  // Extract board and task names from params
  const boardName = removeDelimiter(params.boardId, "-");
  const taskName = removeDelimiter(params.taskId, "-");

  // Find the board and task IDs
  const { boardId, taskId } = await findBoardAndTaskIds(
    user.uid,
    boardName,
    taskName
  );

  // If board or task not found, return
  if (!boardId || !taskId) {
    console.log("Board or task not found");
    return;
  }

  // Delete the task
  await deleteTask(user.uid, boardId, taskId);

  // Redirect to the parent directory
  return redirect("..");
}
