import {
  doc,
  updateDoc,
  collection,
  where,
  query,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
import { redirect } from "react-router-dom";
import { removeDelimiter } from "../../utilities";

export async function action({ params, request }) {
  // Get data from EditTask Form as JSON
  const task = await request.json();

  const boardName = removeDelimiter(params.boardId, "-");

  const taskName = removeDelimiter(params.taskId, "-");

  // query for boards in the params
  let boardId;
  const qBoard = query(
    collection(db, "boards"),
    where("name", "==", boardName)
  );
  const boardSnap = await getDocs(qBoard);
  boardSnap.forEach((doc) => (boardId = doc.id));

  // query for task in the params
  let taskId;
  const qTask = query(
    collection(db, `boards/${boardId}/tasks`),
    where("title", "==", taskName)
  );
  const taskSnap = await getDocs(qTask);
  taskSnap.forEach((doc) => (taskId = doc.id));

  // update the task with the new data
  await updateDoc(doc(db, `boards/${boardId}/tasks`, taskId), task);

  return redirect(`/board/${params.boardId}`);
}
