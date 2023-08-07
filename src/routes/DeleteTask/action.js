import { doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { redirect } from "react-router-dom";

export async function action({ params }) {
  const boardId = params.boardId;
  const taskId = params.taskId;

  await deleteDoc(doc(db, `boards/${boardId}/tasks`, taskId));

  return redirect("..");
}
