import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { redirect } from "react-router-dom";

export async function action({ request }) {
  // Get data from AddBaord Form
  const formData = await request.formData();
  const dataObject = Object.fromEntries(formData);

  let boardRef; // used for creating subcollection
  for (const data in dataObject) {
    if (data === "name") {
      // add data on collection
      boardRef = await addDoc(collection(db, "boards"), {
        name: dataObject[data],
      });
    } else {
      // add data on subcollection
      await addDoc(collection(db, `/boards/${boardRef.id}/columns`), {
        name: dataObject[data],
      });
    }
  }

  return redirect("/");
}
