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

// Function to add user
export async function addUser(user) {
  const userRef = doc(db, "users", user.uid);
  await setDoc(userRef, { uid: user.uid, email: user.email });
}

// Function to find a board by name
export async function findBoard(uid, boardName) {
  const q = query(
    collection(db, `users/${uid}/boards`),
    where("name", "==", boardName)
  );
  return await getDocs(q);
}

export async function findTask(uid, boardId, taskName) {
  const q = query(
    collection(db, `users/${uid}/boards/${boardId}/tasks`),
    where("title", "==", taskName)
  );
  return await getDocs(q);
}

export async function findTaskByStatus(uid, boardId, columnName) {
  const q = query(
    collection(db, `users/${uid}/boards/${boardId}/tasks`),
    where("status", "==", columnName)
  );

  return await getDocs(q);
}

// Function to update the board in Firestore
export async function updateBoard(uid, boardId, updatedBoardData) {
  await updateDoc(doc(db, `users/${uid}/boards`, boardId), updatedBoardData);
}

export async function addColumn(uid, boardId, column) {
  const boardRef = doc(db, `users/${uid}/boards`, boardId);
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
export async function addTaskToBoard(uid, boardId, taskData) {
  const tasksCollection = collection(
    db,
    `users/${uid}/boards/${boardId}/tasks`
  );
  await addDoc(tasksCollection, taskData);
}

// Function to update a task in Firestore
export async function updateTask(uid, boardId, taskId, updatedTaskData) {
  await updateDoc(
    doc(db, `users/${uid}/boards/${boardId}/tasks`, taskId),
    updatedTaskData
  );
}

// Function to delete a board
export async function deleteBoard(uid, boardId) {
  await deleteDoc(doc(db, `users/${uid}/boards`, boardId));
}

// Function to delete a task
export async function deleteTask(uid, boardId, taskId) {
  await deleteDoc(doc(db, `users/${uid}/boards/${boardId}/tasks`, taskId));
}

// Function to find board and task IDs
export async function findBoardAndTaskIds(uid, boardName, taskName) {
  const boardSnap = await findBoard(uid, boardName);

  if (boardSnap.empty) {
    return { boardId: null, taskId: null };
  }

  const boardId = boardSnap.docs[0].id;

  const taskSnap = await findTask(uid, boardId, taskName);

  if (taskSnap.empty) {
    return { boardId: null, taskId: null };
  }

  const taskId = taskSnap.docs[0].id;

  return { boardId, taskId };
}
