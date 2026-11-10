
import { Link } from 'react-router-dom';

import { brand } from '../config/brand';
import ContactCTA from '../components/ContactCTA';
import { usePageMeta } from '../hooks/usePageMeta';

const About = () => {
    const { about, author } = brand;

    usePageMeta({
        title: 'About BuyNest',
        description: about.intro,
    });

    return (
        <div className="max-w-5xl mx-auto animate-fade-in">

            {/* Hero section */}
            <section className="mb-20">
                <p className="label-caps mb-4">
                    Discover BuyNest
                </p>

                <h1 className="heading-display text-4xl md:text-6xl leading-tight max-w-3xl mb-7">
                    {about.title}
                </h1>

                <p className="text-base md:text-lg text-secondary leading-relaxed max-w-2xl">
                    {about.intro}
                </p>
            </section>

            {/* Brand story */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 mb-20">
                <div>
                    <p className="label-caps mb-3">
                        Our story
                    </p>

                    <h2 className="heading-display text-2xl md:text-3xl">
                        Everything you need, in one place.
                    </h2>
                </div>

                <div className="space-y-5 text-sm text-secondary leading-7">
                    {about.story.map((paragraph) => (
                        <p key={paragraph}>
                            {paragraph}
                        </p>
                    ))}
                </div>
            </section>

            {/* Shopping categories */}
            <section className="mb-20">
                <div className="mb-8">
                    <p className="label-caps mb-3">
                        Explore our collection
                    </p>

                    <h2 className="heading-display text-2xl md:text-3xl">
                        Something for every day.
                    </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">

                    <Link
                        to="/"
                        className="surface-card rounded-2xl p-7 min-h-44 flex flex-col justify-between group hover:border-[var(--text-primary)] transition-colors"
                    >
                        <span className="text-3xl" aria-hidden="true">
                            ◇
                        </span>

                        <div>
                            <h3 className="font-medium mb-1">
                                Fashion
                            </h3>

                            <p className="text-xs text-muted">
                                Everyday style and essentials.
                            </p>
                        </div>
                    </Link>

                    <Link
                        to="/"
                        className="surface-card rounded-2xl p-7 min-h-44 flex flex-col justify-between group hover:border-[var(--text-primary)] transition-colors"
                    >
                        <span className="text-3xl" aria-hidden="true">
                            ▣
                        </span>

                        <div>
                            <h3 className="font-medium mb-1">
                                Electronics
                            </h3>

                            <p className="text-xs text-muted">
                                Technology for everyday life.
                            </p>
                        </div>
                    </Link>

                    <Link
                        to="/"
                        className="surface-card rounded-2xl p-7 min-h-44 flex flex-col justify-between group hover:border-[var(--text-primary)] transition-colors"
                    >
                        <span className="text-3xl" aria-hidden="true">
                            ✳
                        </span>

                        <div>
                            <h3 className="font-medium mb-1">
                                Lifestyle
                            </h3>

                            <p className="text-xs text-muted">
                                Little things that make a difference.
                            </p>
                        </div>
                    </Link>
                </div>
            </section>

            {/* Brand values */}
            <section className="mb-20">
                <div className="mb-8">
                    <p className="label-caps mb-3">
                        The BuyNest experience
                    </p>

                    <h2 className="heading-display text-2xl md:text-3xl">
                        What makes us different.
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    {about.values.map((value, index) => (
                        <div
                            key={value.title}
                            className="surface-card rounded-2xl p-7"
                        >
                            <span className="text-xs text-muted mb-6 block">
                                0{index + 1}
                            </span>

                            <h3 className="text-base font-medium mb-3">
                                {value.title}
                            </h3>

                            <p className="text-sm text-secondary leading-relaxed">
                                {value.text}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Developer section */}
            <section className="surface-card rounded-2xl p-7 sm:p-10 mb-20">
                <p className="label-caps mb-4">
                    Behind the project
                </p>

                <h2 className="heading-display text-2xl md:text-3xl mb-4">
                    Built with attention to detail.
                </h2>

                <p className="text-sm text-secondary leading-relaxed max-w-2xl mb-7">
                    BuyNest is an interactive e-commerce frontend demonstration
                    customized and developed by {author.name}, a {author.role}.
                    It showcases product discovery, responsive interfaces,
                    wishlist management, shopping cart functionality, and
                    a multi-step demo checkout experience.
                </p>

                <div className="flex flex-wrap gap-3">
                    <a
                        href={author.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline"
                    >
                        View GitHub ↗
                    </a>

                    <a
                        href={author.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline"
                    >
                        LinkedIn ↗
                    </a>

                    <Link to="/" className="btn-primary">
                        Explore BuyNest →
                    </Link>
                </div>
            </section>

            {/* Contact */}
            <ContactCTA />
        </div>
    );
};

export default About;
