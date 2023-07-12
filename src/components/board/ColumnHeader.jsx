/* eslint-disable react/prop-types */
export function ColumnHeader({ name, taskCount }) {
  return (
    <div className="pb-6">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="15"
        height="15"
        viewBox="0 0 15 15"
        className="fill-primary"
      >
        <circle cx="7.5" cy="7.5" r="7.5" fill="#49C4E5" />
      </svg>
      <h2 className="text-heading-sm text-on-background">
        {name} ({taskCount})
      </h2>
    </div>
  );
}
