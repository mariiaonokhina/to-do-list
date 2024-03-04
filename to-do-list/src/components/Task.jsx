import "../styles/Task.css";
import { useState } from "react";

// eslint-disable-next-line react/prop-types
const Task = ({task, dueDate}) => {
    const [isCompleted, setIsCompleted] = useState(false);

    const checkHandler = () => {
        setIsCompleted(!isCompleted);
    }

    return(
        <div className={`Task ${isCompleted ? 'completed' : ''}`}>
            <input 
            className="checkbox" 
            name="checkbox" 
            type="checkbox" 
            checked={isCompleted}
            onChange={checkHandler}
            />
            
            <span className="task-name">{task}</span>

            <span className="due-date">{dueDate}</span>

            <div className="task-tools">
                <button className="task-tool-btn">
                    <img className="task-tool-img" src="./images/pen-to-square-solid.svg"/>
                </button>

                <button className="task-tool-btn add-subtask-btn">
                    <img className="task-tool-img" src="./images/plus-solid.svg"/>
                </button>
            </div>
        </div>
    )
}
export default Task;