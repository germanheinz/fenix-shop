import type { CartProduct } from "@/interfaces/poduct.interface";
import { persist } from "zustand/middleware";
import { create } from "zustand/react";

interface State {
    cart: CartProduct[],

    getTotalItems:    () => number;
    addProductToCart: ( product: CartProduct ) => void;
    updateProductQuantity: ( product: CartProduct, quantity: number ) => void;
    removeProductFromCart: ( product: CartProduct ) => void;
}



export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, product) => total + product.quantity, 0);
      },

      addProductToCart: (product: CartProduct) => {
        
        // get all products in cart - zustand get()
        const { cart } = get();

        const productExitsInCart = cart.some(
          (item) => item.id === product.id && item.size === product.size
        );

        if (!productExitsInCart) return set({ cart: [...cart, product] });

        const updatedCart = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity: item.quantity + product.quantity,
            };
          }
          console.log('item', item);
          return item;
        });
        set({ cart: updatedCart });
      },
      
      updateProductQuantity: (product: CartProduct, quantity: number) => {
        
        // get all products in cart - zustand get()
        const { cart } = get();
        
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id && item.size === product.size) {
            return {
              ...item,
              quantity,
            };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },

      removeProductFromCart: (product: CartProduct) => {

        // get all products in cart - zustand get()
        const { cart } = get();
        const updatedCartProducts = cart.filter(
          (item) => !(item.id === product.id && item.size === product.size)
        );
        set({ cart: updatedCartProducts });
      },
      
    
    }),
    
    {
      name: "cart-storage", // unique name
    }
  )
);