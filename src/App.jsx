import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root, Board, AddBoard, AddTask } from "./routes";

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
