import { Button } from "@chakra-ui/react";
import React from "react";

const AppButton = ({
  label = "Submit",
  type = "type",
  handleClick = () => {},
  isLoading = false,
  disabled = false,
  ...rest
}) => {
  return (
    <Button
      type={type}
      bgGradient={[
        'linear(to-t, #FFB502, #FFE566)',
      ]}
      color="#000"
      variant={"solid"}
      disabled={isLoading}
      cursor={isLoading && "not-allowed"}
      borderRadius="8px"
      onClick={!isLoading ? handleClick: () => {}}
      {...rest}
      _hover={{
        bgGradient:'linear(to-t, #FFB502, #FFE566)',
      }}
    >
      {!isLoading ? label : "Loading..."}
    </Button>
  );
};

export default AppButton;
