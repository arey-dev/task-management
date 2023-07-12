import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Root } from "./routes";
import { Board } from "./routes";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Root />,
      // errorElement: 
      children: [
        {
          path: "board/:boardId",
          element: <Board/>
        }
      ]
    },
  ],
  { basename: "/task-management/" }
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
