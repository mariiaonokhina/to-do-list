import "../styles/Task.css";
import ModalNewSubtask from "./ModalNewSubtask";

// eslint-disable-next-line react/prop-types
const Task = ({taskName, dueDate, toggleCompletion, isCompleted, priority}) => {
    return (
        <div className={`Task ${isCompleted ? 'completed' : ''} ${priority}`}>
            <input 
            className="checkbox" 
            type="checkbox" 
            checked={isCompleted}
            onChange={toggleCompletion}
            />
            
            <span className="task-name">{taskName}</span>

            <span className="due-date">Due: {dueDate}</span>

            <div className="task-tools">
                <ModalNewSubtask />
            </div>
        </div>
    );
};

export default Task;