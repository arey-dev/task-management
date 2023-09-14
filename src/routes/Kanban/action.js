import {
  removeDelimiter,
  findBoardAndTaskIds,
  updateTaskStatus,
} from "../../utilities";
import { auth } from "../../firebase";

export async function action({ params, request }) {
  // current user
  const user = auth.currentUser;

  // Get task data from the request JSON
  const taskData = await request.json();

  // Extract board and task names from params
  const boardName = removeDelimiter(params.boardId, "-");
  const taskName = taskData.title;

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

  await updateTaskStatus(user.uid, boardId, taskId, taskData.status);

  return null;
}
