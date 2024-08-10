import React, { useContext, useEffect, useCallback } from "react";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Stack,
    HStack,
} from "@chakra-ui/react";
import { Form, Formik } from "formik";
import PrimaryInput from "../Common/PrimaryInput";
import PrimaryCheckbox from "../Common/PrimaryCheckbox";
import AppButton from "../../components/Common/AppButton";
import useApi from "../../hooks/useApi";

const EditUserPopup = ({ isOpen, onClose, refetch, user }) => {
    const { data, loading, callApi } = useApi();

    const handleSubmitForm = useCallback(async (values) => {
        const payload = {
            first_name: values.first_name,
            last_name: values.last_name,
            email: values.email,
            role: values.role ? 1 : 2,
        };

        await callApi({
            url: `/api/user/update`,
            method: 'PUT',
            body: payload,
        });
    }, [callApi, user.id]);

    useEffect(() => {
        if (data) {
            refetch()
            onClose();
        }
    }, [data]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Edit User</ModalHeader>
                <ModalCloseButton />
                <Formik
                    initialValues={{
                        first_name: user.first_name || "",
                        last_name: user.last_name || "",
                        email: user.email || "",
                        role: user.role === 1, // Assuming role 1 is admin, otherwise set accordingly
                    }}
                    onSubmit={handleSubmitForm}
                >
                    {(props) => (
                        <Form onSubmit={props.handleSubmit}>
                            <ModalBody>
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
                                        disabled={true}
                                    />
                                    <PrimaryCheckbox
                                        label="Logged-in as admin"
                                        name="role"
                                        disabled={true}
                                    />
                                </Stack>
                            </ModalBody>
                            <ModalFooter>
                                <Button variant="ghost" onClick={onClose}>
                                    Cancel
                                </Button>
                                <AppButton isLoading={loading} label="Update" type="submit" />
                            </ModalFooter>
                        </Form>
                    )}
                </Formik>
            </ModalContent>
        </Modal>
    );
};

export default EditUserPopup;
