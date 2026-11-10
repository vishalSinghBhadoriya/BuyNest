
import { useMemo, useState } from 'react';
import { formatCategory } from '../config/brand';

const ProductFilter = ({ products, onFilterChange }) => {
    const initialFilters = {
        category: 'all',
        priceRange: 'all',
        rating: 'all',
        search: '',
    };

    const [filters, setFilters] = useState(initialFilters);

    const categories = useMemo(
        () => [
            'all',
            ...new Set(products.map((product) => product.category)),
        ],
        [products]
    );

    const priceRanges = [
        { value: 'all', label: 'All prices' },
        { value: '0-25', label: '$0 – $25' },
        { value: '25-50', label: '$25 – $50' },
        { value: '50-100', label: '$50 – $100' },
        { value: '100+', label: '$100+' },
    ];

    const ratings = [
        { value: 'all', label: 'All ratings' },
        { value: '4+', label: '4+ stars' },
        { value: '3+', label: '3+ stars' },
        { value: '2+', label: '2+ stars' },
    ];

    const activeFilterCount = [
        filters.category !== 'all',
        filters.priceRange !== 'all',
        filters.rating !== 'all',
        filters.search.trim() !== '',
    ].filter(Boolean).length;

    const handleFilterChange = (key, value) => {
        const updatedFilters = {
            ...filters,
            [key]: value,
        };

        setFilters(updatedFilters);
        onFilterChange(updatedFilters);
    };

    const clearFilters = () => {
        setFilters(initialFilters);
        onFilterChange(initialFilters);
    };

    const selectClass = `
        input-field
        h-12
        cursor-pointer
        appearance-none
        pr-10
        transition-all
        hover:border-[var(--text-muted)]
        focus:border-[var(--text-primary)]
    `;

    const selectIcon = (
        <svg
            className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m6 9 6 6 6-6"
            />
        </svg>
    );

    return (
        <section
            className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-5 sm:p-6"
            aria-label="Product filters"
        >
            {/* Header */}
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">

                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--surface-muted)]">
                        <svg
                            className="h-5 w-5 text-[var(--text-primary)]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeWidth="1.7"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M4 6h16M7 12h10m-7 6h4"
                            />
                        </svg>
                    </div>

                    <div>
                        <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                            Refine your search
                        </h3>

                        <p className="mt-0.5 text-xs text-muted">
                            Find exactly what you're looking for
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    {activeFilterCount > 0 && (
                        <span className="rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-medium text-[var(--text-secondary)]">
                            {activeFilterCount} active
                        </span>
                    )}

                    <button
                        type="button"
                        onClick={clearFilters}
                        disabled={activeFilterCount === 0}
                        className="text-xs font-semibold text-[var(--text-secondary)] underline underline-offset-4 transition hover:text-[var(--text-primary)] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Clear all
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

                {/* Search */}
                <div>
                    <label
                        htmlFor="product-search"
                        className="mb-2 block text-xs font-semibold text-[var(--text-secondary)]"
                    >
                        Search products
                    </label>

                    <div className="relative">
                        <svg
                            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <circle
                                cx="11"
                                cy="11"
                                r="7"
                                strokeWidth="1.8"
                            />
                            <path
                                strokeWidth="1.8"
                                strokeLinecap="round"
                                d="m16 16 4 4"
                            />
                        </svg>

                        <input
                            id="product-search"
                            type="search"
                            placeholder="What are you looking for?"
                            value={filters.search}
                            onChange={(e) =>
                                handleFilterChange('search', e.target.value)
                            }
                            className="input-field h-12 pl-11 pr-4"
                        />
                    </div>
                </div>

                {/* Category */}
                <div>
                    <label
                        htmlFor="product-category"
                        className="mb-2 block text-xs font-semibold text-[var(--text-secondary)]"
                    >
                        Category
                    </label>

                    <div className="relative">
                        <select
                            id="product-category"
                            value={filters.category}
                            onChange={(e) =>
                                handleFilterChange('category', e.target.value)
                            }
                            className={selectClass}
                        >
                            {categories.map((category) => (
                                <option key={category} value={category}>
                                    {category === 'all'
                                        ? 'All categories'
                                        : formatCategory(category)}
                                </option>
                            ))}
                        </select>

                        {selectIcon}
                    </div>
                </div>

                {/* Price */}
                <div>
                    <label
                        htmlFor="product-price"
                        className="mb-2 block text-xs font-semibold text-[var(--text-secondary)]"
                    >
                        Price range
                    </label>

                    <div className="relative">
                        <select
                            id="product-price"
                            value={filters.priceRange}
                            onChange={(e) =>
                                handleFilterChange('priceRange', e.target.value)
                            }
                            className={selectClass}
                        >
                            {priceRanges.map((range) => (
                                <option key={range.value} value={range.value}>
                                    {range.label}
                                </option>
                            ))}
                        </select>

                        {selectIcon}
                    </div>
                </div>

                {/* Rating */}
                <div>
                    <label
                        htmlFor="product-rating"
                        className="mb-2 block text-xs font-semibold text-[var(--text-secondary)]"
                    >
                        Customer rating
                    </label>

                    <div className="relative">
                        <select
                            id="product-rating"
                            value={filters.rating}
                            onChange={(e) =>
                                handleFilterChange('rating', e.target.value)
                            }
                            className={selectClass}
                        >
                            {ratings.map((rating) => (
                                <option key={rating.value} value={rating.value}>
                                    {rating.label}
                                </option>
                            ))}
                        </select>

                        {selectIcon}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ProductFilter;
