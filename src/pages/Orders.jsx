
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useOrders } from '../context/OrdersContext';
import ProductImage from '../components/ProductImage';
import { formatCategory } from '../config/brand';
import { usePageMeta } from '../hooks/usePageMeta';

const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(Number(price) || 0);

const formatDate = (date) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return 'Date unavailable';
    }

    return new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
        timeStyle: 'short',
    }).format(parsedDate);
};

const Orders = () => {
    const { orders = [], removeOrder } = useOrders();

    const [expandedOrder, setExpandedOrder] = useState(null);
    const [orderToRemove, setOrderToRemove] = useState(null);

    usePageMeta({
        title: 'My Orders',
        description: 'View your previous BuyNest demo orders.',
    });

    useEffect(() => {
        if (!orderToRemove) return;

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setOrderToRemove(null);
            }
        };

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [orderToRemove]);

    const toggleOrder = (orderId) => {
        setExpandedOrder((current) =>
            current === orderId ? null : orderId
        );
    };

    const handleRemoveOrder = () => {
        if (!orderToRemove) return;

        removeOrder(orderToRemove);

        if (expandedOrder === orderToRemove) {
            setExpandedOrder(null);
        }

        setOrderToRemove(null);
    };

    const totalSpent = orders.reduce(
        (sum, order) => sum + Number(order.total || 0),
        0
    );

    const totalItems = orders.reduce(
        (sum, order) =>
            sum +
            (Array.isArray(order.items)
                ? order.items.reduce(
                    (itemSum, item) =>
                        itemSum + Number(item.quantity || 0),
                    0
                )
                : 0),
        0
    );

    return (
        <div className="max-w-6xl mx-auto animate-fade-in">
            {/* Header */}
            <div className="mb-10">
                <p className="label-caps mb-3">
                    Your purchases
                </p>

                <h1 className="heading-display text-3xl md:text-4xl mb-3">
                    Order history
                </h1>

                <p className="text-sm text-secondary">
                    Keep track of your previous purchases.
                </p>
            </div>

            {/* Order Statistics */}
            {orders.length > 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
                    <div className="surface-card rounded-xl p-5">
                        <p className="text-xs text-muted mb-2">
                            Total orders
                        </p>
                        <p className="text-2xl font-semibold">
                            {orders.length}
                        </p>
                    </div>

                    <div className="surface-card rounded-xl p-5">
                        <p className="text-xs text-muted mb-2">
                            Items purchased
                        </p>
                        <p className="text-2xl font-semibold">
                            {totalItems}
                        </p>
                    </div>

                    <div className="surface-card rounded-xl p-5">
                        <p className="text-xs text-muted mb-2">
                            Total order value
                        </p>
                        <p className="text-2xl font-semibold">
                            {formatPrice(totalSpent)}
                        </p>
                    </div>
                </div>
            )}

            {/* Empty State */}
            {orders.length === 0 ? (
                <div className="surface-card rounded-2xl text-center py-16 px-6">
                    <div className="w-16 h-16 rounded-full bg-subtle mx-auto mb-6 flex items-center justify-center">
                        <svg
                            className="w-7 h-7 text-muted"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7 4h10l2 4v12H5V8l2-4Zm-2 4h14M9 12h6"
                            />
                        </svg>
                    </div>

                    <h2 className="heading-display text-2xl mb-3">
                        No orders yet
                    </h2>

                    <p className="text-sm text-secondary mb-8 max-w-sm mx-auto">
                        Your completed demo orders will appear here.
                        Start exploring our collection.
                    </p>

                    <Link to="/" className="btn-primary inline-flex">
                        Start shopping
                    </Link>
                </div>
            ) : (
                <div className="space-y-5">
                    {orders.map((order) => {
                        const isExpanded = expandedOrder === order.id;
                        const items = Array.isArray(order.items)
                            ? order.items
                            : [];
                        const customer = order.customer || {};

                        return (
                            <article
                                key={order.id}
                                className="surface-card rounded-2xl overflow-hidden"
                            >
                                {/* Order Header */}
                                <div className="p-5 sm:p-6">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 flex-1">
                                            <div>
                                                <p className="text-xs text-muted mb-2">
                                                    Order ID
                                                </p>
                                                <p className="text-sm font-semibold break-all">
                                                    {order.id}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-muted mb-2">
                                                    Order date
                                                </p>
                                                <p className="text-sm font-medium">
                                                    {formatDate(order.createdAt)}
                                                </p>
                                            </div>

                                            <div className="col-span-2 sm:col-span-1">
                                                <p className="text-xs text-muted mb-2">
                                                    Status
                                                </p>
                                                <span className="inline-flex items-center gap-2 text-xs font-medium">
                                                    <span className="w-2 h-2 rounded-full bg-[var(--text-primary)]" />
                                                    {order.status || 'Confirmed'}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between md:justify-end gap-5">
                                            <div>
                                                <p className="text-xs text-muted mb-1">
                                                    Order total
                                                </p>
                                                <p className="text-lg font-semibold">
                                                    {formatPrice(order.total)}
                                                </p>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => toggleOrder(order.id)}
                                                className="btn-outline text-sm"
                                                aria-expanded={isExpanded}
                                                aria-controls={`order-details-${order.id}`}
                                            >
                                                {isExpanded ? 'Hide details' : 'View details'}
                                                <span className="ml-2" aria-hidden="true">
                                                    {isExpanded ? '↑' : '↓'}
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Expanded Details */}
                                {isExpanded && (
                                    <div
                                        id={`order-details-${order.id}`}
                                        className="border-t border-[var(--border)] p-5 sm:p-6 bg-subtle"
                                    >
                                        <h3 className="text-sm font-semibold mb-5">
                                            Purchased products
                                        </h3>

                                        <div className="space-y-4">
                                            {items.map((item, index) => (
                                                <div
                                                    key={`${item.id}-${index}`}
                                                    className="flex items-center gap-4"
                                                >
                                                    <div className="w-16 h-16 rounded-lg bg-[var(--surface)] flex items-center justify-center p-2 shrink-0">
                                                        <ProductImage
                                                            src={item.image}
                                                            alt={item.title || 'Product'}
                                                            className="max-h-full max-w-full object-contain"
                                                        />
                                                    </div>

                                                    <div className="flex-1 min-w-0">
                                                        <p className="text-sm font-medium line-clamp-2">
                                                            {item.title || 'Product'}
                                                        </p>

                                                        <p className="text-xs text-muted mt-1">
                                                            {formatCategory(item.category || '')}
                                                            {' · '}
                                                            Qty {item.quantity || 0}
                                                        </p>
                                                    </div>

                                                    <p className="text-sm font-semibold shrink-0">
                                                        {formatPrice(
                                                            Number(item.price || 0) *
                                                            Number(item.quantity || 0)
                                                        )}
                                                    </p>
                                                </div>
                                            ))}
                                        </div>

                                        {/* Customer and Payment Details */}
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8 pt-6 border-t border-[var(--border)]">
                                            <div>
                                                <h3 className="text-sm font-semibold mb-3">
                                                    Delivery details
                                                </h3>

                                                <div className="text-xs text-secondary leading-6">
                                                    <p>{customer.fullName || 'Not available'}</p>
                                                    <p>{customer.address || 'Not available'}</p>
                                                    <p>
                                                        {[customer.city, customer.postalCode]
                                                            .filter(Boolean)
                                                            .join(', ') || 'Not available'}
                                                    </p>
                                                    <p>{customer.email || 'Not available'}</p>
                                                </div>
                                            </div>

                                            <div>
                                                <h3 className="text-sm font-semibold mb-3">
                                                    Payment summary
                                                </h3>

                                                <div className="space-y-2 text-xs">
                                                    <div className="flex justify-between text-secondary">
                                                        <span>Subtotal</span>
                                                        <span>{formatPrice(order.subtotal)}</span>
                                                    </div>

                                                    <div className="flex justify-between text-secondary">
                                                        <span>Shipping</span>
                                                        <span>Free</span>
                                                    </div>

                                                    <div className="flex justify-between text-secondary">
                                                        <span>Tax</span>
                                                        <span>{formatPrice(order.tax)}</span>
                                                    </div>

                                                    <div className="flex justify-between font-semibold pt-3 border-t border-[var(--border)]">
                                                        <span>Total</span>
                                                        <span>{formatPrice(order.total)}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Remove Order */}
                                        <div className="flex justify-end mt-6 pt-5 border-t border-[var(--border)]">
                                            <button
                                                type="button"
                                                onClick={() => setOrderToRemove(order.id)}
                                                className="text-xs text-muted hover:text-[var(--text-primary)] underline underline-offset-4"
                                            >
                                                Remove from history
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </article>
                        );
                    })}
                </div>
            )}

            {/* Remove Confirmation */}
            {orderToRemove && (
                <div
                    className="fixed inset-0 z-[90] flex items-center justify-center p-4"
                    role="presentation"
                >
                    <button
                        type="button"
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setOrderToRemove(null)}
                        aria-label="Cancel removal"
                    />

                    <div
                        className="relative surface-card rounded-2xl p-7 max-w-sm w-full"
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="remove-order-title"
                    >
                        <h2
                            id="remove-order-title"
                            className="heading-display text-xl mb-3"
                        >
                            Remove this order?
                        </h2>

                        <p className="text-sm text-secondary mb-7">
                            This will remove the order from your local order history.
                            This action cannot be undone.
                        </p>

                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => setOrderToRemove(null)}
                                className="btn-outline flex-1"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleRemoveOrder}
                                className="btn-primary flex-1"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;
