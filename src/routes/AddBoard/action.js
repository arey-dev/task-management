import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";
import { redirect } from "react-router-dom";

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

export async function action({ request }) {
  // Get data from AddBoard Form
  const formData = await request.formData();

  // create object from FormData
  const board = Object.fromEntries(formData);

  const docData = transformFormData(board);

  // add doc to firestore
  await addDoc(collection(db, "boards"), docData);

  return redirect("/");
}
