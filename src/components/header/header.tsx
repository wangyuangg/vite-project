import { Box, Heading, IconButton, useDisclosure } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import AddInput from "../AddInput/addInput";

function Header() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Box as="header" bg="teal.500" color="white" p={4} position="relative">
      <Heading as="h1" size="lg" textAlign="center">
        To do List
      </Heading>
      <IconButton
        aria-label="Add item"
        icon={<AddIcon />}
        onClick={onOpen}
        colorScheme="teal"
        variant="outline"
        position="absolute"
        right="1rem"
        top="50%"
        transform="translateY(-50%)"
      />
      <AddInput isOpen={isOpen} onClose={onClose} />
    </Box>
  );
}

export default Header;
