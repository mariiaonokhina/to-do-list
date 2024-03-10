import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// eslint-disable-next-line react/prop-types
const ModalNewSubtask = ({addSubtask, taskId}) => {
    const getToday = () => {
        const today = new Date();
        const month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
        const year = today.getFullYear();
        const date = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
        return `${year}-${month}-${date}`;
    };

    const [show, setShow] = useState(false);
    const [subtaskName, setSubtaskName] = useState("");
    const [subtaskDueDate, setSubtaskDueDate] = useState("");
    const [subtaskPriority, setSubtaskPriority] = useState("low");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleSubmit = (e) => {
        e.preventDefault();
        addSubtask(taskId, {
            name: subtaskName,
            dueDate: subtaskDueDate,
            priority: subtaskPriority,
        });

        // Reset the modal's form fields for the next use
        setSubtaskName("");
        setSubtaskDueDate("");
        setSubtaskPriority("low");
        handleClose(); // Close the modal window
    };

  return (
    <div>
      <button className="task-tool-btn" onClick={handleShow}>
        <img src="./images/plus-solid.svg" className="task-tool-img" />
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Subtask</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Subtask Name:</label>
              <input type="text" value={subtaskName} onChange={e => setSubtaskName(e.target.value)} required />
            </div>
            <div>
              <label>Due Date:</label>
              <input type="date" value={subtaskDueDate} min={getToday()} onChange={e => setSubtaskDueDate(e.target.value)} required />
            </div>
            <div>
              <label>Priority:</label>
              <select value={subtaskPriority} onChange={e => setSubtaskPriority(e.target.value)}>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select> 
            </div>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Add Subtask
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ModalNewSubtask;