import "../styles/Subtask.css";

/* eslint-disable react/prop-types */
const Subtask = ({subtask}) => {
    return(
        <div className="Subtask">
            {subtask}
        </div>
    )
}
export default Subtask;