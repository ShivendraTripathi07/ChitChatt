import React from "react";
import { Box, keyframes } from "@chakra-ui/react";

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const bubbleFloat = keyframes`
  0% { transform: translateY(0) rotate(0deg); opacity: 0; }
  50% { opacity: 0.5; }
  100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
`;

const AnimatedBackground = () => {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      right={0}
      bottom={0}
      zIndex={-1}
      overflow="hidden"
      bg="linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #23d5ab)"
      backgroundSize="400% 400%"
      animation={`${gradientAnimation} 15s ease infinite`}
    >
      {[...Array(10)].map((_, i) => (
        <Box
          key={i}
          position="absolute"
          width={`${Math.random() * 100 + 50}px`}
          height={`${Math.random() * 100 + 50}px`}
          left={`${Math.random() * 100}%`}
          bottom="-100px"
          borderRadius="50%"
          background="rgba(255, 255, 255, 0.1)"
          animation={`${bubbleFloat} ${
            Math.random() * 10 + 10
          }s linear infinite`}
          animationDelay={`${Math.random() * 5}s`}
          backdropFilter="blur(2px)"
        />
      ))}
    </Box>
  );
};

export default AnimatedBackground;
