import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { redirect } from "react-router-dom";

export async function action({ request }) {
  // current user
  const user = auth.currentUser;

  // Get data from AddBoard Form
  const board = await request.json();

  if (user) {
    await addDoc(collection(db, `users/${user.uid}/boards`), board);
  }

  return redirect("/");
}
