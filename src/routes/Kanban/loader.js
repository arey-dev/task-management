import { auth } from "../../firebase";
import { findBoard, removeDelimiter } from "../../utilities";

export async function loader({ params }) {
  // current user
  const user = auth.currentUser;

  // Extract the board name from params
  const boardName = removeDelimiter(params.boardId, "-");

  // Get the board data from the database
  const boardSnap = await findBoard(user.uid, boardName);

  // If the board doesn't exist, return an empty object
  if (boardSnap.empty || !user) {
    console.log("Board Not Found");
    return { columns: [], tasks: [] };
  }

  let boardId;
  let boardData;

  boardSnap.forEach((doc) => {
    boardId = doc.id;
    boardData = doc.data();
  });

  // Return the categorized tasks along with column names
  return { columns: boardData.columns, boardId };
}
