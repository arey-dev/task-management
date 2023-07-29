import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Board, Welcome } from "./routes";
import { Root, loader as RootLoader } from "./routes/Root";
import { AddBoard, action as AddBoardAction } from "./routes/AddBoard";
import { AddTask } from "./routes/AddTask";
import { TaskView, loader as TaskViewLoader } from "./routes/TaskView";

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
            loader: TaskViewLoader,
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
