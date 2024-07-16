import React, { useState } from "react";
import moment from "moment";
import "./task.css";
import { useContext } from "react";
import TaskContext from "../../context/TaskContext";
import TokenContext from "../../context/TokenContext";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "../../Axios/axios.js";

function Task({ task, id }) {
  const { dispatch } = useContext(TaskContext);
  const { userToken } = useContext(TokenContext);

  async function handleRemove(e, taskid, id) {
    e.preventDefault();
    console.log(taskid, id);
    try {
      await axios.post(
        "/task/removeTask",
        {
          taskid,
        },
        {
          headers: {
            Authorization: `Bearer ${userToken}`,
          },
        }
      );
    } catch (error) {
      console.log(error);
    }

    dispatch({
      type: "REMOVE_TASK",
      id,
    });
  }

  return (
    <div className="bg-slate-300 py-4 rounded-lg shadow-md flex items-center justify-center gap-2 mb-3">
      <div className="task-info text-slate-900 text-sm w-10/12">
        <h4 className="task-title text-lg capitalize">{task.subCategory}</h4>
        <p className="task-description">{task.subHeading}</p>
        <div className="italic opacity-60">
          {task?.createdAt ? (
            <p>{moment(task.createdAt).fromNow()}</p>
          ) : (
            <p>just now</p>
          )}
        </div>
      </div>
      <div className="remove-task text-sm text-white">
        <DeleteIcon
          style={{ fontSize: 30, cursor: "pointer" }}
          size="large"
          onClick={(e) => handleRemove(e, task._id, id)}
          className="remove-task-btn bg-blue-700 rounded-full border-2 shadow-2xl border-white p-1"
        />
      </div>
    </div>
  );
}

export default Task;
