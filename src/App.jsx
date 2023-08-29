import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Welcome } from "./routes";
import { Root, loader as RootLoader } from "./routes/Root";
import { Board, loader as BoardLoader } from "./routes/Board";
import { AddBoard, action as AddBoardAction } from "./routes/AddBoard";
import { EditBoard, action as EditBoardAction } from "./routes/EditBoard";
import { DeleteBoard, action as DeleteBoardAction } from "./routes/DeleteBoard";
import { AddColumn, action as AddColumnAction } from "./routes/AddColumn";
import { AddTask, action as AddTaskAction } from "./routes/AddTask";
import { EditTask, action as EditTaskAction } from "./routes/EditTask";
import { DeleteTask, action as DeleteTaskAction } from "./routes/DeleteTask";
import { TaskView, action as TaskViewAction } from "./routes/TaskView";
import { PrivateRoute } from "./routes/PrivateRoute";
import { Login, action as LoginAction } from "./routes/Login";
import { Signup, action as SignupAction } from "./routes/Signup";
import { AuthLayout } from "./routes/AuthLayout";

const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/login",
        element: <Login />,
        action: LoginAction,
      },
      {
        path: "/signup",
        element: <Signup />,
        action: SignupAction,
      },
    ],
  },
  {
    element: <PrivateRoute />,
    children: [
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
                path: "add-board",
                element: <AddBoard />,
                action: AddBoardAction,
              },
              {
                path: "edit-board",
                element: <EditBoard />,
                action: EditBoardAction,
              },
              {
                path: "delete-board",
                element: <DeleteBoard />,
                action: DeleteBoardAction,
              },
              {
                path: "add-column",
                element: <AddColumn />,
                action: AddColumnAction,
              },
              {
                path: "add-task",
                element: <AddTask />,
                action: AddTaskAction,
              },
              {
                path: "task/:taskId",
                element: <TaskView />,
                // loader: TaskViewLoader,
                action: TaskViewAction,
              },
              {
                path: "task/:taskId/edit-task",
                element: <EditTask />,
                action: EditTaskAction,
              },
              {
                path: "task/:taskId/delete-task",
                element: <DeleteTask />,
                action: DeleteTaskAction,
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
