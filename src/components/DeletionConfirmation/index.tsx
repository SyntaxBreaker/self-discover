import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";

interface IProps {
  isOpen: boolean;
  onClose: () => void;
  handleRemove: () => Promise<void>;
}

function DeletionConfirmation({ isOpen, onClose, handleRemove }: IProps) {
  const handleRemoveAndClose = () => {
    handleRemove();
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Confirm</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          Are you sure you want to delete it? This process cannot be undone.
        </ModalBody>
        <ModalFooter gap={2}>
          <Button onClick={onClose} variant="ghost">
            Cancel
          </Button>
          <Button colorScheme="red" onClick={handleRemoveAndClose}>
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeletionConfirmation;
