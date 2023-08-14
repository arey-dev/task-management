/* eslint-disable react/prop-types */
import { useNavigate, useParams } from "react-router-dom";
import { hypenateString } from "../../utilities";

export function Task({ task }) {
  const { title, subtasks } = task;

  const subtaskCompleted = Object.values(subtasks).filter(
    (subtask) => subtask
  ).length;

  const subtaskCount = Object.keys(subtasks).length;

  const navigate = useNavigate();

  const { boardId } = useParams();

  return (
    <section
      onClick={() =>
        navigate(`/board/${boardId}/task/${hypenateString(title)}`)
      }
      className="bg-light-surface rounded-lg task-shadow px-4 py-6 last-of-type:last:mb-12 cursor-pointer text-light-on-surface hover:text-primary"
    >
      <h3 className="text-heading-md mb-2">{title}</h3>
      <p className="text-body-md text-on-background">
        <span>{subtaskCompleted}</span> of <span>{subtaskCount}</span> subtasks
      </p>
    </section>
  );
}
