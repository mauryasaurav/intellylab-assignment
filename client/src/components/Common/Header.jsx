import React, { memo, useCallback, useContext } from 'react';
import {
    Box,
    Flex,
    HStack,
    IconButton,
    useColorModeValue,
    Stack,
    Avatar,
    useDisclosure,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import { headerList } from '../../utils/constants';
import AppContext from '../../context/AppContext';
import LOGOUT from "../../assets/images/logout.webp";
import LogoutConfirmation from '../Home/LogoutConfirmation';

const NavLink = memo(({ link, children, onClose }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleClick = useCallback(() => {
        navigate(link);
        onClose();
    }, [navigate, link, onClose]);

    const isActive = location.pathname === (link === "/" ? "/" : `/${link}`);
    const activeBg = useColorModeValue('gray.300', 'gray.600');
    const inactiveBg = 'transparent';
    const activeColor = useColorModeValue('black', 'white');
    const inactiveColor = useColorModeValue('gray.600', 'gray.300');

    return (
        <Box
            as="a"
            px={2}
            py={1}
            rounded="md"
            cursor="pointer"
            bg={isActive ? activeBg : inactiveBg}
            color={isActive ? activeColor : inactiveColor}
            _hover={{
                textDecoration: 'none',
                bg: useColorModeValue('gray.200', 'gray.700'),
            }}
            onClick={handleClick}
        >
            {children}
        </Box>
    );
});

const Header = ({ isOpen, onOpen, onClose }) => {
    const { isOpen: isLogoutOpen, onOpen: onLogoutOpen, onClose: onLogoutClose } = useDisclosure();
    const { loggedInUser } = React.useContext(AppContext);

    const routes = headerList.filter(f => loggedInUser?.role === 1 || f.link !== "user-management");
    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Flex h={16} alignItems="center" justifyContent="space-between">
                <IconButton
                    size="md"
                    icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                    aria-label="Open Menu"
                    display={{ md: 'none' }}
                    onClick={isOpen ? onClose : onOpen}
                />
                <HStack spacing={8} alignItems="center">
                    <Box cursor={"pointer"}>IntellyLabs</Box>
                    <HStack as="nav" spacing={4} display={{ base: 'none', md: 'flex' }}>
                        {routes.map(({ link, name }) => (
                            <NavLink onClose={onClose} key={link} link={link}>
                                {name}
                            </NavLink>
                        ))}
                    </HStack>
                </HStack>
                <Flex alignItems={'center'}>
                    <Avatar
                        onClick={() => onLogoutOpen()}
                        cursor={"pointer"}
                        size={'sm'}
                        src={LOGOUT}
                    />
                </Flex>
            </Flex>
            {isOpen && (
                <Box pb={4} display={{ md: 'none' }}>
                    <Stack as="nav" spacing={4}>
                        {routes.map(({ link, name }) => (
                            <NavLink onClose={onClose} key={link} link={link}>
                                {name}
                            </NavLink>
                        ))}
                    </Stack>
                </Box>
            )}

            {isLogoutOpen && (
                <LogoutConfirmation isOpen={isLogoutOpen} onOpen={onLogoutOpen} onClose={onLogoutClose} />
            )}
        </Box>
    );
};

export default memo(Header);
