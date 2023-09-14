/* eslint-disable react/prop-types */
import { useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { useFetcher, useParams, useRouteLoaderData } from "react-router-dom";
import { Flex } from "../Flex";
import { AddColumnButton } from "./AddColumnButton";
import { Column } from "./Column";
import { Task } from "./Task";
import { CallToAction } from "../CallToAction";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  closestCenter,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import useDebounce from "@rooks/use-debounce";

export function Board() {
  // data from loader
  const { columns: columnData, boardTasks } = useRouteLoaderData("kanban");

  // store columns from loader in a state to be used in dnd
  const [columns, setColumns] = useState(columnData);

  // set column names as IDs for sortable context
  const columnIds = useMemo(() => columns.map((col) => col.name), [columns]);

  // store tasks from loader in a state to be used in dnd
  const [tasks, setTasks] = useState(boardTasks);

  // to identify which column is being dragged
  const [activeColumn, setActiveColumn] = useState(null);

  // to identify which task is being dragged
  const [activeTask, setActiveTask] = useState(null);

  const fetcher = useFetcher();

  const debounceSubmit = useDebounce(fetcher.submit, 500);

  const params = useParams();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      // Require the mouse to move by 10 pixels before activating
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      // Press delay of 250ms, with tolerance of 5px of movement
      activationConstraint: {
        delay: 250,
        tolerance: 5,
      },
    })
  );

  // store in a state the item that is being dragged,
  // depending on its type
  const handleDragStart = (event) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };

  // a handler after a drag finishes
  const handleDragEnd = (event) => {
    // reset any active draggable to avoid weird behaviors
    setActiveColumn(null);
    setActiveTask(null);

    // active: item that is being dragged
    // over: item (droppable) under the the active item
    const { active, over } = event;

    setColumns((columns) => {
      const oldColumnIndex = columns.findIndex((col) => col.name === active.id);

      const newColumnIndex = columns.findIndex((col) => col.name === over.id);

      // change the positions of old and new column after dragging
      return arrayMove(columns, oldColumnIndex, newColumnIndex);
    });
  };

  // a handler when a draggable item is over a droppable container
  const handleDragOver = (event) => {
    const { active, over } = event;

    // is draggable item a task?
    const isActiveATask = active.data.current?.type === "Task";

    // is droppable container a task?
    const isOverATask = over.data.current?.type === "Task";

    // is droppable container a column?
    const isOverAColumn = over.data.current?.type === "Column";

    // dropping a Task over a Task (droppable)
    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const oldIndex = tasks.findIndex((task) => task.title === active.id);

        const newIndex = tasks.findIndex((task) => task.title === over.id);

        // change the status of a task when
        // if dragged over a task of different status
        if (tasks[oldIndex].status !== tasks[newIndex].status) {
          tasks[oldIndex].status = tasks[newIndex].status;

          const data = tasks[oldIndex];

          debounceSubmit(JSON.stringify(data), {
            method: "post",
            action: `/board/${params.boardId}`,
            encType: "application/json",
          });

          return arrayMove(tasks, oldIndex, newIndex - 1);
        }

        // if a task is being dragged over a task
        // of the same status, just switch places
        return arrayMove(tasks, oldIndex, newIndex);
      });
    }

    // dropping a Task over a column
    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.title === active.id);

        // change the status of the task based
        // on the column it is being dragged over
        tasks[activeIndex].status = over.id;

        const data = tasks[activeIndex];

        debounceSubmit(JSON.stringify(data), {
          method: "post",
          action: `/board/${params.boardId}`,
          encType: "application/json",
        });

        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  return (
    <>
      {columns.length > 0 ? (
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          collisionDetection={closestCenter}
        >
          <Flex as="main" className="w-full px-6 pt-6 gap-6 overflow-scroll">
            <SortableContext items={columnIds}>
              {columns.map((column) => (
                <Column
                  key={column.name}
                  column={column}
                  tasks={tasks.filter((task) => task.status === column.name)}
                />
              ))}
            </SortableContext>
            <AddColumnButton />
          </Flex>
          {createPortal(
            <DragOverlay>
              {activeColumn && (
                <Column
                  column={activeColumn}
                  tasks={tasks.filter(
                    (task) => task.status === activeColumn.name
                  )}
                  activeTask={activeTask}
                />
              )}
              {activeTask && <Task task={activeTask} />}
            </DragOverlay>,
            document.body
          )}
        </DndContext>
      ) : (
        <CallToAction />
      )}
    </>
  );
}
