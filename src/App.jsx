import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./routes";
import { Board } from "./routes";
import { AddTask } from "./routes/AddTask";

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
      ],
    },
  ],
  { basename: "/task-management/" }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
