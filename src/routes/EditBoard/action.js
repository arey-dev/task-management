import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { redirect } from "react-router-dom";
import { hypenateString, removeDelimiter } from "../../utilities";

function transformFormData(obj) {
  // transform object
  const columns = [];
  for (const key in obj) {
    if (key.includes("column")) {
      columns.push({ name: obj[key] });
    }
  }

  const data = {
    name: obj.name,
    columns: columns,
  };

  return data;
}

export async function action({ request, params }) {
  const boardName = removeDelimiter(params.boardId, "-");

  // Get data from AddBoard Form
  const formData = await request.formData();

  // create object from FormData
  const board = Object.fromEntries(formData);

  // get id of the board that will be updated
  let boardId;
  const qBoard = query(
    collection(db, "boards"),
    where("name", "==", boardName)
  );
  const boardSnap = await getDocs(qBoard);
  boardSnap.forEach((doc) => (boardId = doc.id));

  const updatedBoard = transformFormData(board);

  // update board on firestore
  await updateDoc(doc(db, "boards", boardId), updatedBoard);

  // use board.name instead of params.boardId to redirect
  // updated board path, if board name is changed
  return redirect(`/board/${hypenateString(board.name)}`);
}
