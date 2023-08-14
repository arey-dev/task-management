import { addDoc, query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { removeDelimiter } from "../../utilities";
import { redirect } from "react-router-dom";

function transformFormData(obj) {
  // Transform subtasks directly using reduce
  const subtasks = Object.entries(obj)
    .filter(([key]) => key.startsWith("subtask"))
    .reduce((acc, [, value]) => {
      acc[value] = false;
      return acc;
    }, {});

  const data = {
    title: obj.title,
    description: obj.description,
    subtasks,
    status: obj.status,
  };

  return data;
}

export async function action({ params, request }) {
  // the board we want to find
  const boardName = removeDelimiter(params.boardId, "-");

  // Get data from AddTask Form
  const formData = await request.formData();

  // query for board
  const q = query(collection(db, "boards"), where("name", "==", boardName));

  // get board from db
  const boardSnap = await getDocs(q);

  if (boardSnap.empty) {
    console.log("board empty");
  }

  let boardId;
  boardSnap.forEach((doc) => {
    boardId = doc.id;
  });

  // create object from FormData
  const task = Object.fromEntries(formData);

  const docData = transformFormData(task);

  await addDoc(collection(db, `boards/${boardId}/tasks`), docData);

  return redirect(`/board/${params.boardId}`);
}
