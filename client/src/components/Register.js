// Register.js
import React, { useState } from 'react';
import { Box, Button, Flex, Input, Stack, Heading } from '@chakra-ui/react';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { useToast } from "@chakra-ui/toast";

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const toast = useToast();

    const handleRegister = () => {
        // Simple validation check
        if (!name || !email || !password) {
            toast({
                title: 'Error',
                description: 'Please fill out all fields.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        // Registration logic here (e.g., send data to a server)
        toast({
            title: 'Registration successful',
            description: `Welcome, ${name}!`,
            status: 'success',
            duration: 3000,
            isClosable: true,
        });
    };

    return (
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
                <Heading mb={6} textAlign="center">Register</Heading>
                <Stack spacing={4}>
                    <FormControl id="name" isRequired>
                        <FormLabel>Name</FormLabel>
                        <Input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter your name"
                        />
                    </FormControl>
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
                    <Button colorScheme="blue" onClick={handleRegister} width="full" mt={4}>
                        Register
                    </Button>
                </Stack>
            </Box>
        </Flex>
    );
}

export default Register;
