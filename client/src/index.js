// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';  // Optional custom styles
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';  // Import ChakraProvider

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider>  {/* Wrap App in ChakraProvider */}
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
