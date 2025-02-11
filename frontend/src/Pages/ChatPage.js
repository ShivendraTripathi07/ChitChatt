import {
  Box,
  useColorModeValue,
  useBreakpointValue,
  IconButton,
  Slide,
} from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { useState } from "react";
import ChatBox from "../components/ChatBox";
import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";
import AnimatedBackground from "../components/Animated Background Component";
const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const { user } = ChatState();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const componentBg = useColorModeValue(
    "rgba(255, 255, 255, 0.9)",
    "rgba(26, 32, 44, 0.9)"
  );
  const borderColor = useColorModeValue("gray.200", "gray.700");

  const handleChatSelect = () => {
    if (isMobile) {
      setShowChat(true);
    }
  };

  return (
    <Box w="100%" minH="100vh">
      <AnimatedBackground />
      {user && <SideDrawer />}
      <Box
        display="flex"
        gap={4}
        justifyContent="center"
        w="100%"
        maxW="1400px"
        h="calc(100vh - 100px)"
        p={4}
        mx="auto"
        position="relative"
      >
        {user && (
          <Box
            w={{ base: showChat ? "0" : "100%", md: "350px" }}
            display={{ base: showChat ? "none" : "block", md: "block" }}
            bg={componentBg}
            borderRadius="xl"
            boxShadow="xl"
            borderWidth="1px"
            borderColor={borderColor}
            overflow="hidden"
            backdropFilter="blur(10px)"
            transition="all 0.3s ease"
          >
            <MyChats
              fetchAgain={fetchAgain}
              onChatSelect={() => handleChatSelect()}
            />
          </Box>
        )}

        {user && (
          <Slide
            direction="right"
            in={!isMobile || showChat}
            style={{
              position: isMobile ? "fixed" : "relative",
              top: isMobile ? 0 : "auto",
              left: isMobile ? 0 : "auto",
              right: isMobile ? 0 : "auto",
              bottom: isMobile ? 0 : "auto",
              zIndex: isMobile ? 10 : "auto",
            }}
          >
            <Box
              flex={1}
              bg={componentBg}
              borderRadius="xl"
              boxShadow="xl"
              borderWidth="1px"
              borderColor={borderColor}
              overflow="hidden"
              backdropFilter="blur(10px)"
              h="100%"
              position="relative"
            >
              {isMobile && (
                <IconButton
                  icon={<ArrowLeftIcon />}
                  position="absolute"
                  top={4}
                  left={4}
                  zIndex={2}
                  onClick={() => setShowChat(false)}
                  variant="ghost"
                />
              )}
              <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
            </Box>
          </Slide>
        )}
      </Box>
    </Box>
  );
};

export default Chatpage;
