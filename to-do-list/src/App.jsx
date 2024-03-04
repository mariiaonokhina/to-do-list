import './styles/App.css';
import { useState, useEffect } from "react";
import "react-bootstrap";
import TaskContainer from './components/TaskContainer';
import CompletedTasks from './components/CompletedTasks';
import Accordion from 'react-bootstrap/Accordion';

const App = () => {
const getDate = () => {
  const today = new Date();
  const month = today.getMonth() < 10? "0" + today.getDate(): today.getDate();
  const year = today.getFullYear();
  const date = today.getDate() < 10? "0" + today.getDate(): today.getDate();
  return `${year}-${month}-${date}`;
}

  const [tasks, setTasks] = useState(new Map());
  const [taskCount, setTaskCount] = useState(0);
  const [currTaskName, setCurrTaskName] = useState("");
  // By default, the due date will be today
  const [currDueDate, setCurrDueDate] = useState(getDate());
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);
  const [showNoTaskNameWarning, setShowNoTaskNameWarning] = useState(false);
  const [activeAccordionKey, setActiveAccordionKey] = useState('0');

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
      subtasks: [],
      id: taskCount,
      priority: "low",
      taskStatus: "new",
      dueDate: currDueDate != ""? currDueDate: getDate()
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
          min={currDueDate}
          />

          <button onClick={addTask}>+</button>
        </div>

        <div className="input-warnings">
          {showNoTaskNameWarning? <p className="input-warning">Enter a name for your task.</p>:""}
          {showDuplicateWarning? <p className="input-warning">This task already exists.</p>:""}
        </div>
      </div>

      {tasks.size === 0 ? 
        <p className="no-tasks-text">No tasks :( Click the [+] button to add a task!</p>
        :
        <Accordion className="accordion" activeKey={activeAccordionKey} onSelect={(key) => setActiveAccordionKey(key)} flush>
          <Accordion.Item className="todos-container" eventKey="0">
            <Accordion.Header className="accordion-header">My ToDos</Accordion.Header>
            <Accordion.Body>
              {[...tasks.entries()].map(([task, taskInfo]) => (
                <TaskContainer 
                  key={taskInfo.id} 
                  id={taskInfo.id}
                  mainTask={task} 
                  subtasks={taskInfo.subtasks} 
                  priority={taskInfo.priority} 
                  taskStatus={taskInfo.taskStatus} 
                  dueDate={taskInfo.dueDate} 
                  deleteTask={() => deleteTask(task)}
                />
              ))}
            </Accordion.Body>
          </Accordion.Item>

          <Accordion.Item className="completed-tasks-container" eventKey="1">
            <Accordion.Header className="accordion-header">Completed Tasks</Accordion.Header>
            <Accordion.Body>
              <CompletedTasks />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      }
    </div>
  );
}

export default App;