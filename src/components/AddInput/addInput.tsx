import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { useTodoStore } from "../../store/todoStore";

interface AddInputProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddInput({ isOpen, onClose }: AddInputProps) {
  const [inputValue, setInputValue] = useState("");
  const addTodo = useTodoStore((state) => state.addTodo);

  const handleSubmit = () => {
    if (inputValue.trim() === "") {
      return;
    }
    addTodo(inputValue);
    setInputValue("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>添加新任务</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>任务内容</FormLabel>
            <Input
              placeholder="请输入任务内容"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            添加
          </Button>
          <Button onClick={onClose}>取消</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default AddInput;
