import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root, Board, AddBoard, AddTask, TaskView } from "./routes";
import data from "./data.json";
import { removeDelimiter } from "./utilities";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      // errorElement:
      children: [
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
        },
      ],
    },
  ],
  { basename: "/task-management/" }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
