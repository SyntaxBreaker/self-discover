import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";

interface DeletionConfirmationProps {
  isOpen: boolean;
  onClose: () => void;
  handleRemove: () => Promise<void>;
}

function DeletionConfirmation({
  isOpen,
  onClose,
  handleRemove,
}: DeletionConfirmationProps) {
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
          <Text fontSize="sm">
            Are you sure you want to delete it? This process cannot be undone.
          </Text>
        </ModalBody>
        <ModalFooter gap={2}>
          <Button onClick={onClose} variant="ghost" size="sm">
            Cancel
          </Button>
          <Button colorScheme="red" onClick={handleRemoveAndClose} size="sm">
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default DeletionConfirmation;
