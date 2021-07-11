import { useState, createContext, useContext } from 'react';

const LocalStateContext = createContext();
const LocalStateProvider = LocalStateContext.Provider;

function CartStateProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  function openCart() {
    setCartOpen(true);
  }
  function closeCart() {
    setCartOpen(false);
  }

  return (
    <LocalStateProvider value={{ cartOpen, openCart, closeCart, cartItems }}>
      {children}
    </LocalStateProvider>
  );
}

function useCart() {
  const all = useContext(LocalStateContext);
  return all;
}

export { CartStateProvider, useCart };
