// App.js
import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import Dashboard from './components/dashboard'; // Import Dashboard component

const App = () => {
  return (
    <ChakraProvider>
      <Dashboard />  {/* Render the Dashboard component */}
    </ChakraProvider>
  );
};

export default App;
