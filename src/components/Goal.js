import React from "react";
import { BiTrash } from "react-icons/bi";

const Goal = ({ goal, onDelete }) => {
  return (
    <li className="goal-li">
      <input type="checkbox" className="check-box" />
      <p className="goal-text">{goal.goal}</p>
      <p className="goal-text">
        {goal.date[0].day} &nbsp; {goal.date[0].month} &nbsp;{" "}
        {goal.date[0].year}
      </p>
      <BiTrash className="dust-bin" onClick={() => onDelete(goal.id)} />
    </li>
  );
};

export default Goal;
