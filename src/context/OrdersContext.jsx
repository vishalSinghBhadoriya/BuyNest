
import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
} from 'react';

const OrdersContext = createContext(null);

const STORAGE_KEY = 'buyNestOrders';

// Safely load previously placed orders.
const getInitialOrders = () => {
    try {
        const saved = localStorage.getItem(STORAGE_KEY);

        if (!saved) return [];

        const parsed = JSON.parse(saved);

        return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
        console.error('Unable to load order history:', error);
        return [];
    }
};

export const OrdersProvider = ({ children }) => {
    const [orders, setOrders] = useState(getInitialOrders);

    // Persist orders whenever the order history changes.
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
        } catch (error) {
            console.error('Unable to save order history:', error);
        }
    }, [orders]);

    // Create and save a new order.
    const placeOrder = useCallback((orderData) => {
        const orderId = `BN-${Date.now().toString(36).toUpperCase()}-${Math.random()
            .toString(36)
            .slice(2, 6)
            .toUpperCase()}`;

        const newOrder = {
            id: orderId,
            createdAt: new Date().toISOString(),
            status: 'Confirmed',
            customer: { ...orderData.customer },
            items: orderData.items.map((item) => ({ ...item })),
            subtotal: orderData.subtotal,
            tax: orderData.tax,
            shipping: orderData.shipping,
            total: orderData.total,
        };

        setOrders((previousOrders) => [
            newOrder,
            ...previousOrders,
        ]);

        return newOrder;
    }, []);

    // Find a specific order.
    const getOrderById = useCallback((orderId) => {
        return orders.find((order) => order.id === orderId) ?? null;
    }, [orders]);

    // Remove one order from history.
    const removeOrder = useCallback((orderId) => {
        setOrders((previousOrders) =>
            previousOrders.filter((order) => order.id !== orderId)
        );
    }, []);

    // Clear order history.
    const clearOrders = useCallback(() => {
        setOrders([]);
    }, []);

    return (
        <OrdersContext.Provider
            value={{
                orders,
                placeOrder,
                getOrderById,
                removeOrder,
                clearOrders,
            }}
        >
            {children}
        </OrdersContext.Provider>
    );
};

export const useOrders = () => {
    const context = useContext(OrdersContext);

    if (!context) {
        throw new Error('useOrders must be used within an OrdersProvider');
    }

    return context;
};
