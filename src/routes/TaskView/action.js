import {
  doc,
  updateDoc,
  collection,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
import { removeDelimiter } from "../../utilities";

export async function action({ request, params }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const { status, ...subtasks } = data;

  const boardName = removeDelimiter(params.boardId, "-");
  const taskName = removeDelimiter(params.taskId, "-");

  const boardSnap = await getBoardSnapshot(boardName);
  const taskSnap = await getTaskSnapshot(boardSnap, taskName);

  const boardId = boardSnap.docs[0].id;
  const taskId = taskSnap.docs[0].id;

  await updateTaskData(boardId, taskId, subtasks, status);

  return null;
}

async function getBoardSnapshot(boardName) {
  const qBoard = query(
    collection(db, "boards"),
    where("name", "==", boardName)
  );
  const boardSnap = await getDocs(qBoard);
  return boardSnap;
}

async function getTaskSnapshot(boardSnap, taskName) {
  const boardId = boardSnap.docs[0].id;
  const qTask = query(
    collection(db, `boards/${boardId}/tasks`),
    where("title", "==", taskName)
  );
  const taskSnap = await getDocs(qTask);
  return taskSnap;
}

async function updateTaskData(boardId, taskId, subtasks, status) {
  await updateDoc(doc(db, `boards/${boardId}/tasks`, taskId), {
    subtasks,
    status,
  });
}
