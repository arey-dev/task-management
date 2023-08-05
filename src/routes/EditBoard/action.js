import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { redirect } from "react-router-dom";

export async function action({ request, params }) {
  // Get data from AddBoard Form
  const formData = await request.formData();

  // create object from FormData
  const board = Object.fromEntries(formData);

  // id for firestore document
  const id = params.boardId;

  // add doc to firestore
  await updateDoc(doc(db, "boards", id), board);

  return redirect(`/board/${params.boardId}`);
}
