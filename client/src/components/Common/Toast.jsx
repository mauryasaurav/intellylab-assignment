import { useToast } from "@chakra-ui/react";

function useToastHook() {
  const toast = useToast();
  return (label, status = "success") =>
    toast({
      position: "top-right",
      title: label,
      status: status,
      duration: 2000,
      isClosable: true,
    });
}

export default useToastHook;
