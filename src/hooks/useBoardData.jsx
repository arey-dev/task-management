import { auth, db } from "../firebase";
import { where, query, onSnapshot, collection } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { removeDelimiter } from "../utilities";

export function useBoardData(boardId) {
  const userId = auth.currentUser.uid;

  const params = useParams();

  // store columns from loader in a state to be used in dnd
  const [columns, setColumns] = useState(null);

  // store tasks from loader in a state to be used in dnd
  const [tasks, setTasks] = useState(null);

  useEffect(() => {
    const boardName = removeDelimiter(params.boardId, "-");

    // collection query
    const q = query(
      collection(db, `users/${userId}/boards`),
      where("name", "==", boardName)
    );

    const unsubscribe = onSnapshot(q, (querySnap) => {
      let boardData;

      querySnap.forEach((doc) => (boardData = doc.data()));

      setColumns(boardData.columns);
    });

    return () => unsubscribe();
  }, [userId, boardId, params.boardId]);

  useEffect(() => {
    // reference to collection
    const ref = collection(db, `users/${userId}/boards/${boardId}/tasks`);

    // realtime update
    const unsubscribe = onSnapshot(ref, (tasksSnap) => {
      const tasks = [];

      tasksSnap.forEach((doc) => {
        tasks.push(doc.data());
      });

      setTasks(tasks);
    });

    return () => unsubscribe();
  }, [boardId, userId]);

  console.log(columns, tasks);

  return { columns, tasks, setTasks, setColumns };
}
