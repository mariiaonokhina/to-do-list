import "../styles/Task.css";

// eslint-disable-next-line react/prop-types
const Task = ({task, dueDate}) => {
    return(
        <div className="Task">
            <input className="checkbox" name="checkbox" type="checkbox" />
            
            <span className="task-name">{task}</span>

            <span className="due-date">{dueDate}</span>

            <div className="task-tools">
                <button className="task-tool-btn">
                    <img className="task-tool-img" src="./images/x-solid.svg"/>
                </button>

                <button className="task-tool-btn">
                    <img className="task-tool-img" src="./images/pen-to-square-solid.svg"/>
                </button>
            </div>

            <button className="task-tool-btn">
                <img className="task-tool-img" src="./images/plus-solid.svg"/>
            </button>
        </div>
    )
}
export default Task;