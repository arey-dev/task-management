/* eslint-disable react/prop-types */
import { ColumnHeader } from "./ColumnHeader";
import { Task } from "./Task";
import { TasksContainer } from "./TasksContainer";

export function Column({ tasks, columnName }) {
  return (
    <section>
      <ColumnHeader name={columnName} taskCount={4} />
      <TasksContainer>
        {/* {tasks.map((task) => (
          <Task
            key={task.name}
            title="task.name"
            subtaskCompleted={0}
            subtaskCount={task.subtasks}
          />
        ))} */}
      </TasksContainer>
    </section>
  );
}
