/* eslint-disable react/prop-types */
import Task from './Task';
import '../styles/TaskContainer.css';

const TaskContainer = ({mainTask, id, priority, dueDate, deleteTask, toggleCompletion, isCompleted}) => {
  return (
    <div className="TaskContainer">
      <Task 
        taskName={mainTask} 
        dueDate={dueDate} 
        toggleCompletion={() => toggleCompletion(mainTask)} 
        isCompleted={isCompleted} 
        priority={priority} 
        deleteTask={deleteTask} 
        id={id}
      />
    </div>
  );
};

export default TaskContainer;