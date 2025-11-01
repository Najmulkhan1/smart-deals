import React from "react";
import { NavLink } from "react-router";

const MyLink = ({ to, className, children }) => {
  return (
    <div>
      <NavLink
        to={to}
        className={({ isActive }) =>
          isActive ? 'border-b-2 border-green-500' : ""
        }
      >
        {children}
      </NavLink>
    </div>
  );
};

export default MyLink;
