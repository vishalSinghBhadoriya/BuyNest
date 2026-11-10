import {createContext, useState} from 'react';

// ساخت Context
export const FavoritesContext = createContext();

// ساخت Provider
export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const addFavorite = (product) => {
        setFavorites(prev => [...prev, product]);
    };

    const removeFavorite = (id) => {
        setFavorites(prev => prev.filter(p => p.id !== id));
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};

