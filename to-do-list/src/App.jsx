import './styles/App.css';
import { useState, useEffect } from "react";
import "react-bootstrap";
import TaskContainer from './components/TaskContainer';
import CompletedTasks from './components/CompletedTasks';
import Accordion from 'react-bootstrap/Accordion';

const App = () => {
  const getToday = () => {
    const today = new Date();
    const month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    return `${year}-${month}-${date}`;
  };
  

  const [tasks, setTasks] = useState(new Map());
  const [taskCount, setTaskCount] = useState(0);
  const [currTaskName, setCurrTaskName] = useState("");
  // By default, the due date will be today
  const [currDueDate, setCurrDueDate] = useState(getToday());
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);
  const [showNoTaskNameWarning, setShowNoTaskNameWarning] = useState(false);
  const [activeAccordionKey, setActiveAccordionKey] = useState('0');
  const [completedTasks, setCompletedTasks] = useState(new Map());

  // Toggle accordion items (ToDos and Completed Tasks)
  useEffect(() => {
    if (activeAccordionKey != '0' && activeAccordionKey != '1') {
      setActiveAccordionKey('0');
    }
  }, [activeAccordionKey]);

  const handleInputNameChange = (event) => {
    setCurrTaskName(event.target.value);
  }

  const handleInputDateChange = (event) => {
    setCurrDueDate(event.target.value);
  }

  const addTask = () => {
    const effectiveTaskName = currTaskName.trim();
  
    // Check for duplicate task
    if (tasks.has(effectiveTaskName)) {
      setShowDuplicateWarning(true);
      setShowNoTaskNameWarning(false);
      return;
    }

    // Check if the user didn't enter a name for their task
    if (currTaskName == "") {
      setShowNoTaskNameWarning(true);
      setShowDuplicateWarning(false);
      return;
    }

  const newTask = {
    id: taskCount,
    mainTask: effectiveTaskName,
    subtasks: [], 
    priority: "low",
    taskStatus: "new",
    dueDate: currDueDate !== "" ? currDueDate : getToday(),
    completed: false
  };

  
    const newTasks = new Map(tasks).set(effectiveTaskName, newTask);
  
    setTasks(newTasks);
    setTaskCount(taskCount + 1);

    setCurrTaskName("");
    setCurrDueDate(currDueDate);
    setActiveAccordionKey("0");   // Open MyToDos part of the accordion
    setShowDuplicateWarning(false);
    setShowNoTaskNameWarning(false);
  }

  const deleteTask = (taskName) => {
    setTasks((prevTasks) => {
      const newTasks = new Map(prevTasks);
      newTasks.delete(taskName);
      return newTasks;
    });
  };

  const toggleTaskCompletion = (taskName) => {
    if (tasks.has(taskName)) {
      const updatedTask = { ...tasks.get(taskName), isCompleted: true };
      const newTasks = new Map([...tasks]);
      newTasks.delete(taskName);
  
      const newCompletedTasks = new Map(completedTasks).set(taskName, updatedTask);
      setTasks(newTasks);
      setCompletedTasks(newCompletedTasks);
    } else if (completedTasks.has(taskName)) {
      const updatedTask = { ...completedTasks.get(taskName), isCompleted: false };
      const newCompletedTasks = new Map([...completedTasks]);
      newCompletedTasks.delete(taskName);
  
      const newTasks = new Map(tasks).set(taskName, updatedTask);
      setCompletedTasks(newCompletedTasks);
      setTasks(newTasks);
    }
  };  

  return (
    <div className="App">
      <div className="website-title-container">
        <img className="checkmark-logo" src="./images/square-check-solid.svg" alt="Website logo: a checkmark"></img>
        <h1 className="project-name-header">To Do List</h1>
      </div>

      <div className="add-new-task-input-group">
        <div className="inputs">
          <input type="text" 
          className="enter-name"
          name="taskName" 
          placeholder="Enter the name of your task..." value={currTaskName} onChange={handleInputNameChange} 
          />

          <input type="date" 
          className="enter-date" 
          onChange={handleInputDateChange} 
          value={currDueDate} 
          min={getToday()}
          />

          <button onClick={addTask}>+</button>
        </div>

        <div className="input-warnings">
          {showNoTaskNameWarning? <p className="input-warning">Enter a name for your task.</p>:""}
          {showDuplicateWarning? <p className="input-warning">This task already exists.</p>:""}
        </div>
      </div>
        <Accordion className="accordion" activeKey={activeAccordionKey} onSelect={(key) => setActiveAccordionKey(key)} flush>
          <Accordion.Item className="todos-container" eventKey="0">
            <Accordion.Header className="accordion-header">My ToDos</Accordion.Header>
            <Accordion.Body>
              {tasks.size === 0? "No tasks :( Click the [+] button to add a task!":
                [...tasks.entries()].map(([task, taskInfo]) => (
                  <TaskContainer 
                  key={taskInfo.id} 
                  id={taskInfo.id}
                  mainTask={task} 
                  subtasks={taskInfo.subtasks} 
                  priority={taskInfo.priority} 
                  taskStatus={taskInfo.taskStatus} 
                  dueDate={taskInfo.dueDate} 
                  deleteTask={() => deleteTask(task)}
                  toggleCompletion={() => toggleTaskCompletion(task)}
                  isCompleted={taskInfo.isCompleted}
                />              
                ))
              }
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item className="completed-tasks-container" eventKey="1">
            <Accordion.Header className="accordion-header">Completed Tasks</Accordion.Header>
            <Accordion.Body>
              {completedTasks.size === 0? "No completed tasks.":
                [...completedTasks.entries()].map(([taskName, taskInfo]) => (
                  <TaskContainer
                  key={taskInfo.id}
                  id={taskInfo.id}
                  mainTask={taskName}
                  subtasks={taskInfo.subtasks}
                  priority={taskInfo.priority}
                  taskStatus={taskInfo.taskStatus}
                  dueDate={taskInfo.dueDate}
                  deleteTask={() => deleteTask(taskName)}
                  isCompleted={true}
                  />
                ))
              }
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
    </div>
  );
}

export default App;