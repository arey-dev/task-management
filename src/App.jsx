import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Board } from "./routes";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Board />,
    },
  ],
  { basename: "/task-management/" }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
