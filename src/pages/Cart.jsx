
import { useState } from 'react';
import { Link } from 'react-router-dom';

import { useCart } from '../context/CartContext';
import { formatCategory } from '../config/brand';

import ContactCTA from '../components/ContactCTA';
import ProductImage from '../components/ProductImage';

import { usePageMeta } from '../hooks/usePageMeta';

const MAX_QUANTITY = 10;
const TAX_RATE = 0.10;

const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(Number(price) || 0);

const Cart = () => {
    usePageMeta({
        title: 'Shopping Cart',
        description: 'Review your selected BuyNest products before checkout.',
    });

    const {
        cartItems,
        removeFromCart,
        updateQuantity,
        getCartTotal,
        clearCart,
    } = useCart();

    const [showClearConfirmation, setShowClearConfirmation] =
        useState(false);

    const subtotal = getCartTotal();
    const tax = subtotal * TAX_RATE;
    const shipping = 0;
    const total = subtotal + tax + shipping;

    const itemCount = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    const handleQuantityChange = (item, change) => {
        const nextQuantity = item.quantity + change;

        if (nextQuantity < 1 || nextQuantity > MAX_QUANTITY) {
            return;
        }

        updateQuantity(item.id, nextQuantity);
    };

    const handleClearCart = () => {
        clearCart();
        setShowClearConfirmation(false);
    };

    if (cartItems.length === 0) {
        return (
            <div className="max-w-lg mx-auto text-center py-20 animate-fade-in">
                <div className="surface-card rounded-2xl p-10 sm:p-12">
                    <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-subtle flex items-center justify-center">
                        <svg
                            className="w-7 h-7 text-muted"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M3 3h2l2.4 12h11.2l2-8H5.4M9 20h.01M18 20h.01"
                            />
                        </svg>
                    </div>

                    <p className="label-caps mb-3">
                        Your collection awaits
                    </p>

                    <h1 className="heading-display text-3xl mb-3">
                        Your cart is empty
                    </h1>

                    <p className="text-sm text-secondary leading-relaxed mb-8">
                        Looks like you haven't added anything yet.
                        Explore our collection and find something you love.
                    </p>

                    <Link
                        to="/"
                        className="btn-primary inline-flex justify-center"
                    >
                        Explore collection
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto animate-fade-in">

            {/* Page heading */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-10">
                <div>
                    <p className="label-caps mb-3">
                        Your selection
                    </p>

                    <h1 className="heading-display text-3xl md:text-4xl">
                        Shopping cart
                    </h1>

                    <p className="text-sm text-muted mt-2">
                        {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
                    </p>
                </div>

                <button
                    type="button"
                    onClick={() => setShowClearConfirmation(true)}
                    className="text-sm text-muted hover:text-[var(--text-primary)] underline underline-offset-4 transition-colors self-start sm:self-auto"
                >
                    Clear cart
                </button>
            </div>

            {/* Clear cart confirmation */}
            {showClearConfirmation && (
                <div
                    className="surface-card rounded-xl p-5 mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                    role="alert"
                >
                    <div>
                        <p className="text-sm font-medium">
                            Clear your entire cart?
                        </p>

                        <p className="text-xs text-muted mt-1">
                            This will remove all selected products.
                        </p>
                    </div>

                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={() => setShowClearConfirmation(false)}
                            className="btn-outline text-sm"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            onClick={handleClearCart}
                            className="btn-primary text-sm"
                        >
                            Yes, clear cart
                        </button>
                    </div>
                </div>
            )}

            {/* Cart content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Cart items */}
                <div className="lg:col-span-2 space-y-4">
                    {cartItems.map((item) => (
                        <article
                            key={item.id}
                            className="surface-card rounded-2xl p-4 sm:p-5"
                        >
                            <div className="flex flex-col sm:flex-row gap-4">

                                {/* Product image */}
                                <Link
                                    to={`/product/${item.id}`}
                                    className="w-full sm:w-28 h-44 sm:h-28 shrink-0 bg-subtle rounded-xl flex items-center justify-center p-4"
                                    aria-label={`View ${item.title}`}
                                >
                                    <ProductImage
                                        src={item.image}
                                        alt={item.title}
                                        className="max-h-full max-w-full object-contain"
                                    />
                                </Link>

                                {/* Product details */}
                                <div className="flex-1 min-w-0 flex flex-col justify-between gap-4">
                                    <div>
                                        <div className="flex justify-between gap-3">
                                            <div className="min-w-0">
                                                <p className="text-xs text-muted uppercase tracking-wider mb-2">
                                                    {formatCategory(item.category)}
                                                </p>

                                                <Link
                                                    to={`/product/${item.id}`}
                                                    className="font-medium text-sm leading-relaxed hover:opacity-60 transition-opacity line-clamp-2"
                                                >
                                                    {item.title}
                                                </Link>
                                            </div>

                                            <button
                                                type="button"
                                                onClick={() => removeFromCart(item.id)}
                                                className="shrink-0 w-9 h-9 rounded-full hover:bg-subtle flex items-center justify-center text-muted hover:text-[var(--text-primary)] transition-colors"
                                                aria-label={`Remove ${item.title} from cart`}
                                            >
                                                <svg
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                    aria-hidden="true"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.7}
                                                        d="M6 7h12m-10 0 1 13h6l1-13M10 7V4h4v3"
                                                    />
                                                </svg>
                                            </button>
                                        </div>

                                        <p className="text-sm font-semibold mt-3">
                                            {formatPrice(item.price)}
                                        </p>
                                    </div>

                                    {/* Quantity and item subtotal */}
                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                        <div className="flex items-center border border-[var(--border)] rounded-full p-1">
                                            <button
                                                type="button"
                                                onClick={() => handleQuantityChange(item, -1)}
                                                disabled={item.quantity <= 1}
                                                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-subtle disabled:opacity-30 disabled:cursor-not-allowed transition"
                                                aria-label="Decrease quantity"
                                            >
                                                −
                                            </button>

                                            <span
                                                className="w-9 text-center text-sm font-medium"
                                                aria-live="polite"
                                            >
                                                {item.quantity}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() => handleQuantityChange(item, 1)}
                                                disabled={item.quantity >= MAX_QUANTITY}
                                                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-subtle disabled:opacity-30 disabled:cursor-not-allowed transition"
                                                aria-label="Increase quantity"
                                            >
                                                +
                                            </button>
                                        </div>

                                        <div className="text-right">
                                            <p className="text-xs text-muted mb-1">
                                                Item total
                                            </p>

                                            <p className="font-semibold text-sm">
                                                {formatPrice(item.price * item.quantity)}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </article>
                    ))}

                    <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm text-secondary hover:text-[var(--text-primary)] transition-colors pt-3"
                    >
                        <span aria-hidden="true">←</span>
                        Continue shopping
                    </Link>
                </div>

                {/* Order summary */}
                <aside className="lg:col-span-1">
                    <div className="surface-card rounded-2xl p-6 lg:sticky lg:top-28">
                        <p className="label-caps mb-2">
                            Payment details
                        </p>

                        <h2 className="heading-display text-2xl mb-7">
                            Order summary
                        </h2>

                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between gap-3 text-secondary">
                                <span>Subtotal ({itemCount} items)</span>
                                <span>{formatPrice(subtotal)}</span>
                            </div>

                            <div className="flex justify-between gap-3 text-secondary">
                                <span>Shipping</span>
                                <span className="text-[var(--text-primary)]">
                                    Free
                                </span>
                            </div>

                            <div className="flex justify-between gap-3 text-secondary">
                                <span>Estimated tax (10%)</span>
                                <span>{formatPrice(tax)}</span>
                            </div>

                            <div className="border-t border-[var(--border)] pt-5 mt-5">
                                <div className="flex justify-between gap-3 items-center">
                                    <span className="font-medium">
                                        Total
                                    </span>

                                    <span className="text-2xl font-semibold">
                                        {formatPrice(total)}
                                    </span>
                                </div>

                                <p className="text-xs text-muted mt-2">
                                    Taxes are estimated for this demo.
                                </p>
                            </div>
                        </div>

                        <Link
                            to="/checkout"
                            className="btn-primary flex items-center justify-center w-full py-4 mt-7"
                        >
                            Proceed to checkout
                            <span className="ml-2" aria-hidden="true">
                                →
                            </span>
                        </Link>

                        <div className="mt-5 pt-5 border-t border-[var(--border)]">
                            <div className="flex items-center justify-center gap-2 text-xs text-muted">
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6l-7-3Z"
                                    />
                                </svg>

                                Secure checkout demo
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Contact CTA */}
            <div className="mt-16">
                <ContactCTA variant="compact" />
            </div>
        </div>
    );
};

export default Cart;
