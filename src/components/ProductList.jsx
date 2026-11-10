import { memo } from 'react';
import ProductCard from './ProductCard';

const ProductList = ({ products }) => {
    if (products.length === 0) {
        return (
            <div className="text-center py-16">
                <div className="surface-card rounded-xl p-12 max-w-md mx-auto">
                    <svg
                        className="w-16 h-16 text-muted mx-auto mb-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <h2 className="heading-display text-xl mb-3">No products found</h2>
                    <p className="text-sm text-secondary">
                        Try adjusting your filters to see more results.
                    </p>
                </div>
            </div>
        );
    }

return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => (
            <ProductCard
                key={product.id}
                product={product}
            />
        ))}
    </div>
);
};

export default memo(ProductList);
