import "../styles/Task.css";
import Task from "./Task";
import Subtask from "./Subtask";
import "../styles/TaskContainer.css"

/* eslint-disable react/prop-types */
const TaskContainer = ({mainTask, id, subtasks, priority, taskStatus, dueDate}) => {
    return(
        <div className={`TaskContainer ${priority}`}>
            <Task task={mainTask} />
            {id} {priority} {taskStatus} {dueDate}

            {subtasks.map(subtask => (
                <Subtask key={subtask} subtask={subtask} />
            ))}
        </div>
    )
}
export default TaskContainer;