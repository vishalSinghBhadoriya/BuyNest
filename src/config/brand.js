
export const brand = {
    name: 'BuyNest',

    tagline: 'Find your everyday favorites.',

    description:
        'Discover thoughtfully selected products across fashion, electronics, and lifestyle.',

    author: {
        name: 'Vishal Bhadoriya',
        role: 'Frontend Developer',
        phone: '+91 9765906240',
        phoneHref: 'tel:+919765906240',
        email: 'vishalbhadoriya9765@gmail.com',
        emailHref: 'mailto:vishalbhadoriya9765@gmail.com',
        linkedin: 'https://www.linkedin.com/in/vishal-singh-bhadoriya',
        github: 'https://github.com/vishalSinghBhadoriya/',
    },

    demo: {
        label: 'BuyNest Storefront',
        message: 'Explore the BuyNest shopping experience.',
        checkoutTitle: 'Your demo order is confirmed!',
        checkoutMessage:
            'Your demo order has been successfully created. This is a frontend demonstration only. No payment was processed and no real order was placed.',
    },

    cta: {
        headline: 'Have a project in mind?',
        subline:
            'Looking for a modern, responsive storefront? Let’s connect.',
        primary: {
            label: 'Contact me',
            href: 'tel:+919765906240',
        },
        secondary: {
            label: 'Connect on LinkedIn',
            href: 'https://www.linkedin.com/in/vishal-singh-bhadoriya',
        },
    },

    about: {
        title: 'Shopping made simple.',
        intro:
            'BuyNest brings together everyday essentials, fashion, electronics, and lifestyle products in one convenient shopping experience.',

        story: [
            'Discover products across different categories through a clean and easy-to-use storefront. Browse collections, explore product details, and save your favorite items.',
            'BuyNest is a frontend e-commerce demonstration featuring product discovery, wishlist management, cart functionality, order review, and demo checkout.',
        ],

        values: [
            {
                title: 'Easy discovery',
                text: 'Explore products across multiple categories in one place.',
            },
            {
                title: 'Simple experience',
                text: 'Clean layouts and intuitive navigation make shopping easier.',
            },
            {
                title: 'Built for everyone',
                text: 'Responsive design for mobile, tablet, and desktop screens.',
            },
        ],
    },

    trust: [
        {
            title: 'Easy product discovery',
            text: 'Browse fashion, electronics, and lifestyle collections.',
        },
        {
            title: 'Wishlist and cart',
            text: 'Save favorite products and manage your shopping cart.',
        },
        {
            title: 'Responsive experience',
            text: 'Enjoy a consistent experience across different devices.',
        },
        {
            title: 'Demo checkout',
            text: 'Explore a multi-step checkout and order confirmation flow.',
        },
    ],

    seo: {
        defaultTitle: 'BuyNest | Discover Something Better',
        defaultDescription:
            'Explore fashion, electronics, accessories and everyday essentials at BuyNest.',
        siteUrl: import.meta.env.VITE_SITE_URL ?? '',
    },
};

export const categoryLabels = {
    "men's clothing": "Men's",
    "women's clothing": "Women's",
    electronics: 'Electronics',
    jewelery: 'Jewelry',
};

export const formatCategory = (category = '') =>
    categoryLabels[category] ??
    category.charAt(0).toUpperCase() + category.slice(1);
