/* eslint-disable react/prop-types */

import { useNavigate, useLocation } from "react-router-dom";

export function Modal({ children }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div
      className="fixed left-0 top-0 right-0 bottom-0 bg-[#000000] bg-opacity-60 flex items-center justify-center overflow-auto z-[99]"
      onClick={() => {
        if (location.pathname.includes("edit-task")) {
          navigate(-2);
        } else {
          navigate(-1);
        }
      }}
    >
      {children}
    </div>
  );
}
