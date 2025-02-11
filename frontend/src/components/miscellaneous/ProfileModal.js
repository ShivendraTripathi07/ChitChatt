import { ViewIcon } from "@chakra-ui/icons";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  useDisclosure,
  IconButton,
  Text,
  Image,
  Box,
} from "@chakra-ui/react";

const ProfileModal = ({ user, children }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <Box as="span" onClick={onOpen} cursor="pointer">
          {children}
        </Box>
      ) : (
        <IconButton
          icon={<ViewIcon />}
          onClick={onOpen}
          variant="ghost"
          colorScheme="teal"
          aria-label="View Profile"
        />
      )}
      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent maxW="400px" p={4} borderRadius="lg" boxShadow="lg">
          <ModalHeader
            fontSize={{ base: "2xl", md: "3xl" }}
            fontFamily="Work sans"
            color="teal.600"
            textAlign="center"
          >
            {user.name}
          </ModalHeader>
          <ModalCloseButton color="teal.600" />
          <ModalBody
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="space-around"
            gap={4}
          >
            <Image
              borderRadius="full"
              boxSize="150px"
              src={user.pic}
              alt={user.name}
              mb={4}
              border="2px solid"
              borderColor="teal.300"
              boxShadow="md"
            />
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              fontFamily="Work sans"
              color="gray.600"
            >
              Email:{" "}
              <Text as="span" fontWeight="bold">
                {user.email}
              </Text>
            </Text>
          </ModalBody>
          <ModalFooter justifyContent="center">
            <Button colorScheme="teal" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileModal;
