import { Box, Text } from '@chakra-ui/react';
import { getFullName } from '../../utils/helpers';
import React from 'react';
import AppContext from '../../context/AppContext';

const Dashboard = () => {
    const { loggedInUser } = React.useContext(AppContext);
    return (
        <Box
            bg="teal.500"
            color="white"
            p={4}
            rounded="md"
            textAlign="center"
            boxShadow="md"
        >
            <Text fontSize="2xl">Welcome, {getFullName(loggedInUser)}</Text>
            <Text fontSize="4xl" fontWeight="bold">
            </Text>
        </Box>
    );
};

export default Dashboard;
