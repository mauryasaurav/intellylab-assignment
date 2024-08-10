import React, { useContext, useEffect, useCallback } from "react";
import { Button, Flex, HStack, Heading, Stack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { loginSchema } from "../../utils/validations";
import AppContext from "../../context/AppContext";
import AppButton from "../../components/Common/AppButton";
import PrimaryInput from "../../components/Common/PrimaryInput";
import PrimaryPassword from "../../components/Common/PrimaryPassword";
import useApi from "../../hooks/useApi";

const Login = () => {
  const navigate = useNavigate();
  const { setLoggedInUser } = useContext(AppContext);
  const { data, loading, callApi } = useApi();

  const handleSubmitForm = useCallback(async (values) => {
    await callApi({
      url: '/api/user/login',
      method: 'POST',
      body: values,
    });
  }, [callApi]);

  useEffect(() => {
    if (data) {
      localStorage.setItem("token", data.token);
      setLoggedInUser(data.data);
      navigate("/");
    }
  }, [data, navigate, setLoggedInUser]);

  return (
    <Stack minH="100vh" direction={{ base: "column", md: "row" }}>
      <Flex p={8} flex={1} align="center" justify="center">
        <Stack spacing={4} w="full" maxW="md">
          <Heading fontFamily="Century Gothic" fontSize="2xl">
            Login Your Account
          </Heading>
          <Formik
            initialValues={{
              email: "admin@fluper.com",
              password: "Fluper@123",
            }}
            onSubmit={handleSubmitForm}
            validationSchema={loginSchema}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit}>
                <Stack spacing="6">
                  <Stack spacing="5">
                    <PrimaryInput
                      style={{ mt: "30px" }}
                      label="Email Id"
                      placeholder="Enter your email."
                      name="email"
                    />
                    <PrimaryPassword
                      style={{ mt: "20px" }}
                      label="Password"
                      placeholder="Enter your password."
                      name="password"
                    />
                  </Stack>
                  <HStack justify="space-between">
                    <Button
                      onClick={() => navigate(`/register`)}
                      variant="link"
                      colorScheme="blue"
                      size="lg"
                    >
                      Register?
                    </Button>
                  </HStack>
                  <AppButton isLoading={loading} label="Sign in" />
                </Stack>
              </Form>
            )}
          </Formik>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default Login;
