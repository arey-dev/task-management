import { getDocs, query, collection, where } from "firebase/firestore";
import { db } from "../../firebase";
import { removeDelimiter } from "../../utilities";

export async function loader({ params }) {
  // // the board we want to find
  // const boardName = removeDelimiter(params.boardId);

  // // reference to boards collection
  // const boardsRef = collection(db, "boards");
  // // query for boardId
  // const boardQuery = query(boardsRef, where("name", "==", boardName));
  // const boardSnap = await getDocs(boardQuery);

  // let boardRef;
  // boardSnap.forEach((doc) => (boardRef = doc));

  // const boardColumnList = [];
  // const querySnapshot = await getDocs(
  //   collection(db, `boards/${boardRef}/columns`)
  // );
  // querySnapshot.forEach((doc) => {
  //   boardColumnList.push(doc.data());
  // });

  // console.log(boardColumnList);

  return null;
}
