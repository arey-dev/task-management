/* eslint-disable react/prop-types */
import { useNavigate, useParams } from "react-router-dom";
import { hypenateString } from "../../utilities";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export function Task({ task }) {
  const navigate = useNavigate();

  const { boardId } = useParams();

  const { title, subtasks } = task;

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: title,
    data: { type: "Task", task },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const subtaskCompleted = Object.values(subtasks).filter(
    (value) => value
  ).length;

  const subtaskCount = Object.keys(subtasks).length;

  if (isDragging) {
    return (
      <div
        className="bg-light-surface rounded-lg task-shadow px-4 py-10 last-of-type:last:mb-12
      cursor-pointer text-light-on-surface hover:text-primary
      dark:bg-dark-surface"
      ></div>
    );
  }

  return (
    <section
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      onClick={() =>
        navigate(`/board/${boardId}/task/${hypenateString(title)}`, {
          state: task,
        })
      }
      className="bg-light-surface rounded-lg task-shadow px-4 py-6 last-of-type:last:mb-12 cursor-pointer text-light-on-surface hover:text-primary dark:bg-dark-surface"
    >
      <h3 className="text-heading-md text-light-on-surface mb-2 dark:text-dark-on-surface">
        {title}
      </h3>
      {subtaskCount > 0 && (
        <p className="text-body-md text-on-background">
          <span>{subtaskCompleted}</span> of <span>{subtaskCount}</span>{" "}
          subtasks
        </p>
      )}
    </section>
  );
}
