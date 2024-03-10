import "../styles/Subtask.css";

// eslint-disable-next-line react/prop-types
const Subtask = ({name, dueDate}) => {
  return (
    <div className="Subtask">
      {name} - Due: {dueDate}
    </div>
  );
};

export default Subtask;