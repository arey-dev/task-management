import {
  doc,
  deleteDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
import { redirect } from "react-router-dom";
import { removeDelimiter } from "../../utilities";

export async function action({ params }) {
  const boardName = removeDelimiter(params.boardId, "-");

  console.log(boardName);

  let boardId;
  const qBoard = query(
    collection(db, "boards"),
    where("name", "==", boardName)
  );
  const boardSnap = await getDocs(qBoard);
  boardSnap.forEach((doc) => (boardId = doc.id));
  console.log(boardId);

  await deleteDoc(doc(db, "boards", boardId));

  return redirect("/");
}
