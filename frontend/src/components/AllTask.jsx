import React from "react";
import Task from "./Task/Task";
import { useContext, useState, useEffect } from "react";
import TaskContext from "../context/TaskContext";
import TokenContext from "../context/TokenContext.js";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import axios from "../Axios/axios.js";

function AllTask() {
  const { tasks } = useContext(TaskContext);
  const { userToken } = useContext(TokenContext);
  const [categories, setCategories] = useState([]);
  const [taskId, setTaskId] = useState("");
  useEffect(() => {
    async function getCategoryFunc() {
      let temp = [];
      try {
        const res = await axios.get("/category/getCategory");
        setCategories(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    getCategoryFunc();
  }, []);

  async function handleRemove(e, taskid) {
    e.preventDefault();
    // try {
    //   await axios.post(
    //     "/task/removeTask",
    //     {
    //       taskid,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${userToken}`,
    //       },
    //     }
    //   );
    // } catch (error) {
    //   console.log(error);
    // }
    // window.location.reload();
  }

  // const handleAddButton = (categoryName) => {
  //   dispatch({
  //     type: "SET_CATEGORY_NAME",
  //     categoryName,
  //   });
  // };

  return (
    <div>
      {categories.length !== 0 ? (
        categories.map((category, index) => {
          let i = 0;
          return (
            <div
              className="bg-slate-300 py-4 rounded-lg shadow-md  gap-2 mb-3 px-3"
              key={index}
            >
              <div className="flex justify-between font-bold">
                {category.name}
                <div>
                  {/* <AddIcon
                  style={{ fontSize: 30, cursor: "pointer" }}
                  size="large"
                  onClick={() => handleAddButton(category.name)}
                  className="remove-task-btn bg-blue-700 mr-1 rounded-full border-2 shadow-2xl border-white p-1 text-white"
                /> */}
                  <DeleteIcon
                    style={{ fontSize: 30, cursor: "pointer" }}
                    size="large"
                    onClick={(e) => handleRemove(e, taskId)}
                    className="remove-task-btn bg-blue-700 rounded-full border-2 shadow-2xl border-white p-1 text-white"
                  />
                </div>
              </div>
              <div className="flex flex-wrap">
                {tasks.length !== 0 ? (
                  tasks.map((task, taskindex) => {
                    if (category.name === task.subCategory) {
                      i++;
                      return (
                        <Task
                          key={taskindex}
                          task={task}
                          id={i}
                          onClick={() => {
                            setTaskId(task._id);
                          }}
                        />
                      );
                    }
                    return null;
                  })
                ) : (
                  <h1>No Task Found</h1>
                )}
              </div>
            </div>
          );
        })
      ) : (
        <h1>No Category Found</h1>
      )}
    </div>
  );
}

export default AllTask;
