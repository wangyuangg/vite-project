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
  Input,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (content: string) => void;//提交数据给父组件
  initialContent: string;
}

function EditModal({
  isOpen,
  onClose,
  onSubmit,
  initialContent,
}: EditModalProps) {
  const [content, setContent] = useState(initialContent);

  // 当 initialContent 改变时更新内部状态
  useEffect(() => {
    setContent(initialContent);
  }, [initialContent]);

  const handleSubmit = () => {
    if (content.trim() === "") return;
    onSubmit(content);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>编辑任务</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <Input
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="请输入新的任务内容"//modal输入框的占位符，是默认值
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
            保存
          </Button>
          <Button onClick={onClose}>取消</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default EditModal;
