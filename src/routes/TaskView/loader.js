import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";

export async function loader({ params }) {
  // the task we to get
  const taskId = params.taskId;

  const boardId = params.boardId;

  // reference to the task
  const taskRef = doc(db, `boards/${boardId}/tasks`, taskId);

  // query for Task
  const taskSnap = await getDoc(taskRef);

  const task = taskSnap.data();

  return { task };
}
