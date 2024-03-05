import React from 'react';
import "../styles/Task.css";

// Assuming you're passing props for managing tasks, including a method for toggling completion
const Task = ({ taskName, dueDate, toggleCompletion, isCompleted }) => {
    return (
        <div className={`Task ${isCompleted ? 'completed' : ''}`}>
            <input 
  className="checkbox" 
  type="checkbox" 
  checked={isCompleted}
  onChange={toggleCompletion} // Make sure this is correctly passed from TaskContainer
/>
            
            <span className="task-name">{taskName}</span>
            <span className="due-date">{dueDate}</span>

            <div className="task-tools">
                <button className="task-tool-btn">
                    {/* Assuming functionality for editing a task will be implemented */}
                    <img className="task-tool-img" src="./images/pen-to-square-solid.svg" alt="Edit"/>
                </button>

                <button className="task-tool-btn add-subtask-btn">
                    {/* Assuming functionality for adding subtasks will be implemented */}
                    <img className="task-tool-img" src="./images/plus-solid.svg" alt="Add Subtask"/>
                </button>
            </div>
        </div>
    );
};

export default Task;
