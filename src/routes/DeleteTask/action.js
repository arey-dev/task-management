import {
  doc,
  deleteDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
import { redirect } from "react-router-dom";
import { removeDelimiter } from "../../utilities";

export async function action({ params }) {
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

  await deleteDoc(doc(db, `boards/${boardId}/tasks`, taskId));

  return redirect("..");
}
