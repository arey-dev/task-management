import {
  findBoard,
  findTask,
  updateTaskData,
  removeDelimiter,
} from "../../utilities";

export async function action({ request, params }) {
  const data = await request.json();

  const { status, ...subtasks } = data;

  const boardName = removeDelimiter(params.boardId, "-");
  const taskName = removeDelimiter(params.taskId, "-");

  const boardSnap = await findBoard(boardName);

  if (boardSnap.empty) {
    return null; // Return null if board doesn't exist
  }

  const boardId = boardSnap.docs[0].id;

  const taskSnap = await findTask(boardId, taskName);

  if (taskSnap.empty) {
    return null; // Return null if board doesn't exist
  }

  const taskId = taskSnap.docs[0].id;

  await updateTaskData(boardId, taskId, subtasks, status);

  return null;
}
