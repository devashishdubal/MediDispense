// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { ChakraProvider, defaultSystem } from "@chakra-ui/react"
import App from './App';
import AuthProvider from './components/AuthProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChakraProvider value={defaultSystem}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ChakraProvider>
  </React.StrictMode>
);
