import { getDoc, doc } from "firebase/firestore";
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

  const columns = [];

  for (const field in board) {
    if (field !== "name") {
      columns.push({ name: board[field] });
    }
  }

  return { columns };
}
