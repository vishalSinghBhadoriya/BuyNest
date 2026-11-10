
import { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { FavoritesContext } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { brand } from '../config/brand';

const Navbar = () => {
    const { favorites } = useContext(FavoritesContext);
    const { getCartItemsCount } = useCart();
    const { isDark, toggleTheme } = useTheme();

    const [menuOpen, setMenuOpen] = useState(false);
    const location = useLocation();

    const cartCount = getCartItemsCount();
    const favoriteCount = favorites.length;

    useEffect(() => {
        setMenuOpen(false);
    }, [location.pathname]);

    useEffect(() => {
        if (!menuOpen) return;

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                setMenuOpen(false);
            }
        };

        document.addEventListener('keydown', handleEscape);

        return () => {
            document.removeEventListener('keydown', handleEscape);
        };
    }, [menuOpen]);

    const navLinks = [
        { to: '/', label: 'Shop', match: () => location.pathname === '/' || location.pathname.startsWith('/product/') },
        { to: '/about', label: 'About' },
        { to: '/favorites', label: 'Favorites', badge: favoriteCount },
        { to: '/orders', label: 'Orders', match: () => location.pathname.startsWith('/orders') },
    ];

    const isActive = (link) =>
        link.match ? link.match() : location.pathname === link.to;

    const IconButton = ({ label, onClick, children }) => (
        <button
            type="button"
            onClick={onClick}
            aria-label={label}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-primary)] transition hover:bg-[var(--surface-muted)]"
        >
            {children}
        </button>
    );

    return (
        <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--bg-page)]/95 backdrop-blur-xl">
            <nav
                className="container mx-auto flex h-[76px] items-center justify-between px-4 sm:px-6 lg:px-8"
                aria-label="Main navigation"
            >
                {/* Logo */}
                <Link
                    to="/"
                    className="group flex items-center gap-2"
                    aria-label="BuyNest home"
                >
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--accent)] text-lg font-bold text-[var(--on-accent)] transition-transform group-hover:rotate-6">
                        B
                    </span>

                    <span className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
                        BuyNest<span className="text-muted">.</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden items-center gap-9 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.to}
                            to={link.to}
                            aria-current={isActive(link) ? 'page' : undefined}
                            className={`relative py-2 text-sm font-medium transition-colors ${
                                isActive(link)
                                    ? 'text-[var(--text-primary)]'
                                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                            }`}
                        >
                            {link.label}

                            {isActive(link) && (
                                <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-[var(--accent)]" />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Right Actions */}
                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Favorites */}
                    <Link
                        to="/favorites"
                        aria-label={`Favorites, ${favoriteCount} items`}
                        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-primary)] transition hover:bg-[var(--surface-muted)]"
                    >
                        <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path
                                strokeWidth="1.7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 00-7.8 7.8l1.1 1.1L12 21l7.8-7.5 1.1-1.1a5.5 5.5 0 00-.1-7.8z"
                            />
                        </svg>

                        {favoriteCount > 0 && (
                            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[9px] font-bold text-[var(--on-accent)]">
                                {favoriteCount}
                            </span>
                        )}
                    </Link>

                    {/* Cart */}
                    <Link
                        to="/cart"
                        aria-label={`Shopping cart, ${cartCount} items`}
                        className="relative flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-primary)] transition hover:bg-[var(--surface-muted)]"
                    >
                        <svg className="h-[19px] w-[19px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path
                                strokeWidth="1.7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 3h2l2.4 12.2a2 2 0 002 1.6h8.8a2 2 0 002-1.6L22 8H6"
                            />
                            <circle cx="10" cy="21" r="1" fill="currentColor" />
                            <circle cx="18" cy="21" r="1" fill="currentColor" />
                        </svg>

                        {cartCount > 0 && (
                            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[var(--accent)] px-1 text-[9px] font-bold text-[var(--on-accent)]">
                                {cartCount}
                            </span>
                        )}
                    </Link>

                    {/* Theme Toggle */}
                    <IconButton
                        label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
                        onClick={toggleTheme}
                    >
                        {isDark ? (
                            <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <circle cx="12" cy="12" r="4" strokeWidth="1.7" />
                                <path
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                    d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3l1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3l1.42-1.42"
                                />
                            </svg>
                        ) : (
                            <svg className="h-[18px] w-[18px]" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M20.9 13A9 9 0 0111 3.1 9 9 0 1020.9 13z"
                                />
                            </svg>
                        )}
                    </IconButton>

                    {/* Mobile Menu Toggle */}
                    <button
                        type="button"
                        onClick={() => setMenuOpen((prev) => !prev)}
                        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
                        aria-expanded={menuOpen}
                        aria-controls="mobile-navigation"
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--border)] text-[var(--text-primary)] transition hover:bg-[var(--surface-muted)] md:hidden"
                    >
                        {menuOpen ? (
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeWidth="2" strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
                            </svg>
                        ) : (
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path strokeWidth="2" strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
                            </svg>
                        )}
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation */}
            {menuOpen && (
                <div
                    id="mobile-navigation"
                    className="border-t border-[var(--border)] bg-[var(--surface)] px-5 py-5 shadow-lg md:hidden"
                >
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                            Navigation
                        </p>

                        <span className="text-xs text-muted">
                            {brand.tagline}
                        </span>
                    </div>

                    <div className="space-y-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.to}
                                to={link.to}
                                onClick={() => setMenuOpen(false)}
                                aria-current={isActive(link) ? 'page' : undefined}
                                className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition ${
                                    isActive(link)
                                        ? 'bg-[var(--surface-muted)] text-[var(--text-primary)]'
                                        : 'text-[var(--text-secondary)] hover:bg-[var(--surface-muted)]'
                                }`}
                            >
                                {link.label}

                                {link.badge > 0 && (
                                    <span className="rounded-full bg-[var(--accent)] px-2 py-0.5 text-xs text-[var(--on-accent)]">
                                        {link.badge}
                                    </span>
                                )}
                            </Link>
                        ))}

                        <Link
                            to="/cart"
                            onClick={() => setMenuOpen(false)}
                            className="flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium text-[var(--text-secondary)] transition hover:bg-[var(--surface-muted)]"
                        >
                            Shopping Cart

                            {cartCount > 0 && (
                                <span className="rounded-full bg-[var(--accent)] px-2 py-0.5 text-xs text-[var(--on-accent)]">
                                    {cartCount}
                                </span>
                            )}
                        </Link>
                    </div>

                    <div className="mt-5 border-t border-[var(--border)] pt-5">
                        <p className="mb-3 text-xs text-muted">
                            {brand.cta.headline}
                        </p>

                        <a
                            href={brand.cta.primary.href}
                            className="flex w-full items-center justify-center rounded-full bg-[var(--accent)] px-5 py-3 text-sm font-semibold text-[var(--on-accent)] transition hover:opacity-80"
                        >
                            {brand.cta.primary.label}
                        </a>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
