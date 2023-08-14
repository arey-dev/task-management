// import {
//   doc,
//   updateDoc,
//   collection,
//   where,
//   query,
//   getDocs,
// } from "firebase/firestore";
// import { db } from "../../firebase";
// // import { redirect } from "react-router-dom";
// import { removeDelimiter } from "../../utilities";

// export async function action({ request, params }) {
//   // Get data from EditTask Form as JSON
//   const formData = await request.formData();
//   const data = Object.fromEntries(formData);

//   const subtasks = {};
//   let status;
//   for (const [key, value] of Object.entries(data)) {
//     if (key === "status") {
//       status = value;
//     } else {
//       subtasks[key] = value;
//     }
//   }

//   const boardName = removeDelimiter(params.boardId, "-");

//   const taskName = removeDelimiter(params.taskId, "-");

//   // query for boards in the params
//   let boardId;
//   const qBoard = query(
//     collection(db, "boards"),
//     where("name", "==", boardName)
//   );
//   const boardSnap = await getDocs(qBoard);
//   boardSnap.forEach((doc) => (boardId = doc.id));

//   // query for task in the params
//   let taskId;
//   const qTask = query(
//     collection(db, `boards/${boardId}/tasks`),
//     where("title", "==", taskName)
//   );
//   const taskSnap = await getDocs(qTask);
//   taskSnap.forEach((doc) => (taskId = doc.id));

//   // update the task with the new data
//   await updateDoc(doc(db, `boards/${boardId}/tasks`, taskId), {
//     subtasks: subtasks,
//     status,
//   });
//   return null;
// }

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
