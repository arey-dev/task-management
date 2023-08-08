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

function transformFormData(obj) {
  // transform object
  const subtasks = [];
  for (const key in obj) {
    if (key.includes("subtask")) {
      subtasks.push({ title: obj[key], isCompleted: false });
    }
  }

  const data = {
    title: obj.title,
    description: obj.description,
    subtasks: subtasks,
    status: obj.status,
  };

  return data;
}

export async function action({ params, request }) {
  // Get data from EditTask Form
  const formData = await request.formData();

  // create object from FormData
  const task = Object.fromEntries(formData);

  const updatedTask = transformFormData(task);

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
  await updateDoc(doc(db, `boards/${boardId}/tasks`, taskId), updatedTask);

  return redirect(`/board/${params.boardId}`);
}
