import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { redirect } from "react-router-dom";

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
  const boardId = params.boardId;

  const taskId = params.taskId;

  // Get data from EditTask Form
  const formData = await request.formData();

  // create object from FormData
  const task = Object.fromEntries(formData);

  const docData = transformFormData(task);

  await updateDoc(doc(db, `boards/${boardId}/tasks`, taskId), docData);

  return redirect(`/board/${boardId}`);
}
