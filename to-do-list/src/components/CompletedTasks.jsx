import "../styles/CompletedTasks.css";
import TaskContainer from "./TaskContainer";

/* eslint-disable react/prop-types */
const CompletedTasks = ({completedTasks}) => {
    return(
        <div className="CompletedTasks">
            {completedTasks.map(task => (
                <TaskContainer key={task} subtasks={task}/>
            ))}
        </div>
    )
}
export default CompletedTasks;