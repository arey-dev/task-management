/* eslint-disable react/prop-types */

export function Modal({ children }) {
  return (
    <div className="fixed left-0 top-0 right-0 bottom-0 bg-[#000000] bg-opacity-60 flex items-center justify-center overflow-auto">
      {children}
    </div>
  );
}
