import { useEffect } from 'react';
import { brand } from '../config/brand';

const setMeta = (key, content, attribute = 'name') => {
    if (!content) return;

    let element = document.querySelector(`meta[${attribute}="${key}"]`);
    if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, key);
        document.head.appendChild(element);
    }
    element.setAttribute('content', content);
};

export const usePageMeta = ({ title, description } = {}) => {
    useEffect(() => {
        const pageTitle = title ? `${title} · BuyNest` : brand.seo.defaultTitle;
        const pageDescription = description ?? brand.seo.defaultDescription;
        const siteUrl = (
            brand.seo.siteUrl ||
            `${window.location.origin}${import.meta.env.BASE_URL}`
        ).replace(/\/$/, '');
        const imageUrl = `${siteUrl}/og-cover.svg`;

        document.title = pageTitle;

        setMeta('description', pageDescription);
        setMeta('og:title', pageTitle, 'property');
        setMeta('og:description', pageDescription, 'property');
        setMeta('og:image', imageUrl, 'property');
        setMeta('og:url', window.location.href, 'property');
        setMeta('og:type', 'website', 'property');
        setMeta('twitter:card', 'summary_large_image');
        setMeta('twitter:title', pageTitle);
        setMeta('twitter:description', pageDescription);
        setMeta('twitter:image', imageUrl);

        return () => {
            document.title = brand.seo.defaultTitle;
        };
    }, [title, description]);
};
