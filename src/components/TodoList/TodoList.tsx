import {
  VStack,
  HStack,
  Text,
  IconButton,
  Checkbox,
  useDisclosure,
} from "@chakra-ui/react";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { useTodoStore } from "../../store/todoStore";
import { useState } from "react";
import EditModal from "../EditModal/EditModal";

function TodoList() {
  const todos = useTodoStore((state) => state.todos);
  const toggleTodo = useTodoStore((state) => state.toggleTodo);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);

  // 控制编辑模态框
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editingTodo, setEditingTodo] = useState<{
    id: Date;
    content: string;
  } | null>(null);
  // 点击任务或编辑按钮时调用
  const handleTodoClick = (id: Date, content: string) => {
    setEditingTodo({ id, content });
    onOpen();
  };
  const handleSubmit = (newContent: string) => {
    if (editingTodo) {
      updateTodo(editingTodo.id, newContent);
    }
  };

  return (
    <VStack spacing={4} align="stretch" p={4}>
      {todos.map((todo) => (
        <HStack
          key={todo.id.getTime()}
          p={4}
          bg="white"
          borderRadius="md"
          boxShadow="sm"
          _hover={{ bg: "gray.50" }}
        >
          <Checkbox
            isChecked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <VStack
            flex={1}
            align="stretch"
            spacing={1}
            cursor="pointer"
            onClick={() => handleTodoClick(todo.id, todo.content)}
          >
            <Text
              textDecoration={todo.completed ? "line-through" : "none"}
              color={todo.completed ? "gray.500" : "black"}
            >
              {todo.content}
            </Text>
            <Text fontSize="xs" color="gray.500">
              {todo.id.toLocaleString("zh-CN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              })}
            </Text>
          </VStack>
          <IconButton
            aria-label="Edit todo"
            icon={<EditIcon />}
            onClick={(e) => {
              e.stopPropagation();
              handleTodoClick(todo.id, todo.content);
            }}
            size="sm"
            colorScheme="blue"
            variant="ghost"
            mr={2}
          />
          <IconButton
            aria-label="Delete todo"
            icon={<DeleteIcon />}
            onClick={(e) => {
              e.stopPropagation();
              deleteTodo(todo.id);
            }}
            size="sm"
            colorScheme="red"
            variant="ghost"
          />
        </HStack>
      ))}

      {/* 编辑模态框 */}
      {editingTodo && (
        <EditModal
          isOpen={isOpen}
          onClose={onClose}
          onSubmit={handleSubmit}
          initialContent={editingTodo.content}
        />
      )}
    </VStack>
  );
}

export default TodoList;
