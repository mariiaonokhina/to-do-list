/* eslint-disable react/prop-types */
import Task from './Task';
import Subtask from './Subtask';
import '../styles/TaskContainer.css';

const TaskContainer = ({mainTask, id, subtasks, priority, dueDate, deleteTask, toggleCompletion, isCompleted, addSubtask}) => {
  return (
    <div className="TaskContainer">
      <Task 
        taskName={mainTask} 
        dueDate={dueDate} 
        toggleCompletion={() => toggleCompletion(mainTask)} 
        isCompleted={isCompleted} 
        priority={priority} 
        addSubtask={addSubtask}
        id={id}
      />

      {Array.isArray(subtasks) && subtasks.length != 0? subtasks.map((subtask, index) => (
        <Subtask key={index} name={subtask.name} dueDate={subtask.dueDate} />
      )) : ""}

      <button className="delete-super-task-btn" onClick={deleteTask}>
        <img className="task-tool-img" src="./images/x-solid.svg" alt="Delete Task"/>
      </button>
    </div>
  );
};

export default TaskContainer;