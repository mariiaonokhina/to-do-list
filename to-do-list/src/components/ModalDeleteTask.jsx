import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

// eslint-disable-next-line react/prop-types
const ModalDeleteTask = ({show, onHide, onConfirm}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        onConfirm(); 
        onHide(); // Close the modal window
    };

  return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Deleting Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            Are you sure you would like to delete this task? This action is irreversible.
            <div className="d-flex justify-content-end">
                <Button variant="secondary" onClick={onHide} className="me-2">
                    Cancel
                </Button>
                <Button variant="danger" onClick={handleSubmit}>
                    Delete Task
                </Button>
            </div>
        </Modal.Body>
      </Modal>
  );
};

export default ModalDeleteTask;