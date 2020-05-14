import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';

interface Product {
  id: string;
  title: string;
  image_url: string;
  price: number;
  quantity: number;
}

interface CartContext {
  products: Product[];
  addToCart(item: Product): void;
  increment(id: string): void;
  decrement(id: string): void;
}

const CartContext = createContext<CartContext | null>(null);

const CartProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function loadProducts(): Promise<void> {
      // Pega todos os produtos do carrinho.
      const cart = await AsyncStorage.getItem('@GoMarketplace:cart');

      // Se o carrinho existir ele o joga no products convertido.
      cart && setProducts(JSON.parse(cart));
    }

    loadProducts();
  }, []);

  const addToCart = useCallback(
    async product => {
      // Procura se o produto adicionado ja existe no carrinho
      const productAddedExists = products.find(p => p.id === product.id);
      // Se ele existir, mapeia o estado do carrinho e adiciona mais a sua quantidade
      // e entao atualiza o estado do carrinho e depois coloca no banco do celular.
      if (productAddedExists) {
        products.map<Product>(productOnCart => {
          productOnCart.id === productAddedExists.id
            ? (productOnCart.quantity += 1)
            : productOnCart.quantity;
        });

        setProducts(products);

        await AsyncStorage.setItem(
          '@GoMarketplace:cart',
          JSON.stringify(products),
        );
      } else {
        // Se o producto adicionado nao existir o estado do carrinho e atualizado com o
        // valor anteiror mais o novo produto com a quantidade adicionada = 1, e entao
        // coloca o estado atualizado no banco do celular.
        setProducts([...products, { ...product, quantity: 1 }]);

        await AsyncStorage.setItem(
          '@GoMarketplace:cart',
          JSON.stringify(products),
        );
      }
      console.log(`Produtos no carrinho`);
      products.map(p => {
        console.log(`Nome: ${p.title} - Quantidade: ${p.quantity}`);
      });
    },
    [products],
  );

  const increment = useCallback(
    async id => {
      // Pega o id enviado e verifica com o estado atual do carrinho ate encontrar
      // o produto com o respectivo id e quando encontra-o adicione +1 a sua quantidade.
      const productsIncremented = products.map<Product>(product => {
        if (product.id === id) {
          product.quantity += 1;
        }
        return product;
      });

      setProducts(productsIncremented);

      await AsyncStorage.setItem(
        '@GoMarketplace:cart',
        JSON.stringify(productsIncremented),
      );
    },
    [products],
  );

  const decrement = useCallback(
    async id => {
      const productsDecremented = products.map<Product>(product => {
        if (product.id === id) {
          product.quantity -= 1;
          return product;
        }
      });

      setProducts(productsDecremented);

      await AsyncStorage.setItem(
        '@GoMarketplace:cart',
        JSON.stringify(productsDecremented),
      );
    },
    [products],
  );

  const value = React.useMemo(
    () => ({ addToCart, increment, decrement, products }),
    [products, addToCart, increment, decrement],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

function useCart(): CartContext {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(`useCart must be used within a CartProvider`);
  }

  return context;
}

export { CartProvider, useCart };
