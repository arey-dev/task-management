import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { removeDelimiter } from "../../utilities";

export async function loader({ params }) {
  // the board we want to find
  const boardName = removeDelimiter(params.boardId, "-");

  // query for board
  const q = query(collection(db, "boards"), where("name", "==", boardName));

  // get board from db
  const boardSnap = await getDocs(q);

  if (boardSnap.empty) {
    console.log("board empty");
  }

  let boardId;
  let boardData;
  boardSnap.forEach((doc) => {
    boardId = doc.id;
    boardData = doc.data();
  });

  // get board tasks and columns
  const columns = boardData.columns;
  const tasks = {};
  for (const column of columns) {
    // create a array property in the object
    // with key the same as column name
    tasks[column.name] = [];

    // query for tasks where status is the same as the column
    const querySnapshot = await getDocs(
      query(
        collection(db, "boards", boardId, "tasks"),
        where("status", "==", column.name)
      )
    );

    if (querySnapshot.empty) {
      break;
    }
    // exit loop is querySnapshot is empty

    // add each task on the array
    querySnapshot.forEach((doc) => {
      tasks[column.name].push(doc.data());
    });
  }

  return { columns, tasks };
}
