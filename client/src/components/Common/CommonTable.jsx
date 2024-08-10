import React, { useState } from 'react';
import {
    Box,
    Input,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
    Stack,
    Text,
    Button,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';

const CommonTable = ({ data, columns, searchKeys = [], onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const filteredData = data.filter(item =>
        searchKeys.some(c => item[c].toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const handleShowValue = (data) => {
        if (typeof data === 'string') {
            const date = new Date(data);
            if (!isNaN(date.getTime())) {
                const d = date.toLocaleDateString();
                return `${d}`
            }
            return data;
        }

        if (typeof data === 'number') {
            return data == 1 ? "Admin" : "User"
        }

        if (data instanceof Date) {
            const date = data.toLocaleDateString();
            const time = data.toLocaleTimeString();
            return `${date} | ${time} `
        }
        return data;
    };


    return (
        <Box>
            <Input
                placeholder="Search..."
                mb={4}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Table variant="simple">
                <Thead>
                    <Tr>
                        {columns.map((column) => (
                            <Th key={column.accessor}>{column.Header}</Th>
                        ))}
                        {(onEdit || onDelete) && <Th>Actions</Th>}
                    </Tr>
                </Thead>
                <Tbody>
                    {paginatedData.map((item, index) => (
                        <Tr key={index}>
                            {columns.map((column) => (
                                <Td key={column.accessor}>{handleShowValue(item[column.accessor])}</Td>
                            ))}
                            {(onEdit || onDelete) && (
                                <Td>
                                    <Stack direction="row" spacing={2}>
                                        {onEdit && (
                                            <IconButton
                                                icon={<EditIcon />}
                                                onClick={() => onEdit(item)}
                                            />
                                        )}
                                        {onDelete && (
                                            <IconButton
                                                icon={<DeleteIcon />}
                                                onClick={() => onDelete(item)}
                                            />
                                        )}
                                    </Stack>
                                </Td>
                            )}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <Stack direction="row" justify="space-between" mt={4}>
                <Button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </Button>
                <Text>Page {currentPage} of {totalPages}</Text>
                <Button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </Stack>
        </Box>
    );
};

export default CommonTable;
