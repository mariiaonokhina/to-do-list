import './styles/App.css';
import { useState } from "react";
import TaskContainer from './components/TaskContainer';
import CompletedTasks from './components/CompletedTasks';

const App = () => {
  const [tasks, setTasks] = useState(new Map());
  const [taskCount, setTaskCount] = useState(0);
  const [currTaskName, setCurrTaskName] = useState("");
  const [showWarning, setShowWarning] = useState(false);

  const handleInputChange = (event) => {
    setCurrTaskName(event.target.value);
  }

  const buttonClicked = () => {
    const effectiveTaskName = currTaskName.trim() || "New Task";
  
    // Check for duplicate task
    if (tasks.has(effectiveTaskName)) {
      alert("Duplicate task name!");
      return;
    }
  
    const newTask = {
      subtasks: [],
      id: taskCount,
      priority: "low",
      taskStatus: "new",
      dueDate: "Jan 1st"
    };
  
    const newTasks = new Map(tasks).set(effectiveTaskName, newTask);
  
    setTasks(newTasks);
    setTaskCount(taskCount + 1);

    setCurrTaskName("");
  }

  return (
    <div className="App">
      <h1 className="project-name-header">To Do List</h1>

      <div className="add-new-task-input-group">
        <input type="text" 
        name="taskName" 
        placeholder="Enter the name of your task..." value={currTaskName} onChange={handleInputChange} />
        <button onClick={buttonClicked}>+</button>
      </div>

      {tasks.size === 0 ? 
        <p className="no-tasks-text">No tasks :( Click the [+] button to add a task!</p>
        :
        <div className="appContent">
          <div className="tasks-container">
            {[...tasks.entries()].map(([task, taskInfo]) => (
              <TaskContainer key={taskInfo.id} 
              id={taskInfo.id}
              mainTask={task} 
              subtasks={taskInfo.subtasks} 
              priority={taskInfo.priority} 
              taskStatus={taskInfo.taskStatus} 
              dueDate={taskInfo.dueDate}
              />
            ))}
          </div>

          <CompletedTasks />
        </div>
      }
      
    </div>
  );
}

export default App;