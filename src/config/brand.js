export const brand = {
    name: 'BuyNest',
    tagline: 'Curated goods for modern living',
    description:
        'A minimal storefront experience built to showcase product discovery, cart flow, and responsive design.',
    author: {
        name: 'Vishal Bhadoriya',
        role: 'Frontend Developer',
        phone: '+91 9765906240',
        phoneHref: 'tel:+919765906240',
        email: 'vishalbhadoriya9765@gmail.com',
        emailHref: 'mailto:vishalbhadoriya9765@gmail.com',
        linkedin: 'www.linkedin.com/in/vishal-singh-bhadoriya',
        github: 'http://github.com/vishalSinghBhadoriya/',
    },
    demo: {
        label: 'Storefront demo',
        message: 'Custom e-commerce builds available for your brand.',
        checkoutTitle: 'Demo checkout',
        checkoutMessage:
            'This is a front-end demonstration. No orders are processed or stored. For a production-ready storefront built around your brand, reach out directly.',
    },
    cta: {
        headline: 'Need a storefront like this?',
        subline: 'Reach out to discuss a tailored version for your business.',
        primary: {
            label: 'Call now',
            href: 'tel:+919765906240',
        },
        secondary: {
            label: 'LinkedIn',
            href: 'www.linkedin.com/in/vishal-singh-bhadoriya',
        },
    },
    about: {
        title: 'Thoughtfully made, quietly confident',
        intro:
            'BuyNest began as a simple idea: everyday objects deserve the same care as statement pieces. We select items for clarity of form, honest materials, and lasting use.',
        story: [
            'The collection spans apparel, accessories, and electronics — grouped not by trend cycles, but by how they fit into a considered routine. Each product page is designed to give you room to look closely before you decide.',
            'This site runs as a live storefront demonstration — browsing, saving favourites, and checkout flow included — built to show what a tailored shop can feel like in practice.',
        ],
        values: [
            {
                title: 'Curated, not crowded',
                text: 'A focused catalogue where every item earns its place.',
            },
            {
                title: 'Clarity over noise',
                text: 'Clean layouts, readable type, and space to breathe.',
            },
            {
                title: 'Built to adapt',
                text: 'The same foundation can be shaped around your brand, catalogue, and customers.',
            },
        ],
    },
    trust: [
        {
            title: 'Complimentary shipping',
            text: 'Free delivery on every order within this demo experience.',
        },
        {
            title: 'Secure checkout flow',
            text: 'A complete three-step checkout built for real-world integration.',
        },
        {
            title: 'Works everywhere',
            text: 'Fully responsive from phone to desktop, with dark and light modes.',
        },
        {
            title: 'Direct support',
            text: 'Questions about a custom build? Call or message anytime.',
        },
    ],
    seo: {
        defaultTitle: 'BuyNest',
        defaultDescription:
            'A minimal e-commerce storefront demo by Vishal bhadoriay. Browse products, favourites, cart, and checkout in a cream-and-coffee experience.',
        siteUrl: import.meta.env.VITE_SITE_URL ?? '',
    },
};

export const categoryLabels = {
    "men's clothing": "Men's",
    "women's clothing": "Women's",
    electronics: 'Electronics',
    jewelery: 'Jewelry',
};

export const formatCategory = (category) =>
    categoryLabels[category] ??
    category.charAt(0).toUpperCase() + category.slice(1);
