import {
  getDoc,
  doc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
import { removeDelimiter } from "../../utilities";

export async function loader({ params }) {
  // the board we want to find
  const boardId = removeDelimiter(params.boardId);

  // reference to boards collection
  const boardRef = doc(db, "boards", boardId);

  // query for boardId
  const boardSnap = await getDoc(boardRef);

  // return null if data doesn't exists
  if (!boardSnap.exists()) {
    return null;
  }

  const board = boardSnap.data();

  // get board columns
  const columns = [];
  for (const field in board) {
    if (field !== "name") {
      columns.push({ name: board[field] });
    }
  }

  // get board tasks
  const tasks = {};
  for (const column of columns) {
    // create a array property in the object
    // with key the same as column name
    tasks[column.name] = [];

    // query for tasks where status is the same as the column
    const querySnapshot = await getDocs(
      query(
        collection(db, "boards", boardId, "tasks"),
        where("status", "==", column.name)
      )
    );

    // add each task on the array
    querySnapshot.forEach((doc) => {
      tasks[column.name].push(doc.data());
    });
  }

  return { columns, tasks };
}
