import { useState, useMemo } from "react";
import { createPortal } from "react-dom";
import { useRouteLoaderData } from "react-router-dom";
import { Flex } from "../Flex";
import { AddColumnButton } from "./AddColumnButton";
import { Column } from "./Column";
import { Task } from "./Task";
import { CallToAction } from "../CallToAction";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";

export function Board() {
  const { columns: columnData, boardTasks } = useRouteLoaderData();

  console.log("loader data", columnData, boardTasks);

  const [columns, setColumns] = useState(columnData);

  const [tasks, setTasks] = useState(boardTasks);

  console.log("state data", columns, tasks);

  const columnId = useMemo(() => columns.map((col) => col.name), [columns]);

  const [activeColumn, setActiveColumn] = useState(null);
  const [activeTask, setActiveTask] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const onDragStart = (event) => {
    if (event.active.data.current?.type === "Column") {
      console.log(event.active.data.current);
      setActiveColumn(event.active.data.current.column);
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current.task);
      return;
    }
  };

  const onDragEnd = (event) => {
    setActiveColumn(null);
    setActiveTask(null);

    const { active, over } = event;

    if (!over) {
      return;
    }

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.name === activeColumnId
      );

      const overColumnIndex = columns.findIndex(
        (col) => col.name === overColumnId
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };

  const onDragOver = (event) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (!isActiveATask) return;

    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((t) => t.title === activeId);
        const overIndex = tasks.findIndex((t) => t.title === overId);

        if (tasks[activeIndex].status != tasks[overIndex].status) {
          tasks[activeIndex].status = tasks[overIndex].status;
          return arrayMove(tasks, activeIndex, overIndex - 1);
        }

        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    // const isOverAColumn = over.data.current?.type === "Column";

    // // Im dropping a Task over a column
    // if (isActiveATask && isOverAColumn) {
    //   setTasks((tasks) => {
    //     const activeIndex = tasks.findIndex((t) => t.title === activeId);

    //     tasks[activeIndex].status = overId;
    //     console.log("DROPPING TASK OVER COLUMN", { activeIndex });
    //     return arrayMove(tasks, activeIndex, activeIndex);
    //   });
    // }
  };

  return (
    <>
      {columns.length > 0 ? (
        <DndContext
          sensors={sensors}
          onDragStart={onDragStart}
          onDragEnd={onDragEnd}
          onDragOver={onDragOver}
        >
          <Flex as="main" className="w-full px-6 pt-6 gap-6 overflow-scroll">
            <SortableContext items={columnId}>
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
