
import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

import { getProducts } from '../api/productService';
import { brand, formatCategory } from '../config/brand';

import ProductList from '../components/ProductList';
import ProductFilter from '../components/ProductFilter';
import ContactCTA from '../components/ContactCTA';
import TrustSection from '../components/TrustSection';
import Loader from '../components/Loader';
import ProductImage from '../components/ProductImage';

import { usePageMeta } from '../hooks/usePageMeta';

const Home = () => {
    usePageMeta();

    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');

    // Fetch products
    useEffect(() => {
        let isMounted = true;

        const fetchProducts = async () => {
            try {
                setLoading(true);
                setError('');

                const data = await getProducts();

                if (isMounted) {
                    setProducts(data);
                    setFilteredProducts(data);
                }
            } catch (err) {
                console.error('Failed to load products:', err);

                if (isMounted) {
                    setError('Unable to load products. Please try again.');
                }
            } finally {
                if (isMounted) {
                    setLoading(false);
                }
            }
        };

        fetchProducts();

        return () => {
            isMounted = false;
        };
    }, []);

    // Extract unique categories
    const categories = useMemo(
        () => ['all', ...new Set(products.map((product) => product.category))],
        [products]
    );

    // Featured products
    const featuredProducts = useMemo(
        () => products.slice(0, 3),
        [products]
    );

    // Handle all filters
    const handleFilterChange = (filters) => {
        let result = [...products];

        const search = filters.search?.trim().toLowerCase() ?? '';

        if (search) {
            result = result.filter((product) =>
                product.title.toLowerCase().includes(search)
            );
        }

        const category = filters.category ?? 'all';

        if (category !== 'all') {
            result = result.filter(
                (product) => product.category === category
            );
        }

        setActiveCategory(category);

        if (filters.priceRange && filters.priceRange !== 'all') {
            const [min, max] = filters.priceRange.split('-').map(Number);

            result = result.filter((product) => {
                if (max) {
                    return product.price >= min && product.price <= max;
                }

                return product.price >= min;
            });
        }

        if (filters.rating && filters.rating !== 'all') {
            const minRating = parseFloat(
                filters.rating.replace('+', '')
            );

            result = result.filter(
                (product) => (product.rating?.rate ?? 0) >= minRating
            );
        }

        setFilteredProducts(result);
    };

    // Handle category selection
    const handleCategoryPill = (category) => {
        setActiveCategory(category);

        handleFilterChange({
            category,
            priceRange: 'all',
            rating: 'all',
            search: '',
        });
    };

    // Loading state
    if (loading) {
        return <Loader />;
    }

    // Error state
    if (error) {
        return (
            <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
                <h2 className="mb-3 text-2xl font-semibold text-[var(--text-primary)]">
                    Something went wrong
                </h2>

                <p className="mb-6 text-sm text-muted">{error}</p>

                <button
                    type="button"
                    onClick={() => window.location.reload()}
                    className="rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-zinc-700"
                >
                    Reload page
                </button>
            </div>
        );
    }

    return (
        <div className="space-y-20 pb-10">

            {/* ================= HERO SECTION ================= */}
            <section className="relative overflow-hidden rounded-3xl bg-[#111111] text-white">

                {/* Decorative background */}
                <div
                    className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full border border-white/10"
                    aria-hidden="true"
                />

                <div
                    className="pointer-events-none absolute -right-12 -top-12 h-72 w-72 rounded-full border border-white/10"
                    aria-hidden="true"
                />

                <div className="relative grid items-center gap-12 px-7 py-16 sm:px-12 md:grid-cols-2 md:px-16 md:py-24">

                    {/* Hero content */}
                    <div className="max-w-xl">

                        <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/20 px-4 py-2">
                            <span className="h-2 w-2 rounded-full bg-white" />

                            <span className="text-xs font-medium uppercase tracking-[0.18em] text-white/80">
                                {brand.demo.label}
                            </span>
                        </div>

                        <h1 className="mb-6 text-4xl font-semibold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl">
                            Discover
                            <br />
                            something
                            <br />
                            <span className="text-white/50">
                                better.
                            </span>
                        </h1>

                        <p className="mb-9 max-w-md text-sm leading-7 text-white/65 sm:text-base">
                            {brand.description}
                        </p>

                        <div className="flex flex-wrap items-center gap-4">

                            <a
                                href="#catalog"
                                className="inline-flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
                            >
                                Explore collection

                                <svg
                                    className="h-4 w-4"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M7 17L17 7M7 7h10v10"
                                    />
                                </svg>
                            </a>

                            <Link
                                to="/about"
                                className="rounded-full border border-white/25 px-7 py-3.5 text-sm font-medium text-white transition hover:bg-white/10"
                            >
                                Our story
                            </Link>

                        </div>

                        <div className="mt-12 flex flex-wrap gap-8 border-t border-white/15 pt-7">

                            <div>
                                <p className="text-2xl font-semibold">
                                    {products.length}+
                                </p>
                                <p className="mt-1 text-xs text-white/50">
                                    Products
                                </p>
                            </div>

                            <div>
                                <p className="text-2xl font-semibold">
                                    {categories.length - 1}
                                </p>
                                <p className="mt-1 text-xs text-white/50">
                                    Categories
                                </p>
                            </div>

                            <div>
                                <p className="text-2xl font-semibold">
                                    100%
                                </p>
                                <p className="mt-1 text-xs text-white/50">
                                    Responsive
                                </p>
                            </div>

                        </div>
                    </div>

                    {/* Featured visual */}
                    <div className="relative mx-auto flex w-full max-w-md items-center justify-center">

                        <div className="absolute h-72 w-72 rounded-full bg-white/5 blur-3xl" />

                        {featuredProducts[0] && (
                            <Link
                                to={`/product/${featuredProducts[0].id}`}
                                className="group relative flex aspect-square w-full max-w-[360px] items-center justify-center rounded-3xl border border-white/10 bg-white/[0.06] p-10 backdrop-blur-sm transition duration-500 hover:bg-white/10"
                            >
                                <ProductImage
                                    src={featuredProducts[0].image}
                                    alt={featuredProducts[0].title}
                                    eager
                                    className="max-h-full max-w-full object-contain transition duration-700 group-hover:scale-110"
                                />

                                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl border border-white/10 bg-black/60 p-4 backdrop-blur-md">

                                    <div className="min-w-0">
                                        <p className="mb-1 text-[10px] uppercase tracking-widest text-white/50">
                                            Featured product
                                        </p>

                                        <p className="truncate text-sm font-medium text-white">
                                            {featuredProducts[0].title}
                                        </p>
                                    </div>

                                    <span className="ml-3 whitespace-nowrap text-sm font-semibold text-white">
                                        ${featuredProducts[0].price.toFixed(2)}
                                    </span>

                                </div>
                            </Link>
                        )}

                    </div>
                </div>
            </section>


            {/* ================= FEATURED PRODUCTS ================= */}
            <section>

                <div className="mb-8 flex flex-wrap items-end justify-between gap-4">

                    <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                            Handpicked for you
                        </p>

                        <h2 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                            Featured collection
                        </h2>

                        <p className="mt-3 text-sm text-muted">
                            A few favourites worth discovering.
                        </p>
                    </div>

                    <a
                        href="#catalog"
                        className="group inline-flex items-center gap-2 border-b border-[var(--text-primary)] pb-1 text-sm font-medium text-[var(--text-primary)] transition hover:opacity-60"
                    >
                        View all products

                        <span className="transition-transform group-hover:translate-x-1">
                            →
                        </span>
                    </a>

                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">

                    {featuredProducts.map((product, index) => (
                        <Link
                            key={product.id}
                            to={`/product/${product.id}`}
                            className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--surface)] transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >

                            <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden bg-[var(--surface-muted)] p-8">

                                <ProductImage
                                    src={product.image}
                                    alt={product.title}
                                    eager={index === 0}
                                    className="max-h-full max-w-full object-contain transition duration-500 group-hover:scale-110"
                                />

                                <span className="absolute left-4 top-4 rounded-full bg-[var(--surface)] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-primary)] shadow-sm">
                                    Featured
                                </span>

                                <span className="absolute bottom-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition-transform group-hover:rotate-45">
                                    ↗
                                </span>

                            </div>

                            <div className="p-5">

                                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-muted">
                                    {formatCategory(product.category)}
                                </p>

                                <h3 className="line-clamp-2 min-h-12 text-base font-semibold leading-6 text-[var(--text-primary)] transition-colors group-hover:opacity-60">
                                    {product.title}
                                </h3>

                                <div className="mt-4 flex items-center justify-between border-t border-[var(--border)] pt-4">

                                    <span className="text-lg font-semibold text-[var(--text-primary)]">
                                        ${product.price.toFixed(2)}
                                    </span>

                                    <span className="text-xs text-muted">
                                        View product →
                                    </span>

                                </div>
                            </div>

                        </Link>
                    ))}

                </div>
            </section>


            {/* ================= TRUST SECTION ================= */}
            <TrustSection />


            {/* ================= PRODUCT CATALOG ================= */}
            <section id="catalog" className="scroll-mt-28">

                {/* Section heading */}
                <div className="mb-8">

                    <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
                        Explore our store
                    </p>

                    <div className="flex flex-wrap items-end justify-between gap-4">

                        <div>
                            <h2 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                                Shop the collection
                            </h2>

                            <p className="mt-3 text-sm text-muted">
                                Find products that fit your everyday needs.
                            </p>
                        </div>

                        <div className="rounded-full border border-[var(--border)] px-4 py-2 text-xs font-medium text-[var(--text-secondary)]">
                            {filteredProducts.length} products found
                        </div>

                    </div>
                </div>


                {/* Category filters */}
                <div className="mb-8 flex gap-2 overflow-x-auto pb-3">

                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            onClick={() => handleCategoryPill(category)}
                            aria-pressed={activeCategory === category}
                            className={`shrink-0 rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-200 ${
                                activeCategory === category
                                    ? 'border-black bg-black text-white dark:border-white dark:bg-white dark:text-black'
                                    : 'border-[var(--border)] bg-[var(--surface)] text-[var(--text-secondary)] hover:border-[var(--text-primary)] hover:text-[var(--text-primary)]'
                            }`}
                        >
                            {category === 'all'
                                ? 'All products'
                                : formatCategory(category)}
                        </button>
                    ))}

                </div>


                {/* Search and advanced filters */}
                <div className="mb-8 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4 sm:p-5">

                    <div className="mb-4 flex items-center gap-2">
                        <svg
                            className="h-4 w-4 text-muted"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="1.8"
                                d="M3 4h18l-7 8v6l-4 2v-8L3 4z"
                            />
                        </svg>

                        <span className="text-sm font-semibold text-[var(--text-primary)]">
                            Find your product
                        </span>
                    </div>

                    <ProductFilter
                        products={products}
                        onFilterChange={handleFilterChange}
                    />

                </div>


                {/* Product results */}
                <div className="mb-6 flex items-center justify-between">

                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                        {activeCategory === 'all'
                            ? 'All products'
                            : formatCategory(activeCategory)}
                    </h3>

                    <span className="text-xs text-muted">
                        Showing {filteredProducts.length} results
                    </span>

                </div>

                <ProductList products={filteredProducts} />

            </section>


            {/* ================= CONTACT CTA ================= */}
            <ContactCTA />

        </div>
    );
};

export default Home;