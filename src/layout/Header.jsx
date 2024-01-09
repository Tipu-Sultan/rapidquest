import { Link, NavLink } from 'react-router-dom';
import {
    Box,
    Flex,
    useDisclosure,
    useColorModeValue,
    Stack,
    useColorMode,
    IconButton,
    HStack,
    Heading,
} from '@chakra-ui/react'
import { CloseIcon, HamburgerIcon, MoonIcon, SunIcon } from '@chakra-ui/icons'

const Links = [
    { text: 'Home', url: '/' },
    { text: 'Upload', url: '/upload' },
    { text: 'Videos', url: '/videos' },
    { text: 'Documentation', url: '/documentation' },
];

function Header() {
    const { colorMode, toggleColorMode } = useColorMode();
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.700')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box><Heading>RapidQuest</Heading></Box>
                        <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                            {Links.map((link, i) => (
                                <NavLink key={i}>
                                    <Link to={link.url}>{link.text}</Link>
                                </NavLink>
                            ))}
                        </HStack>
                    </HStack>
                    <IconButton
                        aria-label="Toggle color mode"
                        icon={colorMode === "light" ? <MoonIcon /> : <SunIcon />}
                        onClick={toggleColorMode}
                        right={"2"}
                    />
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            {Links.map((link, i) => (
                                <NavLink key={i}>
                                    <Link to={link.url}>{link.text}</Link>
                                </NavLink>
                            ))}
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}

export default Header;
