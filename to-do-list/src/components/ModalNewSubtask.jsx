import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ModalNewSubtask = () => {
  const [show, setShow] = useState(false);
  const [currTaskName, setCurrTaskName] = useState("");
  const [currDueDate, setCurrDueDate] = useState(getToday());
  const [currPriority, setCurrPriority] = useState("low");
  const [showDuplicateWarning, setShowDuplicateWarning] = useState(false);
  const [showNoTaskNameWarning, setShowNoTaskNameWarning] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getToday = () => {
    const today = new Date();
    const month = today.getMonth() + 1 < 10 ? `0${today.getMonth() + 1}` : today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    return `${year}-${month}-${date}`;
  };

  return (
    <div className="ModalNewSubtask">
      <button className="task-tool-btn add-subtask-btn" onClick={handleShow}>
        <img className="task-tool-img" src="./images/plus-solid.svg" alt="Add Subtask"/>
      </button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Adding New Subtask</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Please, enter the details for your new subtask.

          <form>
            <div>
                <label htmlFor="subtask-name">Subtask Name: </label>
                <input className="subtask-name-input" type="text"></input>
            </div>
            
            <div>
            <label htmlFor="subtask-name">Subtask Name: </label>
                <input className="subtask-name-input" type="date" ></input>
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Understood</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ModalNewSubtask;