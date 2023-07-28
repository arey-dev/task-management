import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Board, TaskView, Welcome } from "./routes";
import { Root, loader as RootLoader } from "./routes/Root";
import { AddBoard, action as AddBoardAction } from "./routes/AddBoard";
import { AddTask } from "./routes/AddTask";
import { removeDelimiter } from "./utilities";
import data from "./data.json";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    loader: RootLoader,
    // errorElement:
    children: [
      { index: true, element: <Welcome /> },
      {
        path: "/board/:boardId",
        element: <Board />,
        children: [
          {
            path: "add-task",
            element: <AddTask />,
          },
          {
            path: ":columnId/task/:taskId",
            element: <TaskView />,
            loader: async ({ params }) => {
              const board = data.boards.find(
                (board) => board.name === removeDelimiter(params.boardId, "-")
              );

              const column = board.columns.find(
                (column) =>
                  column.name === removeDelimiter(params.columnId, "-")
              );

              const task = column.tasks.find(
                (task) => task.taskId === parseInt(params.taskId)
              );

              return { task };
            },
          },
        ],
      },
      {
        path: "/board/add-board",
        element: <AddBoard />,
        action: AddBoardAction,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
