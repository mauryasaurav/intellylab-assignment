import React, { useContext, useEffect, useCallback } from "react";
import { Heading, Stack, Flex, HStack, Button } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { resetPasswordSchema } from "../../utils/validations";
import PrimaryPassword from "../../components/Common/PrimaryPassword";
import AppButton from "../../components/Common/AppButton";
import useApi from "../../hooks/useApi";
import AppContext from "../../context/AppContext";
import PrimaryInput from "../Common/PrimaryInput";
import PrimaryCheckbox from "../Common/PrimaryCheckbox";

const Register = () => {
  const navigate = useNavigate();
  const { setLoggedInUser } = useContext(AppContext);
  const { data, loading, callApi } = useApi();

  const handleSubmitForm = useCallback(async (values) => {
    const payload = {
      ...values,
      role: values.role ? 1 : 2,
    };
    delete payload.confirm_password;

    await callApi({
      url: '/api/user/create',
      method: 'POST',
      body: payload,
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
            Register Your Account
          </Heading>
          <Formik
            initialValues={{
              first_name: "",
              last_name: "",
              email: "",
              password: "",
              confirm_password: "",
              role: false,
            }}
            onSubmit={handleSubmitForm}
            validationSchema={resetPasswordSchema}
          >
            {(props) => (
              <Form onSubmit={props.handleSubmit}>
                <Stack spacing="6">
                  <HStack spacing="4">
                    <PrimaryInput
                      label="First Name"
                      placeholder="Enter your First Name."
                      name="first_name"
                      flex="1"
                    />
                    <PrimaryInput
                      label="Last Name"
                      placeholder="Enter your Last Name."
                      name="last_name"
                      flex="1"
                    />
                  </HStack>
                  <PrimaryInput
                    label="Email Id"
                    placeholder="Enter your email."
                    name="email"
                  />
                  <PrimaryPassword
                    label="Password"
                    placeholder="Enter your password."
                    name="password"
                  />
                  <PrimaryPassword
                    label="Confirm Password"
                    placeholder="Enter your confirm password."
                    name="confirm_password"
                  />
                  <PrimaryCheckbox
                    label="Logged-in as admin"
                    name="role"
                  />
                  <HStack justify="space-between">
                    <Button
                      onClick={() => navigate(`/login`)}
                      variant="link"
                      colorScheme="blue"
                      size="lg"
                    >
                      Login?
                    </Button>
                  </HStack>
                  <AppButton isLoading={loading} label="Register" />
                </Stack>
              </Form>
            )}
          </Formik>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default Register;
