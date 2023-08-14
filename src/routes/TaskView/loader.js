import { getDocs, query, where, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { removeDelimiter } from "../../utilities";

export async function loader({ params }) {
  // Extract task and board names from params
  const taskName = removeDelimiter(params.taskId, "-");
  const boardName = removeDelimiter(params.boardId, "-");

  // Find the board ID
  const boardId = await findBoardId(boardName);

  // If board not found, return null
  if (!boardId) {
    console.log("Board not found");
    return { task: null };
  }

  // Find and return the task
  const taskData = await findTask(boardId, taskName);

  return { task: taskData };
}

// Function to find board ID
async function findBoardId(boardName) {
  const qBoard = query(
    collection(db, "boards"),
    where("name", "==", boardName)
  );
  const boardSnap = await getDocs(qBoard);

  if (boardSnap.empty) {
    return null; // Return null if board doesn't exist
  }

  // Extract and return the board ID
  return boardSnap.docs[0].id;
}

// Function to find a task based on board ID and task name
async function findTask(boardId, taskName) {
  const taskQuery = query(
    collection(db, "boards", boardId, "tasks"),
    where("title", "==", taskName)
  );
  const taskSnap = await getDocs(taskQuery);

  if (taskSnap.empty) {
    return null; // Return null if task doesn't exist
  }

  // Extract and return the task data
  return taskSnap.docs[0].data();
}
