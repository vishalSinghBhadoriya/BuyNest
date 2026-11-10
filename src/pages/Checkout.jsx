
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useCart } from '../context/CartContext';
import { formatCategory } from '../config/brand';

import CheckoutSteps from '../components/CheckoutSteps';
import DemoModal from '../components/DemoModal';
import Breadcrumb from '../components/Breadcrumb';
import ProductImage from '../components/ProductImage';

import { usePageMeta } from '../hooks/usePageMeta';
import { useOrders } from '../context/OrdersContext';



const TAX_RATE = 0.10;

const emptyShipping = {
    fullName: '',
    email: '',
    address: '',
    city: '',
    postalCode: '',
};

const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(Number(price) || 0);

const Checkout = () => {
    const navigate = useNavigate();

    const { cartItems, getCartTotal, clearCart } = useCart();
    const { placeOrder } = useOrders();

    const [step, setStep] = useState(1);
    const [shipping, setShipping] = useState(emptyShipping);
    const [orderConfirmation, setOrderConfirmation] = useState(null);
const [showModal, setShowModal] = useState(false);

    usePageMeta({
        title: 'Checkout',
        description: 'Complete your BuyNest demo checkout.',
    });

    const subtotal = getCartTotal();
    const tax = subtotal * TAX_RATE;
    const shippingCost = 0;
    const total = subtotal + tax + shippingCost;

    const itemCount = cartItems.reduce(
        (sum, item) => sum + item.quantity,
        0
    );

    // Redirect if the cart becomes empty.
useEffect(() => {
    if (cartItems.length === 0 && !orderConfirmation) {
        navigate('/cart', { replace: true });
    }
}, [cartItems.length, orderConfirmation, navigate]);

 if (cartItems.length === 0 && !orderConfirmation) {
    return null;
}

    const inputClass = 'input-field';

    const handleShippingChange = (event) => {
        const { name, value } = event.target;

        setShipping((previous) => ({
            ...previous,
            [name]: value,
        }));
    };

    const handleShippingSubmit = (event) => {
        event.preventDefault();

        if (!event.currentTarget.reportValidity()) {
            return;
        }

        setStep(2);
    };

const handleCompleteOrder = () => {
    if (cartItems.length === 0 || orderConfirmation) return;

    const order = placeOrder({
        customer: shipping,
        items: cartItems,
        subtotal,
        tax,
        shipping: shippingCost,
        total,
    });

    setOrderConfirmation({
        orderId: order.id,
        customerName: order.customer.fullName,
        total: order.total,
    });

    clearCart();
    setShowModal(true);
};
const handleCloseModal = () => {
    setShowModal(false);
    navigate('/', { replace: true });
};
    return (
        <div className="max-w-6xl mx-auto animate-fade-in">

            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: 'Shop', href: '/' },
                    { label: 'Cart', href: '/cart' },
                    { label: 'Checkout' },
                ]}
            />

            {/* Heading */}
            <div className="mb-9">
                <p className="label-caps mb-3">
                    Almost there
                </p>

                <h1 className="heading-display text-3xl md:text-4xl mb-3">
                    Checkout
                </h1>

                <p className="text-sm text-secondary">
                    {itemCount} {itemCount === 1 ? 'item' : 'items'}
                    {' · '}
                    {formatPrice(total)} total
                </p>
            </div>

            {/* Checkout progress */}
            <div className="mb-10">
                <CheckoutSteps currentStep={step} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main checkout section */}
                <div className="lg:col-span-2">

                    {/* STEP 1: SHIPPING */}
                    {step === 1 && (
                        <form
                            onSubmit={handleShippingSubmit}
                            className="surface-card rounded-2xl p-6 sm:p-8"
                        >
                            <div className="mb-7">
                                <p className="label-caps mb-2">
                                    Step 01
                                </p>

                                <h2 className="heading-display text-2xl">
                                    Shipping details
                                </h2>

                                <p className="text-sm text-muted mt-2">
                                    Where should we send your order?
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                                {/* Full name */}
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="fullName"
                                        className="block text-xs font-medium text-secondary mb-2"
                                    >
                                        Full name *
                                    </label>

                                    <input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        value={shipping.fullName}
                                        onChange={handleShippingChange}
                                        placeholder="Enter your full name"
                                        className={inputClass}
                                        autoComplete="name"
                                        minLength={2}
                                        maxLength={80}
                                        required
                                    />
                                </div>

                                {/* Email */}
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="email"
                                        className="block text-xs font-medium text-secondary mb-2"
                                    >
                                        Email address *
                                    </label>

                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        value={shipping.email}
                                        onChange={handleShippingChange}
                                        placeholder="you@example.com"
                                        className={inputClass}
                                        autoComplete="email"
                                        required
                                    />
                                </div>

                                {/* Address */}
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="address"
                                        className="block text-xs font-medium text-secondary mb-2"
                                    >
                                        Street address *
                                    </label>

                                    <input
                                        id="address"
                                        name="address"
                                        type="text"
                                        value={shipping.address}
                                        onChange={handleShippingChange}
                                        placeholder="Enter your street address"
                                        className={inputClass}
                                        autoComplete="street-address"
                                        minLength={5}
                                        maxLength={150}
                                        required
                                    />
                                </div>

                                {/* City */}
                                <div>
                                    <label
                                        htmlFor="city"
                                        className="block text-xs font-medium text-secondary mb-2"
                                    >
                                        City *
                                    </label>

                                    <input
                                        id="city"
                                        name="city"
                                        type="text"
                                        value={shipping.city}
                                        onChange={handleShippingChange}
                                        placeholder="Enter your city"
                                        className={inputClass}
                                        autoComplete="address-level2"
                                        required
                                    />
                                </div>

                                {/* Postal code */}
                                <div>
                                    <label
                                        htmlFor="postalCode"
                                        className="block text-xs font-medium text-secondary mb-2"
                                    >
                                        Postal code *
                                    </label>

                                    <input
                                        id="postalCode"
                                        name="postalCode"
                                        type="text"
                                        value={shipping.postalCode}
                                        onChange={handleShippingChange}
                                        placeholder="Enter postal code"
                                        className={inputClass}
                                        autoComplete="postal-code"
                                        minLength={3}
                                        maxLength={12}
                                        required
                                    />
                                </div>
                            </div>

                            <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 mt-9 pt-6 border-t border-[var(--border)]">
                                <Link
                                    to="/cart"
                                    className="btn-outline text-center"
                                >
                                    Back to cart
                                </Link>

                                <button
                                    type="submit"
                                    className="btn-primary"
                                >
                                    Continue to review →
                                </button>
                            </div>
                        </form>
                    )}

                    {/* STEP 2: ORDER REVIEW */}
                    {step === 2 && (
                        <div className="space-y-6">

                            {/* Products */}
                            <div className="surface-card rounded-2xl p-6 sm:p-8">
                                <div className="mb-7">
                                    <p className="label-caps mb-2">
                                        Step 02
                                    </p>

                                    <h2 className="heading-display text-2xl">
                                        Review your order
                                    </h2>

                                    <p className="text-sm text-muted mt-2">
                                        Make sure everything looks right.
                                    </p>
                                </div>

                                <div className="space-y-5">
                                    {cartItems.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex items-center gap-4 pb-5 border-b border-[var(--border)] last:border-0 last:pb-0"
                                        >
                                            <div className="w-16 h-16 bg-subtle rounded-xl flex items-center justify-center p-2 shrink-0">
                                                <ProductImage
                                                    src={item.image}
                                                    alt={item.title}
                                                    className="max-h-full max-w-full object-contain"
                                                />
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium line-clamp-2">
                                                    {item.title}
                                                </p>

                                                <p className="text-xs text-muted mt-1">
                                                    {formatCategory(item.category)}
                                                    {' · '}
                                                    Qty {item.quantity}
                                                </p>
                                            </div>

                                            <p className="text-sm font-semibold shrink-0">
                                                {formatPrice(item.price * item.quantity)}
                                            </p>
                                        </div>
                                    ))}
                                </div>

                                <Link
                                    to="/cart"
                                    className="inline-block text-xs text-secondary underline underline-offset-4 mt-6"
                                >
                                    Edit cart
                                </Link>
                            </div>

                            {/* Delivery address */}
                            <div className="surface-card rounded-2xl p-6 sm:p-8">
                                <div className="flex justify-between items-center mb-5">
                                    <div>
                                        <p className="label-caps mb-2">
                                            Delivery information
                                        </p>

                                        <h3 className="font-medium">
                                            Shipping address
                                        </h3>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="text-xs underline underline-offset-4 text-muted hover:text-[var(--text-primary)]"
                                    >
                                        Edit
                                    </button>
                                </div>

                                <div className="text-sm text-secondary leading-7">
                                    <p className="font-medium text-[var(--text-primary)]">
                                        {shipping.fullName}
                                    </p>

                                    <p>{shipping.address}</p>

                                    <p>
                                        {shipping.city}, {shipping.postalCode}
                                    </p>

                                    <p>{shipping.email}</p>
                                </div>
                            </div>

                            {/* Navigation */}
                            <div className="flex justify-between gap-3">
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    className="btn-outline"
                                >
                                    ← Back
                                </button>

                                <button
                                    type="button"
                                    onClick={() => setStep(3)}
                                    className="btn-primary"
                                >
                                    Continue to payment →
                                </button>
                            </div>
                        </div>
                    )}

                    {/* STEP 3: PAYMENT */}
                    {step === 3 && (
                        <div className="surface-card rounded-2xl p-6 sm:p-8">

                            <div className="mb-7">
                                <p className="label-caps mb-2">
                                    Step 03
                                </p>

                                <h2 className="heading-display text-2xl">
                                    Payment method
                                </h2>

                                <p className="text-sm text-muted mt-2">
                                    This is a demonstration checkout. No payment will be processed.
                                </p>
                            </div>

                            {/* Demo payment notice */}
                            <div className="bg-subtle border border-[var(--border)] rounded-xl p-5 mb-7">
                                <div className="flex gap-3">
                                    <div className="w-9 h-9 rounded-full border border-[var(--border)] flex items-center justify-center shrink-0">
                                        <span className="text-sm">i</span>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium mb-1">
                                            Demo payment experience
                                        </p>

                                        <p className="text-xs text-secondary leading-relaxed">
                                            Payment information below is illustrative only.
                                            No card information is collected, stored, or transmitted.
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-5">

                                <div>
                                    <label className="block text-xs font-medium text-secondary mb-2">
                                        Card number
                                    </label>

                                    <input
                                        type="text"
                                        placeholder="4242 4242 4242 4242"
                                        className={inputClass}
                                        readOnly
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-medium text-secondary mb-2">
                                            Expiry date
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="MM / YY"
                                            className={inputClass}
                                            readOnly
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-xs font-medium text-secondary mb-2">
                                            CVC
                                        </label>

                                        <input
                                            type="text"
                                            placeholder="123"
                                            className={inputClass}
                                            readOnly
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-col-reverse sm:flex-row justify-between gap-3 mt-9 pt-6 border-t border-[var(--border)]">
                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    className="btn-outline"
                                >
                                    ← Back
                                </button>

                                <button
                                    type="button"
                                    onClick={handleCompleteOrder}
                                    className="btn-primary"
                                >
                                    Complete demo order
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Order summary */}
                <aside className="lg:col-span-1">
                    <div className="surface-card rounded-2xl p-6 lg:sticky lg:top-28">
                        <p className="label-caps mb-2">
                            Your purchase
                        </p>

                        <h2 className="heading-display text-2xl mb-7">
                            Order summary
                        </h2>

                        <div className="space-y-4 text-sm">
                            <div className="flex justify-between gap-3 text-secondary">
                                <span>Subtotal</span>
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
                                <div className="flex justify-between items-center gap-3">
                                    <span className="font-medium">
                                        Total
                                    </span>

                                    <span className="text-xl font-semibold">
                                        {formatPrice(total)}
                                    </span>
                                </div>

                                <p className="text-xs text-muted mt-2">
                                    Taxes are estimated for this demo.
                                </p>
                            </div>
                        </div>

                        <div className="mt-7 pt-5 border-t border-[var(--border)]">
                            <p className="text-xs text-muted leading-relaxed">
                                By continuing, you acknowledge that this is a frontend demonstration and no real order or payment will be created.
                            </p>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Demo order modal */}
<DemoModal
    isOpen={showModal}
    onClose={handleCloseModal}
    title="Your demo order is confirmed!"
    message={
        orderConfirmation
            ? `Thank you, ${orderConfirmation.customerName}! Your demo order ${orderConfirmation.orderId} has been successfully created with a total of $${orderConfirmation.total.toFixed(2)}. This is a frontend demonstration only. No payment was processed and no real order was placed.`
            : undefined
    }
/>
        </div>
    );
};

export default Checkout;
