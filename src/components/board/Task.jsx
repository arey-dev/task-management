/* eslint-disable react/prop-types */

export function Task({ title, subtaskCount, subtaskCompleted }) {
  return (
    <section className="bg-light-surface rounded-lg task-shadow px-4 py-6">
      <h3 className="text-heading-md text-light-on-surface mb-2">{title}</h3>
      <p className="text-body-md text-on-background">
        <span>{subtaskCompleted}</span> of <span>{subtaskCount}</span> subtasks
      </p>
    </section>
  );
}
