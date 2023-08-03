import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Welcome } from "./routes";
import { Root, loader as RootLoader } from "./routes/Root";
import { Board, loader as BoardLoader } from "./routes/Board";
import { AddBoard, action as AddBoardAction } from "./routes/AddBoard";
import { EditBoard } from "./routes/EditBoard";
import { AddTask, action as AddTaskAction } from "./routes/AddTask";
import { EditTask } from "./routes/EditTask";
import {
  TaskView,
  loader as TaskViewLoader,
  action as TaskViewAction,
} from "./routes/TaskView";

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
        loader: BoardLoader,
        children: [
          {
            path: "add-task",
            element: <AddTask />,
            action: AddTaskAction,
          },
          {
            path: "task/:taskId",
            element: <TaskView />,
            loader: TaskViewLoader,
            action: TaskViewAction,
          },
          {
            path: "task/:taskId/edit-task",
            element: <EditTask />,
          },
        ],
      },
      {
        path: "/board/add-board",
        element: <AddBoard />,
        action: AddBoardAction,
      },
      {
        path: "board/:boardId/edit-board",
        element: <EditBoard />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
