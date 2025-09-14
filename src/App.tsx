import { ChakraProvider, Box } from "@chakra-ui/react";
import Header from "./components/header/header.tsx";
import TodoList from "./components/TodoList/TodoList";

export default function App() {
  return (
    <ChakraProvider>
      <Box minH="100vh" bg="gray.50">
        <Header />
        <TodoList />
      </Box>
    </ChakraProvider>
  );
}
