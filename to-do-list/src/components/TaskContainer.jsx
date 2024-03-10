import Task from './Task';
import Subtask from './Subtask';
import '../styles/TaskContainer.css';

// eslint-disable-next-line react/prop-types
const TaskContainer = ({mainTask, subtasks, priority, dueDate, deleteTask, toggleCompletion, isCompleted}) => {
  return (
    <div className="TaskContainer">

      <Task 
        taskName={mainTask} 
        dueDate={dueDate} 
        toggleCompletion={() => toggleCompletion(mainTask)} 
        isCompleted={isCompleted} 
        priority={priority}
      />

      {subtasks && subtasks.map((subtask, index) => (
        <Subtask key={index} {...subtask} />
      ))}

      <button className="delete-super-task-btn" onClick={deleteTask}>
        <img src="./images/x-solid.svg" className="task-tool-img" />
      </button>
    </div>
  );
};

export default TaskContainer;