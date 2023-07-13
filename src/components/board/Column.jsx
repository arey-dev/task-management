/* eslint-disable react/prop-types */
import { ColumnHeader } from "./ColumnHeader";
import { Task } from "./Task";
import { TasksContainer } from "./TasksContainer";

export function Column({ columnName, tasks }) {
  return (
    <section className="w-[17.5rem] shrink-0">
      <ColumnHeader name={columnName} taskCount={tasks.length} />
      <TasksContainer>
        {tasks.map((task) => (
          <Task key={task.title} task={task} />
        ))}
      </TasksContainer>
    </section>
  );
}
