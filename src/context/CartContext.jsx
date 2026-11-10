
import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from 'react';

const CartContext = createContext(null);

const STORAGE_KEY = 'cartItems';
const MAX_QUANTITY = 10;

// Safely load cart data from localStorage.
const getInitialCart = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) return [];

        const parsed = JSON.parse(saved);

        if (!Array.isArray(parsed)) return [];

        return parsed.filter((item) => {
            return (
                item &&
                item.id !== undefined &&
                Number.isFinite(Number(item.price)) &&
                Number(item.price) >= 0 &&
                Number.isInteger(Number(item.quantity)) &&
                Number(item.quantity) > 0
            );
        }).map((item) => ({
            ...item,
            price: Number(item.price),
            quantity: Math.min(Number(item.quantity), MAX_QUANTITY),
        }));
    } catch (error) {
        console.error('Unable to load cart from localStorage:', error);
        return [];
    }
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(getInitialCart);

    // Persist cart whenever it changes.
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
        } catch (error) {
            console.error('Unable to save cart:', error);
        }
    }, [cartItems]);

    // Add a product or increase its existing quantity.
    const addToCart = useCallback((product, quantity = 1) => {
        if (!product || product.id === undefined) return;

        const requestedQuantity = Math.max(
            1,
            Math.floor(Number(quantity) || 1)
        );

        setCartItems((previousItems) => {
            const existingItem = previousItems.find(
                (item) => item.id === product.id
            );

            if (existingItem) {
                return previousItems.map((item) =>
                    item.id === product.id
                        ? {
                              ...item,
                              quantity: Math.min(
                                  item.quantity + requestedQuantity,
                                  MAX_QUANTITY
                              ),
                          }
                        : item
                );
            }

            return [
                ...previousItems,
                {
                    ...product,
                    quantity: Math.min(
                        requestedQuantity,
                        MAX_QUANTITY
                    ),
                },
            ];
        });
    }, []);

    // Remove a product completely.
    const removeFromCart = useCallback((productId) => {
        setCartItems((previousItems) =>
            previousItems.filter((item) => item.id !== productId)
        );
    }, []);

    // Update product quantity.
    const updateQuantity = useCallback((productId, quantity) => {
        const nextQuantity = Math.floor(Number(quantity));

        if (!Number.isFinite(nextQuantity)) return;

        if (nextQuantity <= 0) {
            setCartItems((previousItems) =>
                previousItems.filter((item) => item.id !== productId)
            );

            return;
        }

        const safeQuantity = Math.min(nextQuantity, MAX_QUANTITY);

        setCartItems((previousItems) =>
            previousItems.map((item) =>
                item.id === productId
                    ? { ...item, quantity: safeQuantity }
                    : item
            )
        );
    }, []);

    // Remove all products.
    const clearCart = useCallback(() => {
        setCartItems([]);
    }, []);

    // Calculate total price.
    const getCartTotal = useCallback(() => {
        return cartItems.reduce(
            (total, item) =>
                total + Number(item.price) * item.quantity,
            0
        );
    }, [cartItems]);

    // Calculate total number of individual units.
    const getCartItemsCount = useCallback(() => {
        return cartItems.reduce(
            (total, item) => total + item.quantity,
            0
        );
    }, [cartItems]);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                addToCart,
                removeFromCart,
                updateQuantity,
                clearCart,
                getCartTotal,
                getCartItemsCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);

    if (!context) {
        throw new Error('useCart must be used within a CartProvider');
    }

    return context;
};
