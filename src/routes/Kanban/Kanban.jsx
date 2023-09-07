// import {
//   Outlet,
//   useLoaderData,
//   useOutletContext,
//   useParams,
// } from "react-router-dom";
// import { Board } from "../../components/board";

// export function Kanban() {
//   const { user } = useOutletContext();
//   const { columns } = useLoaderData();

//   const params = useParams();

//   return (
//     <>
//       <Board key={params.boardId} />
//       <Outlet context={{ columns, user }} />
//     </>
//   );
// }
