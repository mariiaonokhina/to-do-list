import './styles/App.css';
import { useState, useEffect } from "react";
import "react-bootstrap";
import TaskContainer from './components/TaskContainer';
import CompletedTasks from './components/CompletedTasks';
import Accordion from 'react-bootstrap/Accordion';

const App = () => {
  const [tasks, setTasks] = useState(new Map());
  const [taskCount, setTaskCount] = useState(0);
  const [currTaskName, setCurrTaskName] = useState("");
  const [showWarning, setShowWarning] = useState(false);
  const [activeAccordionKey, setActiveAccordionKey] = useState('0');

  // Toggle accordion items (ToDos and Completed Tasks)
  useEffect(() => {
    if (activeAccordionKey != '0' && activeAccordionKey != '1') {
      setActiveAccordionKey('0');
    }
  }, [activeAccordionKey]);

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
    setActiveAccordionKey('0');   // Open MyToDos part of the accordion
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