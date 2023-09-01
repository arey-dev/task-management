import {
  findBoardAndTaskIds,
  updateTaskData,
  removeDelimiter,
} from "../../utilities";
import { auth } from "../../firebase";

export async function action({ request, params }) {
  // current user
  const user = auth.currentUser;

  const data = await request.json();

  const { status, ...subtasks } = data;

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

  await updateTaskData(user.uid, boardId, taskId, subtasks, status);

  return null;
}
