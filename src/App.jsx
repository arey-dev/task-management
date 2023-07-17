import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./routes";
import { Board } from "./routes";
import { AddTask } from "./routes/AddTask";
import { AddBoard } from "./routes/AddBoard";

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
