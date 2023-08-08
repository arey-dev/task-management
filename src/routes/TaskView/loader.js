import { getDocs, query, where, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { removeDelimiter } from "../../utilities";

export async function loader({ params }) {
  // the task we to find
  const taskName = removeDelimiter(params.taskId, "-");

  // the board we want to find
  const boardName = removeDelimiter(params.boardId, "-");

  // query for boardId
  let boardId;
  const qBoard = query(
    collection(db, "boards"),
    where("name", "==", boardName)
  );
  const boardSnap = await getDocs(qBoard);
  boardSnap.forEach((doc) => (boardId = doc.id));

  // query for task
  let task;
  const taskSnap = await getDocs(
    query(
      collection(db, "boards", boardId, "tasks"),
      where("title", "==", taskName)
    )
  );
  taskSnap.forEach((doc) => (task = doc.data()));

  return { task };
}
