import { AddIcon } from "@chakra-ui/icons";
import {
  Box,
  Stack,
  Text,
  Button,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { ChatState } from "../Context/ChatProvider";

const MyChats = ({ fetchAgain, onChatSelect }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();
  const toast = useToast();

  // Color mode values
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const buttonBg = useColorModeValue("blue.500", "blue.400");
  const buttonHoverBg = useColorModeValue("blue.600", "blue.500");
  const chatBg = useColorModeValue("gray.50", "gray.700");
  const selectedChatBg = useColorModeValue("blue.500", "blue.400");
  const chatHoverBg = useColorModeValue("gray.100", "gray.600");
  const chatTextColor = useColorModeValue("gray.800", "white");
  const subTextColor = useColorModeValue("gray.600", "gray.300");
  const fetchChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("/api/chat", config);
      setChats(data);
    } catch (error) {
      toast({
        title: "Error Occurred!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };
  const handleChatClick = (chat) => {
    setSelectedChat(chat);
    onChatSelect(); // Trigger mobile view change
  };
  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
  }, [fetchAgain]);

  return (
    <Box
      h="100%"
      display="flex"
      flexDirection="column"
      borderRadius="xl"
      overflow="hidden"
      bg={useColorModeValue("white", "gray.800")}
    >
      <Box
        p={4}
        borderBottomWidth="1px"
        borderColor={borderColor}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize="xl" fontWeight="bold" color={chatTextColor}>
          My Chats
        </Text>
        <GroupChatModal>
          <Button
            size="sm"
            bg={buttonBg}
            color="white"
            _hover={{ bg: buttonHoverBg }}
            leftIcon={<AddIcon />}
            boxShadow="sm"
            _active={{ transform: "scale(0.95)" }}
          >
            New Group
          </Button>
        </GroupChatModal>
      </Box>

      <Box
        flex={1}
        overflowY="auto"
        p={3}
        bg={chatBg}
        css={{
          "&::-webkit-scrollbar": {
            width: "4px",
          },
          "&::-webkit-scrollbar-track": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#cbd5e0",
            borderRadius: "24px",
          },
        }}
      >
        {chats ? (
          <Stack spacing={2}>
            {chats.map((chat) => (
              <Box
                onClick={() => handleChatClick(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? selectedChatBg : "transparent"}
                color={selectedChat === chat ? "white" : chatTextColor}
                px={3}
                py={2}
                borderRadius="md"
                transition="all 0.2s"
                _hover={{
                  bg: selectedChat === chat ? selectedChatBg : chatHoverBg,
                  transform: "translateX(2px)",
                }}
                key={chat._id}
                role="group"
              >
                <Text fontWeight="600">
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text
                    fontSize="sm"
                    color={
                      selectedChat === chat ? "whiteAlpha.800" : subTextColor
                    }
                    noOfLines={1}
                  >
                    <Text as="span" fontWeight="500">
                      {chat.latestMessage.sender.name}:
                    </Text>{" "}
                    {chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;
