/* eslint-disable react/prop-types */

export function Task({ task }) {
  const { title, subtasks } = task;
  const subtaskCompleted = subtasks.filter(
    (subtask) => subtask.isCompleted
  ).length;
  const subtaskCount = subtasks.length;

  return (
    <section className="bg-light-surface rounded-lg task-shadow px-4 py-6 last-of-type:last:mb-12">
      <h3 className="text-heading-md text-light-on-surface mb-2">{title}</h3>
      <p className="text-body-md text-on-background">
        <span>{subtaskCompleted}</span> of <span>{subtaskCount}</span> subtasks
      </p>
    </section>
  );
}
