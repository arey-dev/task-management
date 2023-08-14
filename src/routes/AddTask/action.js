import { addDoc, query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { removeDelimiter } from "../../utilities";
import { redirect } from "react-router-dom";

// Main action function
export async function action({ params, request }) {
  // Extract board name from params
  const boardName = removeDelimiter(params.boardId, "-");

  // Get data from the task form
  const taskFormData = await request.formData();

  // Find the board in the database
  const boardSnap = await findBoard(boardName);

  // If the board doesn't exist, log a message and return
  if (boardSnap.empty) {
    console.log("Board not found");
    return;
  }

  // Extract the ID of the found board
  const boardId = boardSnap.docs[0].id;

  // Add the task to the board and database
  await addTaskToBoard(boardId, taskFormData);

  // Redirect to the board after adding the task
  return redirect(`/board/${params.boardId}`);
}

// Function to find a board by name
async function findBoard(boardName) {
  const q = query(collection(db, "boards"), where("name", "==", boardName));
  return await getDocs(q);
}

// Function to add a task to a specific board
async function addTaskToBoard(boardId, taskFormData) {
  const tasksCollection = collection(db, `boards/${boardId}/tasks`);
  await addDoc(tasksCollection, taskFormData);
}
