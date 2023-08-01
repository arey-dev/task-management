import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { hypenateString } from "../../utilities";
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

  // Get data from AddTask Form
  const formData = await request.formData();

  // create object from FormData
  const task = Object.fromEntries(formData);

  const docId = hypenateString(task.title);

  const docData = transformFormData(task);

  await setDoc(doc(db, `boards/${boardId}/tasks`, docId), docData);

  return redirect(`/board/${boardId}`);
}
