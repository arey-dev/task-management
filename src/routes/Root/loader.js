import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";

export async function loader() {
  const boardList = [];

  const querySnapshot = await getDocs(collection(db, "boards"));
  querySnapshot.forEach((doc) => {
    boardList.push(doc.data());
  });

  return { boardList };
}