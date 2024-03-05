import "../styles/Task.css";

const Task = (taskName, dueDate, toggleCompletion, isCompleted) => {
    return (
        <div className={`Task ${isCompleted ? 'completed' : ''}`}>
            <input 
            className="checkbox" 
            type="checkbox" 
            checked={isCompleted}
            onChange={toggleCompletion}
            />
            
            <span className="task-name">{taskName}</span>
            <span className="due-date">{dueDate}</span>

            <div className="task-tools">
                <button className="task-tool-btn">
                    <img className="task-tool-img" src="./images/pen-to-square-solid.svg" alt="Edit"/>
                </button>

                <button className="task-tool-btn add-subtask-btn">
                    <img className="task-tool-img" src="./images/plus-solid.svg" alt="Add Subtask"/>
                </button>
            </div>
        </div>
    );
};

export default Task;
