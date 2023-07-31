import { setDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { redirect } from "react-router-dom";
import { hypenateString } from "../../utilities";

export async function action({ request }) {
  // Get data from AddBoard Form
  const formData = await request.formData();

  // create object from FormData
  const board = Object.fromEntries(formData);

  // id for firestore document
  const id = hypenateString(board.name);

  // add doc to firestore
  await setDoc(doc(db, "boards", id), board);

  return redirect("/");
}
