import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";

export default function DeleteConfirmModal ( {
  modal,
  setModal,
  deleteFunction,
  message,
} )
{
  return (
    <Modal isOpen={ modal } toggle={ () => setModal( false ) }>
      <ModalHeader toggle={ () => setModal( false ) }>Delete Confirm</ModalHeader>
      <ModalBody>{ message }</ModalBody>
      <ModalFooter>
        <Button color="danger" onClick={ deleteFunction }>
          Delete
        </Button>
        <Button color="secondary" onClick={ () => setModal( false ) }>
          Cancel
        </Button>
      </ModalFooter>
    </Modal>
  );
}
