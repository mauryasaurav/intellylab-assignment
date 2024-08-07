import React, { useEffect } from "react";
import { Heading, Stack, Flex } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { useNavigate } from "react-router-dom";
import { resetPasswordSchema } from "../../constants/validations";
import useToastHook from "../../components/Common/Toast";
import { handlerErrors } from "../../constants/helpers";
import AppBackground from "../../components/Commons/AppBackground";
import PrimaryPassword from "../../components/Commons/PrimaryPassword";
import AppButton from "../../components/Commons/AppButton";
import useApi from "../../hooks/useApi";

const ResetPassword = () => {
  const navigate = useNavigate();
  const toast = useToastHook();
  const { data, error, loading, callApi } = useApi();

  const handleSubmitForm = async (values) => {
    await callApi({
      url: '/api/user/login',
      method: 'POST',
      body: values,
    });
  };

  useEffect(() => {
    let isAuth = data;
    if (!!isAuth) {
      navigate("/dashboard");
    }
    // eslint-disable-next-line
  }, [data]);

  return (
    <>
      <Stack minH={"100vh"} direction={{ base: "column", md: "row" }}>
        <Flex p={8} flex={1} align={"center"} justify={"center"}>
          <Stack spacing={4} w={"full"} maxW={"md"}>
            <Heading fontFamily="Century Gothic" fontSize={"2xl"}>
              Reset your password
            </Heading>
            <Formik
              initialValues={{
                password: "",
                confirm_password: "",
              }}
              onSubmit={handleSubmitForm}
              validationSchema={resetPasswordSchema}
            >
              {(props) => (
                <Form onSubmit={props.handleSubmit}>
                  <Stack spacing="6">
                    <Stack spacing="5">
                      <PrimaryPassword
                        style={{ mt: "20px" }}
                        label={"Password"}
                        placeholder={"Enter your password."}
                        name={"password"}
                      />
                      <PrimaryPassword
                        style={{ mt: "20px" }}
                        label={"Confirm Password"}
                        placeholder={"Enter your confirm password."}
                        name={"confirm_password"}
                      />
                    </Stack>
                    <AppButton isLoading={loading} label="Reset Password" />
                  </Stack>
                </Form>
              )}
            </Formik>
          </Stack>
        </Flex>
        <AppBackground />
      </Stack>
    </>
  );
};

export default ResetPassword;
