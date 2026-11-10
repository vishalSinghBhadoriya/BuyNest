import productsData from '../data/products.json';

const delay = (ms = 120) => new Promise((resolve) => setTimeout(resolve, ms));

export const getProducts = async () => {
    try {
        await delay();
        return productsData;
    } catch (err) {
        console.error('Load products error:', err);
        return [];
    }
};

export const getProductById = async (id) => {
    try {
        await delay();
        return productsData.find((product) => product.id === Number(id)) ?? null;
    } catch (err) {
        console.error('Load product error:', err);
        return null;
    }
};

export const getCategories = () => [...new Set(productsData.map((p) => p.category))];

export const getFeaturedProducts = (count = 4) => productsData.slice(0, count);

export const getRelatedProducts = (productId, category, count = 4) =>
    productsData
        .filter((product) => product.category === category && product.id !== Number(productId))
        .slice(0, count);
