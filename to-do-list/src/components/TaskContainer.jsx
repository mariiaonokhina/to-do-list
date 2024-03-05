import Task from './Task';
import Subtask from './Subtask';
import '../styles/TaskContainer.css';

// eslint-disable-next-line react/prop-types
const TaskContainer = ({id, mainTask, subtasks, priority, taskStatus, dueDate, deleteTask, toggleCompletion, isCompleted}) => {
  return (
    <div className="TaskContainer">

      <Task 
        taskName={mainTask} 
        dueDate={dueDate} 
        toggleCompletion={() => toggleCompletion(mainTask)}
        isCompleted={isCompleted}
      />

      {subtasks && subtasks.map((subtask, index) => (
        <Subtask key={index} {...subtask} />
      ))}

      <button className="delete-super-task-btn" onClick={deleteTask}>
        Delete
      </button>
    </div>
  );
};

export default TaskContainer;