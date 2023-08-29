import {
  doc,
  query,
  where,
  arrayUnion,
  updateDoc,
  collection,
  getDocs,
  setDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

export function hypenateString(string) {
  // Replace spaces with hyphens using the regular expression
  return string.replace(/\s+/g, "-");
}

export function removeDelimiter(string, delimiter) {
  // Split the string at each delimiter and then join with spaces
  return string.split(delimiter).join(" ");
}

export async function addUser(user) {
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef);
}

// Function to find a board by name
export async function findBoard(boardName) {
  const q = query(collection(db, "boards"), where("name", "==", boardName));
  return await getDocs(q);
}

export async function findTask(boardId, taskName) {
  const q = query(
    collection(db, `boards/${boardId}/tasks`),
    where("title", "==", taskName)
  );
  return await getDocs(q);
}

// Function to update the board in Firestore
export async function updateBoard(boardId, updatedBoardData) {
  await updateDoc(doc(db, "boards", boardId), updatedBoardData);
}

export async function addColumn(boardId, column) {
  const boardRef = doc(db, "boards", boardId);
  await updateDoc(boardRef, {
    columns: arrayUnion({ ...column }),
  });
}

export async function updateTaskData(boardId, taskId, subtasks, status) {
  await updateDoc(doc(db, `boards/${boardId}/tasks`, taskId), {
    subtasks,
    status,
  });
}

// Function to add a task to a specific board
export async function addTaskToBoard(boardId, taskData) {
  const tasksCollection = collection(db, `boards/${boardId}/tasks`);
  await addDoc(tasksCollection, taskData);
}

// Function to update a task in Firestore
export async function updateTask(boardId, taskId, updatedTaskData) {
  await updateDoc(doc(db, `boards/${boardId}/tasks`, taskId), updatedTaskData);
}

// Function to delete a board
export async function deleteBoard(boardId) {
  await deleteDoc(doc(db, "boards", boardId));
}

// Function to delete a task
export async function deleteTask(boardId, taskId) {
  await deleteDoc(doc(db, `boards/${boardId}/tasks`, taskId));
}

// Function to find board and task IDs
export async function findBoardAndTaskIds(boardName, taskName) {
  const boardSnap = await findBoard(boardName);

  if (boardSnap.empty) {
    return { boardId: null, taskId: null };
  }

  const boardId = boardSnap.docs[0].id;

  const taskSnap = findTask(boardId, taskName);

  if (taskSnap.empty) {
    return { boardId: null, taskId: null };
  }

  const taskId = taskSnap.docs[0].id;

  return { boardId, taskId };
}
