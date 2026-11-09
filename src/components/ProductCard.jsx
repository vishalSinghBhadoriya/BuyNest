import { useContext, memo } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { useToast } from './Toast';
import ProductImage from './ProductImage';
import { formatCategory } from '../config/brand';

const ProductCard = ({ product }) => {
    const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
    const { addToCart } = useCart();
    const { addToast } = useToast();

    const isFavorite = favorites.some((fav) => fav.id === product.id);

    const handleFavoriteToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (isFavorite) {
            removeFavorite(product.id);
            addToast('Removed from favorites', 'info');
        } else {
            addFavorite(product);
            addToast('Added to favorites', 'success');
        }
    };

    const handleAddToCart = (e) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart(product);
        addToast('Added to cart', 'success');
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating.rate);

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <svg key={i} className="w-3.5 h-3.5 text-caramel" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            );
        }

        return stars;
    };

    return (
        <div className="surface-card rounded-xl overflow-hidden flex flex-col h-full group">
            <div className="relative aspect-square bg-subtle flex items-center justify-center p-6 h-[300px]">
                <Link to={`/product/${product.id}`} className="w-full h-full flex items-center justify-center">
                    <ProductImage
                        src={product.image}
                        alt={product.title}
                        className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300"
                    />
                </Link>
                <button
                    type="button"
                    onClick={handleFavoriteToggle}
                    className="absolute top-3 right-3 p-2 rounded-full bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors"
                    aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
                >
                    {isFavorite ? (
                        <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                        </svg>
                    ) : (
                        <svg className="w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    )}
                </button>
            </div>

            <div className="p-4 flex-1 flex flex-col">
                <Link to={`/product/${product.id}`} className="flex-1">
                    <p className="text-xs text-muted mb-1">{formatCategory(product.category)}</p>
                    <h2 className="text-sm font-medium mb-2 line-clamp-2 text-[var(--text-primary)] group-hover:text-accent transition-colors">
                        {product.title}
                    </h2>
                </Link>

                <div className="flex items-center mb-3">
                    <div className="flex items-center gap-0.5">{renderStars(product.rating)}</div>
                    <span className="text-xs text-muted ml-2">({product.rating.count})</span>
                </div>

                <div className="flex items-center justify-between mt-auto pt-2 border-t border-[var(--border)]">
                    <span className="font-serif text-lg text-accent">${product.price.toFixed(2)}</span>
                    <button type="button" onClick={handleAddToCart} className="btn-primary text-xs py-2 px-3">
                        Add to cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default memo(ProductCard);
