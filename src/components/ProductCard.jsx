
import { useContext, memo } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { useToast } from './Toast';
import ProductImage from './ProductImage';
import { formatCategory } from '../config/brand';

const ProductCard = ({ product }) => {
    const { favorites, addFavorite, removeFavorite } =
        useContext(FavoritesContext);

    const { addToCart } = useCart();
    const { addToast } = useToast();

    const isFavorite = favorites.some(
        (fav) => fav.id === product.id
    );

    const rating = product.rating?.rate ?? 0;
    const reviewCount = product.rating?.count ?? 0;

    const handleFavoriteToggle = () => {
        if (isFavorite) {
            removeFavorite(product.id);
            addToast('Removed from favorites', 'info');
        } else {
            addFavorite(product);
            addToast('Added to favorites', 'success');
        }
    };

    const handleAddToCart = () => {
        addToCart(product);
        addToast('Added to cart', 'success');
    };

    return (
        <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

            {/* Product image */}
            <div className="relative flex h-[280px] items-center justify-center overflow-hidden bg-[var(--surface-muted)] p-8">

                <Link
                    to={`/product/${product.id}`}
                    className="flex h-full w-full items-center justify-center"
                    aria-label={`View ${product.title}`}
                >
                    <ProductImage
                        src={product.image}
                        alt={product.title}
                        className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                </Link>

                {/* Wishlist */}
                <button
                    type="button"
                    onClick={handleFavoriteToggle}
                    aria-label={
                        isFavorite
                            ? 'Remove from favorites'
                            : 'Add to favorites'
                    }
                    aria-pressed={isFavorite}
                    className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-[var(--surface)] shadow-md transition-all hover:scale-110"
                >
                    <svg
                        className={`h-5 w-5 ${
                            isFavorite
                                ? 'fill-red-500 text-red-500'
                                : 'fill-none text-[var(--text-primary)]'
                        }`}
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 00-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 00-.1-7.8z"
                        />
                    </svg>
                </button>

                {/* Category label */}
                <span className="absolute bottom-4 left-4 rounded-full bg-[var(--surface)] px-3 py-1 text-xs font-medium shadow-sm">
                    {formatCategory(product.category)}
                </span>
            </div>

            {/* Product details */}
            <div className="flex flex-1 flex-col p-4">

                <Link to={`/product/${product.id}`}>
                    <h3 className="mb-2 line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-[var(--text-primary)] transition-colors hover:text-accent">
                        {product.title}
                    </h3>
                </Link>

                {/* Rating */}
                <div className="mb-4 flex items-center gap-2">
                    <span className="text-sm tracking-wide text-[var(--color-caramel)]">
                        ★★★★★
                    </span>

                    <span className="text-xs text-muted">
                        {rating.toFixed(1)} ({reviewCount})
                    </span>
                </div>

                {/* Price and cart */}
                <div className="mt-auto flex items-center justify-between border-t border-[var(--border)] pt-4">
                    <div>
                        <span className="block text-xs text-muted">
                            Price
                        </span>

                        <span className="text-xl font-semibold tracking-tight text-accent">
                            ${product.price.toFixed(2)}
                        </span>
                    </div>

                    <button
                        type="button"
                        onClick={handleAddToCart}
                        className="rounded-full bg-[var(--accent)] px-4 py-2.5 text-xs font-semibold text-[var(--on-accent)] transition-all hover:opacity-80 active:scale-95"
                    >
                        + Add
                    </button>
                </div>
            </div>
        </article>
    );
};

export default memo(ProductCard);
