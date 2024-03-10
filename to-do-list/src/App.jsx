import './styles/App.css';
import { useState } from "react";
import "react-bootstrap";
import TaskContainer from './components/TaskContainer';
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
  const [currDueDate, setCurrDueDate] = useState(getToday());
  const [currPriority, setCurrPriority] = useState("low");
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);
  const [showNoTaskNameWarning, setShowNoTaskNameWarning] = useState(false);
  const [activeAccordionKey, setActiveAccordionKey] = useState("0");
  const [completedTasks, setCompletedTasks] = useState(new Map());

  const handleInputNameChange = (event) => {
    setCurrTaskName(event.target.value);
  }

  const handleInputDateChange = (event) => {
    setCurrDueDate(event.target.value);
  }

  const handleInputPriorityChange = (event) => {
    setCurrPriority(event.target.value);
  }

  const addTask = () => {
    const effectiveTaskName = currTaskName.trim();

    if (tasks.has(effectiveTaskName)) {
      setShowDuplicateWarning(true);
      setShowNoTaskNameWarning(false);
      return;
    }

    if (currTaskName === "") {
      setShowNoTaskNameWarning(true);
      setShowDuplicateWarning(false);
      return;
    }

    const newTask = {
      id: taskCount,
      mainTask: effectiveTaskName,
      subtasks: [{name: "rrr", dueDate: "23332"}],
      priority: currPriority,
      taskStatus: "new",
      dueDate: currDueDate !== "" ? currDueDate : getToday(),
      completed: false
    };

    const newTasks = new Map(tasks).set(effectiveTaskName, newTask);

    setTasks(newTasks);
    setTaskCount(taskCount + 1);
    setCurrTaskName("");
    setCurrDueDate(currDueDate);
    setCurrPriority("low")
    setActiveAccordionKey("0"); // Open MyToDos part of the accordion
    setShowDuplicateWarning(false);
    setShowNoTaskNameWarning(false);
  };

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
      setActiveAccordionKey("1");

    } else if (completedTasks.has(taskName)) {
      const updatedTask = { ...completedTasks.get(taskName), isCompleted: false };
      const newCompletedTasks = new Map([...completedTasks]);
      newCompletedTasks.delete(taskName);

      const newTasks = new Map(tasks).set(taskName, updatedTask);
      setCompletedTasks(newCompletedTasks);
      setTasks(newTasks);
      setActiveAccordionKey("0");
    }
  };

  // Function to toggle accordion items
  const toggleAccordion = (key) => {
    setActiveAccordionKey(activeAccordionKey === key ? null : key);
  };

  const addSubtaskToTask = (taskId, newSubtask) => {
    setTasks(prevTasks => {
      const updatedTasks = new Map(prevTasks);
      const task = updatedTasks.get(taskId);
      if (task) {
        const updatedSubtasks = [...task.subtasks, newSubtask];
        const updatedTask = { ...task, subtasks: updatedSubtasks };
        updatedTasks.set(taskId, updatedTask);
      }
      return updatedTasks;
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
                 placeholder="Enter the name of your task..."
                 value={currTaskName}
                 onChange={handleInputNameChange} />
                
          <select name="priority" className="priority-select" onChange={handleInputPriorityChange}>
            <option value="low">Low Priority</option>
            <option value="medium">Medium Priority</option>
            <option value="high">High Priority</option>
          </select>

          <input type="date"
                 className="enter-date"
                 onChange={handleInputDateChange}
                 value={currDueDate}
                 min={getToday()} />

          <button onClick={addTask}>+</button>
        </div>

        <div className="input-warnings">
          {showNoTaskNameWarning && <p className="input-warning">Enter a name for your task.</p>}
          {showDuplicateWarning && <p className="input-warning">This task already exists.</p>}
        </div>
      </div>

  <Accordion className="accordion" activeKey={activeAccordionKey} onSelect={(key) => toggleAccordion(key)} flush>
  <Accordion.Item className="todos-container" eventKey="0">
    <Accordion.Header className="accordion-header">My ToDos</Accordion.Header>
      <Accordion.Body>
        {tasks.size === 0 ? "No tasks :( Click the [+] button to add a task!" :
          [...tasks.entries()].map(([task, taskInfo]) => (
            <TaskContainer
              key={taskInfo.id}
              id={taskInfo.id}
              mainTask={taskInfo.mainTask}
              subtasks={taskInfo.subtasks}
              priority={taskInfo.priority}
              taskStatus={taskInfo.taskStatus}
              dueDate={taskInfo.dueDate}
              deleteTask={() => deleteTask(taskInfo.id)}
              toggleCompletion={() => toggleTaskCompletion(taskInfo.id)}
              isCompleted={taskInfo.completed}
              addSubtask={(newSubtask) => addSubtaskToTask(taskInfo.id, newSubtask)}
            />
          ))
        }
      </Accordion.Body>
    </Accordion.Item>

    <Accordion.Item className="completed-tasks-container" eventKey="1">
      <Accordion.Header className="accordion-header">Completed Tasks</Accordion.Header>
        <Accordion.Body>
          {completedTasks.size === 0 ? "No completed tasks." :
            [...completedTasks.entries()].map(([task, taskInfo]) => (
              <TaskContainer
                key={taskInfo.id}
                id={taskInfo.id}
                mainTask={taskInfo.mainTask}
                subtasks={taskInfo.subtasks}
                priority={taskInfo.priority}
                taskStatus={taskInfo.taskStatus}
                dueDate={taskInfo.dueDate}
                deleteTask={() => deleteTask(task)}
                isCompleted={true}
                toggleCompletion={() => toggleTaskCompletion(task)} 
                addSubtask={(newSubtask) => addSubtaskToTask(taskInfo.id, newSubtask)}
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