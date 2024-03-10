import "../styles/Task.css";

// eslint-disable-next-line react/prop-types
const Task = ({taskName, dueDate, toggleCompletion, isCompleted, priority, deleteTask}) => {
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
                <button className="delete-super-task-btn" onClick={deleteTask}>
                    <img className="task-tool-img" src="./images/x-solid.svg" alt="Delete Task"/>
                </button>
            </div>
        </div>
    );
};

export default Task;