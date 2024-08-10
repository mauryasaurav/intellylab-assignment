import { Box, Heading, Text } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import AppButton from "./AppButton";

const PageNotFound = () => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate(`/`);
  };

  return (
    <Box textAlign="center" py={40} px={6}>
      <Heading
        display="inline-block"
        as="h2"
        fontFamily="Century Gothic"
        size="2xl"
        bgGradient="linear(to-r, teal.400, teal.600)"
        backgroundClip="text"
      >
        404
      </Heading>
      <Text fontSize="18px" mt={3} mb={2}>
        Page Not Found
      </Text>
      <Text color={"gray.500"} mb={6}>
        The page you're looking for does not seem to exist
      </Text>
      <AppButton label="Go to Home" handleClick={goToDashboard} />
    </Box>
  );
};

export default PageNotFound;
