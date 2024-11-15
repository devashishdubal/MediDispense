// Auth.js
import React, { useState } from 'react';
import { Box, Button, Flex, Input, Stack, Heading, Text, Link, Toaster } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { useToast } from "@chakra-ui/toast";
import axios from 'axios';

function Auth() {
    const [isLogin, setIsLogin] = useState(true); // Toggle between login and register
    const toast = useToast();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState(''); // Only used for register

    const handleAuth = async () => {
        // Basic validation
        try {

            if (!email || !password || (!isLogin && (!name))) {
                console.log("Error");
                toast({
                    title: 'Error',
                    description: 'Please fill out all required fields.',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
                return;
            }

            const endpoint = 'http://localhost:8000/users/' + (isLogin ? 'login' : 'register');
            console.log(endpoint);
            const { data } = await axios.post(endpoint, {
                name, email, password
            }, {
                withCredentials: true // Send credentials (cookies) with the request
            });

            console.log("Success");
            // Show toast message for success
            toast({
                title: isLogin ? 'Login successful' : 'Registration successful',
                description: `Welcome, ${name}!`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } catch (Error) {
            console.log(Error);
        }
    };

    return (
        <>
            <Flex minH="100vh" align="center" justify="center" bg="gray.100">
                <Box
                    maxW="md"
                    w="full"
                    p={8}
                    borderWidth={1}
                    borderRadius="lg"
                    boxShadow="lg"
                    bg="white"
                >
                    <Heading mb={6} textAlign="center">{isLogin ? 'Login' : 'Register'}</Heading>
                    <Stack spacing={4}>
                        {!isLogin && (
                            <>
                                <FormControl id="name" isRequired>
                                    <FormLabel>Name</FormLabel>
                                    <Input
                                        type="text"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter your name"
                                    />
                                </FormControl>
                            </>
                        )}
                        <FormControl id="email" isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                            />
                        </FormControl>
                        <FormControl id="password" isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                            />
                        </FormControl>
                        <Button colorScheme="blue" onClick={handleAuth} width="full" mt={4}>
                            {isLogin ? 'Login' : 'Register'}
                        </Button>
                        <Text textAlign="center" mt={4}>
                            {isLogin ? (
                                <span>
                                    Don't have an account?{' '}
                                    <Link color="blue.500" onClick={() => setIsLogin(false)}>
                                        Register
                                    </Link>
                                </span>
                            ) : (
                                <span>
                                    Already have an account?{' '}
                                    <Link color="blue.500" onClick={() => setIsLogin(true)}>
                                        Login
                                    </Link>
                                </span>
                            )}
                        </Text>
                    </Stack>
                </Box>
            </Flex>
            {/* <Toaster /> */}
        </>
    );
}

export default Auth;
