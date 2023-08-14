import { query, collection, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { removeDelimiter } from "../../utilities";

export async function loader({ params }) {
  // Extract the board name from params
  const boardName = removeDelimiter(params.boardId, "-");

  // Query for the board using its name
  const boardQuery = query(
    collection(db, "boards"),
    where("name", "==", boardName)
  );

  // Get the board data from the database
  const boardSnap = await getDocs(boardQuery);

  // If the board doesn't exist, return an empty object
  if (boardSnap.empty) {
    console.log("Board not found");
    return { columns: [], tasks: {} };
  }

  let boardId;
  let boardData;
  boardSnap.forEach((doc) => {
    boardId = doc.id;
    boardData = doc.data();
  });

  // Initialize an object to store tasks categorized by columns
  const tasksByColumns = {};

  // Loop through columns and fetch tasks for each column
  for (const column of boardData.columns) {
    // Initialize an array for tasks in this column
    tasksByColumns[column.name] = [];

    // Query for tasks in the current column
    const tasksQuerySnapshot = await getDocs(
      query(
        collection(db, "boards", boardId, "tasks"),
        where("status", "==", column.name)
      )
    );

    // Add tasks to the tasksByColumns object
    tasksQuerySnapshot.forEach((doc) => {
      tasksByColumns[column.name].push(doc.data());
    });
  }

  // Return the categorized tasks along with column names
  return { columns: boardData.columns, tasks: tasksByColumns };
}
