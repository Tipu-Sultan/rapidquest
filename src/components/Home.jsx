import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Heading, Text, Button, Center, useColorModeValue } from '@chakra-ui/react';
import Layout from '../layout/Layout';

const Home = () => {
  const bgColor = useColorModeValue('gray.100', 'gray.800');

  return (
    <Layout>
      <Center height="100vh" bg={bgColor}>
      <Box textAlign="center">
        <Heading mb={4}>Welcome to Our Video Web App</Heading>
        <Text fontSize="lg" mb={6}>
          Explore a collection of amazing videos and enjoy an immersive experience.
        </Text>
        <Button colorScheme="teal" size="lg" as={RouterLink} to="/videos">
          Get Started
        </Button>
      </Box>
    </Center>
    </Layout>
  );
};

export default Home;
