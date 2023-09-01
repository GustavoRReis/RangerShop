import React from 'react';

import Routes from './src/Routes';
import { CartProvider } from './src/Context/CartProvider';
import { DarkProvider } from './src/Context/DarkMode';

export default function App() {
  return (
    <CartProvider>
      <DarkProvider>
        <Routes />
      </DarkProvider>
    </CartProvider>
  );
}
