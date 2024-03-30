import { createContext, ReactNode, useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import { Product, Stock } from '../types';

interface CartProviderProps {
  children: ReactNode;
}

interface UpdateProductAmount {
  productId: number;
  amount: number;
}

interface CartContextData {
  cart: Product[];
  addProduct: (productId: number) => Promise<void>;
  removeProduct: (productId: number) => void;
  updateProductAmount: ({ productId, amount }: UpdateProductAmount) => void;
}

const CartContext = createContext<CartContextData>({} as CartContextData);

export function CartProvider({ children }: CartProviderProps): JSX.Element {
  const [cart, setCart] = useState<Product[]>(() => {
    const storagedCart = localStorage.getItem('@RocketShoes:cart');

    if (storagedCart) {
      return JSON.parse(storagedCart);
    }

    return [];
  });

  const addProduct = async (productId: number) => {
    try {
      let newCart = [];
      const { data: product } = await api.get<Product>(`products/${productId}`);
      const { data: stock } = await api.get<Stock>(`stock/${productId}`);
      if (!stock || !product) {
        throw new Error();
      }
      const productExits = cart.find((product) => product.id === productId);
      if (!productExits) {
        newCart = [...cart, { ...product, amount: 1 }];
      } else if (productExits.amount + 1 > stock.amount) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
      } else {
        newCart = cart.map((cartItem) => {
          if (cartItem.id === productId) {
            return {
              ...cartItem,
              amount: ++cartItem.amount,
            };
          }
          return cartItem;
        });
      }
      setCart(newCart);
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(newCart));
    } catch {
      toast.error('Erro na adição do produto');
    }
  };

  const removeProduct = (productId: number) => {
    try {
      const productExits = cart.find((product) => product.id === productId);
      if (!productExits) {
        throw new Error();
      }
      const newCarts = cart.filter((product) => product.id !== productId);
      setCart(newCarts);
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(newCarts));
    } catch {
      toast.error('Erro na remoção do produto');
    }
  };

  const updateProductAmount = async ({
    productId,
    amount,
  }: UpdateProductAmount) => {
    try {
      let newCart = [];
      const { data: stock } = await api.get<Stock>(`stock/${productId}`);
      const productExits = cart.find((product) => product.id === productId);
      if (!productExits) {
        throw new Error();
      }
      if (productExits.amount + 1 > stock.amount) {
        toast.error('Quantidade solicitada fora de estoque');
        return;
      } else {
        newCart = cart.map((cartItem) => {
          if (cartItem.id === productId) {
            return {
              ...cartItem,
              amount: amount,
            };
          }
          return cartItem;
        });
      }
      setCart(newCart);
      localStorage.setItem('@RocketShoes:cart', JSON.stringify(newCart));
    } catch {
      toast.error('Erro na alteração de quantidade do produto');
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addProduct, removeProduct, updateProductAmount }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextData {
  const context = useContext(CartContext);

  return context;
}
