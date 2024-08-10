import { Box, useDisclosure } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Common/Header";

const Layout = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <div>
      <Header isOpen={isOpen} onOpen={onOpen} onClose={onClose} />
      <Box margin={['10px', '50px']}>
        <Outlet />
      </Box>
    </div>
  );
};

export default Layout;
