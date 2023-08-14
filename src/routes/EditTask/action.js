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
  // Get updated task data from the request JSON
  const updatedTaskData = await request.json();

  // Extract board and task names from params
  const boardName = removeDelimiter(params.boardId, "-");
  const taskName = removeDelimiter(params.taskId, "-");

  // Find the board and task IDs
  const { boardId, taskId } = await findBoardAndTaskIds(boardName, taskName);

  // If board or task not found, return
  if (!boardId || !taskId) {
    console.log("Board or task not found");
    return;
  }

  // Update the task in Firestore
  await updateTask(boardId, taskId, updatedTaskData);

  // Redirect to the board
  return redirect(`/board/${params.boardId}`);
}

// Function to find board and task IDs
async function findBoardAndTaskIds(boardName, taskName) {
  const qBoard = query(
    collection(db, "boards"),
    where("name", "==", boardName)
  );
  const boardSnap = await getDocs(qBoard);

  if (boardSnap.empty) {
    return { boardId: null, taskId: null };
  }

  const boardId = boardSnap.docs[0].id;

  const qTask = query(
    collection(db, `boards/${boardId}/tasks`),
    where("title", "==", taskName)
  );
  const taskSnap = await getDocs(qTask);

  if (taskSnap.empty) {
    return { boardId: null, taskId: null };
  }

  const taskId = taskSnap.docs[0].id;

  return { boardId, taskId };
}

// Function to update a task in Firestore
async function updateTask(boardId, taskId, updatedTaskData) {
  await updateDoc(doc(db, `boards/${boardId}/tasks`, taskId), updatedTaskData);
}
