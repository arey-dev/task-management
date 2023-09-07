/* eslint-disable react/prop-types */
import { ColumnHeader } from "./ColumnHeader";
import { Task } from "./Task";
import { TasksContainer } from "./TasksContainer";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useMemo } from "react";

export function Column({ column, tasks }) {

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.name,
    data: {
      type: "Column",
      column,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const taskIds = useMemo(() => tasks.map((task) => task.title), [tasks]);

  if (isDragging) {
    return (
      <div className="min-w-[17.5rem] h-[4/5] bg-light-background rounded-lg opacity-25 border border-light-lines dark:bg-dark-background dark:border-dark-lines"></div>
    );
  }

  return (
    <>
      <section ref={setNodeRef} style={style} className="min-w-[17.5rem]">
        <ColumnHeader
          {...attributes}
          {...listeners}
          name={column.name}
          taskCount={tasks ? tasks.length : 0}
        />
        {tasks && (
          <TasksContainer>
            <SortableContext items={taskIds}>
              {tasks.map((task) => (
                <Task key={task.title} task={task} />
              ))}
            </SortableContext>
          </TasksContainer>
        )}
      </section>
    </>
  );
}
