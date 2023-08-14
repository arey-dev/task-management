import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { redirect } from "react-router-dom";

export async function action({ request }) {
  // Get data from AddBoard Form
  const formData = await request.json();

  // add doc to firestore
  await addDoc(collection(db, "boards"), formData);

  return redirect("/");
}
