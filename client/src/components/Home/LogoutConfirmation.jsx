import React, { useState, useRef } from 'react';
import {
    Button,
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
} from '@chakra-ui/react';
import { useContext } from 'react';
import AppContext from '../../context/AppContext';
import { destroyToken } from '../../utils/helpers';
import { useNavigate } from 'react-router-dom';

const LogoutConfirmation = ({ isOpen, onOpen, onClose }) => {
    const cancelRef = useRef();
    const navigate = useNavigate()
    const { setLoggedInUser } = useContext(AppContext);

    const handleLogout = () => {
        setLoggedInUser(null);
        destroyToken(navigate)
        onClose();
    };

    return (
        <>
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize="lg" fontWeight="bold">
                            Logout
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            Are you sure you want to logout?
                        </AlertDialogBody>

                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={onClose}>
                                No
                            </Button>
                            <Button colorScheme="red" onClick={handleLogout} ml={3}>
                                Yes
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    );
};

export default LogoutConfirmation;
