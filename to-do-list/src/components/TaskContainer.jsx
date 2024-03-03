import "../styles/Task.css";
import Task from "./Task";
import Subtask from "./Subtask";
import "../styles/TaskContainer.css"

/* eslint-disable react/prop-types */
const TaskContainer = ({mainTask, id, subtasks, priority, taskStatus, dueDate, deleteTask}) => {
    return(
        <div className="TaskContainer">

            <Task task={mainTask} dueDate={dueDate}/>

            {subtasks.map(subtask => (
                <Subtask key={subtask} subtask={subtask} />
            ))}

            <button className="task-tool-btn delete-super-task-btn" onClick={deleteTask}>
                <img className="task-tool-img delete-super-task-img" src="./images/x-solid.svg" alt="Delete"/>
            </button>
        </div>
    );
};
export default TaskContainer;
