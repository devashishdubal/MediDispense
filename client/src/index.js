// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';  // Import ChakraProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider value={defaultSystem}>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
