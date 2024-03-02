import "../styles/Task.css";

/* eslint-disable react/prop-types */
const Task = ({task}) => {
    return(
        <div className="Task">
            {task}
        </div>
    )
}
export default Task;