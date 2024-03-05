import React from 'react';
import Task from './Task'; // Import Task component
import Subtask from './Subtask'; // Ensure you have this component
import '../styles/TaskContainer.css'; // Ensure you have styles defined

const TaskContainer = ({ id, mainTask, subtasks, priority, taskStatus, dueDate, deleteTask, toggleCompletion, isCompleted }) => {
  return (
    <div className="TaskContainer">
      {/* Display the main task */}
      <Task 
        taskName={mainTask} 
        dueDate={dueDate} 
        toggleCompletion={() => toggleCompletion(mainTask)}
        isCompleted={isCompleted}
      />
      {/* Optionally render subtasks */}
      {subtasks && subtasks.map((subtask, index) => (
        <Subtask key={index} {...subtask} />
      ))}
      {/* Delete button */}
      <button className="delete-task-btn" onClick={deleteTask}>
        Delete
      </button>
    </div>
  );
};

export default TaskContainer;