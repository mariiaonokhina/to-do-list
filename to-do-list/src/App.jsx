import './styles/App.css';
import { useState } from "react";
import TaskContainer from './components/TaskContainer';

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

      <input type="text" 
      name="taskName" 
      placeholder="Enter your task..." value={currTaskName} onChange={handleInputChange} />
      <button className="add-task-btn" onClick={buttonClicked}>+</button>

      {tasks.size === 0 ? 
        <p>No tasks :( Click the [+] button to add a task!</p>
        :
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
      }
      
    </div>
  );
}

export default App;