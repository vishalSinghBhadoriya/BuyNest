import { useEffect, useState, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';

import {
    getProductById,
    getRelatedProducts,
} from '../api/productService';

import { FavoritesContext } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';

import { formatCategory } from '../config/brand';

import Loader from '../components/Loader';
import Breadcrumb from '../components/Breadcrumb';
import ContactCTA from '../components/ContactCTA';
import ProductCard from '../components/ProductCard';
import ProductImage from '../components/ProductImage';

import { useToast } from '../components/Toast';
import { usePageMeta } from '../hooks/usePageMeta';

const MAX_QUANTITY = 10;

const formatPrice = (price) =>
    new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    }).format(Number(price) || 0);

const ProductDetail = () => {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [related, setRelated] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [quantity, setQuantity] = useState(1);

    const { favorites, addFavorite, removeFavorite } =
        useContext(FavoritesContext);

    const { addToCart } = useCart();
    const { addToast } = useToast();

    const isFavorite = favorites.some(
        (item) => item.id === product?.id
    );

    const rating = Number(product?.rating?.rate) || 0;
    const reviewCount = Number(product?.rating?.count) || 0;
    const price = Number(product?.price) || 0;
    const subtotal = price * quantity;

    usePageMeta({
        title: product?.title || 'Product Details',
        description: product?.description?.slice(0, 155),
    });

    // Fetch product whenever the URL ID changes.
    useEffect(() => {
        let isMounted = true;

        const fetchProduct = async () => {
            setLoading(true);
            setError(false);
            setProduct(null);
            setRelated([]);
            setQuantity(1);

            try {
                const data = await getProductById(id);

                if (!isMounted) return;

                setProduct(data);

                if (data) {
                    const relatedProducts = getRelatedProducts(
                        data.id,
                        data.category
                    );

                    setRelated(relatedProducts);
                }
            } catch (err) {
                console.error('Unable to load product:', err);

                if (isMounted) {
                    setError(true);
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchProduct();

        return () => {
            isMounted = false;
        };
    }, [id]);

    const handleQuantityChange = (value) => {
        setQuantity((current) => {
            return Math.min(
                MAX_QUANTITY,
                Math.max(1, current + value)
            );
        });
    };

    const handleAddToCart = () => {
        if (!product) return;

        addToCart(product, quantity);
        addToast(`${quantity} item(s) added to cart`, 'success');
    };

    const handleFavoriteToggle = () => {
        if (!product) return;

        if (isFavorite) {
            removeFavorite(product.id);
            addToast('Removed from favorites', 'success');
        } else {
            addFavorite(product);
            addToast('Added to favorites', 'success');
        }
    };

    const renderStars = (value) => {
        const roundedRating = Math.round(value);

        return (
            <div
                className="flex items-center gap-1"
                aria-label={`${value} out of 5 stars`}
            >
                {[1, 2, 3, 4, 5].map((star) => (
                    <span
                        key={star}
                        className={`text-lg ${
                            star <= roundedRating
                                ? 'text-[var(--text-primary)]'
                                : 'text-[var(--border)]'
                        }`}
                        aria-hidden="true"
                    >
                        ★
                    </span>
                ))}
            </div>
        );
    };

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className="max-w-lg mx-auto py-20 text-center">
                <div className="surface-card rounded-2xl p-10">
                    <h2 className="heading-display text-2xl mb-3">
                        Something went wrong
                    </h2>

                    <p className="text-secondary text-sm mb-6">
                        We couldn't load this product. Please try again.
                    </p>

                    <Link to="/" className="btn-primary inline-flex">
                        Back to shop
                    </Link>
                </div>
            </div>
        );
    }

    if (!product) {
        return (
            <div className="max-w-lg mx-auto py-20 text-center">
                <div className="surface-card rounded-2xl p-10">
                    <p className="label-caps mb-4">404 · Not found</p>

                    <h2 className="heading-display text-3xl mb-3">
                        Product not found
                    </h2>

                    <p className="text-secondary text-sm mb-8">
                        This item may have been removed or the link is incorrect.
                    </p>

                    <Link to="/" className="btn-primary inline-flex">
                        Back to shop
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto animate-fade-in">

            {/* Breadcrumb */}
            <Breadcrumb
                items={[
                    { label: 'Shop', href: '/' },
                    {
                        label: formatCategory(product.category),
                        href: '/#catalog',
                    },
                    { label: product.title },
                ]}
            />

            {/* Main product section */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">

                {/* Product image */}
                <div className="relative">
                    <div className="surface-card rounded-2xl overflow-hidden">
                        <div className="aspect-square bg-subtle flex items-center justify-center p-8 sm:p-12">
                            <ProductImage
                                src={product.image}
                                alt={product.title}
                                eager
                                className="max-h-full max-w-full object-contain"
                            />
                        </div>
                    </div>

                    <span className="absolute top-4 left-4 bg-[var(--surface)] border border-[var(--border)] rounded-full px-4 py-2 text-xs uppercase tracking-wider">
                        {formatCategory(product.category)}
                    </span>
                </div>

                {/* Product information */}
                <div className="flex flex-col">

                    <p className="label-caps mb-4">
                        BuyNest Collection
                    </p>

                    <h1 className="heading-display text-3xl md:text-4xl lg:text-5xl leading-tight mb-5">
                        {product.title}
                    </h1>

                    {/* Rating */}
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        {renderStars(rating)}

                        <span className="text-sm text-secondary">
                            {rating.toFixed(1)} / 5
                        </span>

                        <span className="text-sm text-muted">
                            ({reviewCount} reviews)
                        </span>
                    </div>

                    {/* Price */}
                    <div className="border-y border-[var(--border)] py-5 mb-6">
                        <p className="text-xs uppercase tracking-wider text-muted mb-2">
                            Price
                        </p>

                        <p className="text-3xl font-semibold tracking-tight">
                            {formatPrice(price)}
                        </p>
                    </div>

                    {/* Description */}
                    <div className="mb-8">
                        <h2 className="text-sm font-semibold mb-3">
                            Product description
                        </h2>

                        <p className="text-sm text-secondary leading-7">
                            {product.description}
                        </p>
                    </div>

                    {/* Quantity selector */}
                    <div className="mb-8">
                        <p className="text-sm font-medium mb-3">
                            Quantity
                        </p>

                        <div className="flex items-center gap-4">
                            <div className="flex items-center border border-[var(--border)] rounded-full p-1">
                                <button
                                    type="button"
                                    onClick={() => handleQuantityChange(-1)}
                                    disabled={quantity <= 1}
                                    className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-subtle disabled:opacity-40 disabled:cursor-not-allowed transition"
                                    aria-label="Decrease quantity"
                                >
                                    −
                                </button>

                                <span
                                    className="w-10 text-center text-sm font-medium"
                                    aria-live="polite"
                                >
                                    {quantity}
                                </span>

                                <button
                                    type="button"
                                    onClick={() => handleQuantityChange(1)}
                                    disabled={quantity >= MAX_QUANTITY}
                                    className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-subtle disabled:opacity-40 disabled:cursor-not-allowed transition"
                                    aria-label="Increase quantity"
                                >
                                    +
                                </button>
                            </div>

                            <span className="text-xs text-muted">
                                Maximum {MAX_QUANTITY} items
                            </span>
                        </div>
                    </div>

                    {/* Subtotal */}
                    <div className="flex items-center justify-between border-t border-[var(--border)] pt-5 mb-6">
                        <span className="text-sm text-secondary">
                            Subtotal
                        </span>

                        <span className="text-lg font-semibold">
                            {formatPrice(subtotal)}
                        </span>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button
                            type="button"
                            onClick={handleAddToCart}
                            className="btn-primary flex-1 py-4"
                        >
                            Add to cart
                        </button>

                        <button
                            type="button"
                            onClick={handleFavoriteToggle}
                            aria-pressed={isFavorite}
                            className="btn-outline flex-1 py-4"
                        >
                            {isFavorite ? '♥ Saved' : '♡ Save item'}
                        </button>
                    </div>

                    {/* Demo information */}
                    <div className="mt-8 grid grid-cols-2 gap-4">
                        <div className="bg-subtle rounded-xl p-4">
                            <p className="text-sm font-medium mb-1">
                                Free shipping
                            </p>

                            <p className="text-xs text-muted">
                                Included in this demo
                            </p>
                        </div>

                        <div className="bg-subtle rounded-xl p-4">
                            <p className="text-sm font-medium mb-1">
                                Secure checkout
                            </p>

                            <p className="text-xs text-muted">
                                Demo checkout experience
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Related products */}
            {related.length > 0 && (
                <section className="mt-20">
                    <div className="flex items-end justify-between gap-4 mb-8">
                        <div>
                            <p className="label-caps mb-2">
                                More to discover
                            </p>

                            <h2 className="heading-display text-3xl">
                                Related pieces
                            </h2>
                        </div>

                        <Link
                            to="/"
                            className="text-sm underline underline-offset-4 hover:opacity-60 transition"
                        >
                            View all products
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {related.map((item) => (
                            <ProductCard
                                key={item.id}
                                product={item}
                            />
                        ))}
                    </div>
                </section>
            )}

            {/* Contact CTA */}
            <div className="mt-20">
                <ContactCTA />
            </div>
        </div>
    );
};

export default ProductDetail;