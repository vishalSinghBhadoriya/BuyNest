
import { Link } from 'react-router-dom';
import { brand } from '../config/brand';

const Footer = () => {
    const { name, tagline, author, cta } = brand;

    const quickLinks = [
        { label: 'Home', to: '/' },
        { label: 'Shop', to: '/#catalog' },
        { label: 'About us', to: '/about' },
        { label: 'Favorites', to: '/favorites' },
        { label: 'Shopping cart', to: '/cart' },
    ];

    const socialLinks = [
        {
            label: 'GitHub',
            href: author.github,
        },
        {
            label: 'LinkedIn',
            href: author.linkedin,
        },
        {
            label: 'Instagram',
            href: author.instagram,
        },
        {
            label: 'Telegram',
            href: author.telegram,
        },
    ].filter((link) => link.href);

    return (
        <footer className="mt-20 border-t border-[var(--border)] bg-[var(--surface)]">

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">

                {/* Main footer */}
                <div className="grid grid-cols-1 gap-12 py-14 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10">

                    {/* Brand */}
                    <div className="lg:col-span-2">

                        <Link
                            to="/"
                            className="inline-flex items-center gap-2"
                            aria-label={`${name} home`}
                        >
                            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--accent)] text-lg font-bold text-[var(--on-accent)]">
                                B
                            </span>

                            <span className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                                {name}<span className="text-muted">.</span>
                            </span>
                        </Link>

                        <p className="mt-5 max-w-sm text-sm leading-7 text-muted">
                            {tagline}. Discover thoughtfully selected products
                            across fashion, electronics and everyday essentials.
                        </p>

                        <div className="mt-7">
                            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--text-primary)]">
                                Stay connected
                            </p>

                            <div className="flex flex-wrap gap-3">
                                {socialLinks.map((link) => (
                                    <a
                                        key={link.label}
                                        href={
                                            link.href.startsWith('http')
                                                ? link.href
                                                : `https://${link.href}`
                                        }
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="rounded-full border border-[var(--border)] px-4 py-2 text-xs font-medium text-[var(--text-secondary)] transition hover:border-[var(--accent)] hover:bg-[var(--surface-muted)] hover:text-[var(--text-primary)]"
                                    >
                                        {link.label}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>


                    {/* Quick links */}
                    <div>
                        <h3 className="mb-6 text-sm font-semibold text-[var(--text-primary)]">
                            Explore
                        </h3>

                        <nav className="flex flex-col gap-4">
                            {quickLinks.map((link) => (
                                <Link
                                    key={link.label}
                                    to={link.to}
                                    className="w-fit text-sm text-muted transition-colors hover:text-[var(--text-primary)]"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>


                    {/* Contact */}
                    <div>
                        <h3 className="mb-6 text-sm font-semibold text-[var(--text-primary)]">
                            Get in touch
                        </h3>

                        <div className="flex flex-col gap-4">

                            <a
                                href={author.emailHref}
                                className="group flex items-start gap-3"
                            >
                                <span className="mt-0.5 text-muted">
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeWidth="1.7"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 6l9 7 9-7M5 4h14a2 2 0 012 2v12a2 2 0 01-2 2H5a2 2 0 01-2-2V6a2 2 0 012-2z"
                                        />
                                    </svg>
                                </span>

                                <span className="break-all text-sm text-muted transition-colors group-hover:text-[var(--text-primary)]">
                                    {author.email}
                                </span>
                            </a>

                            <a
                                href={author.phoneHref}
                                className="group flex items-center gap-3"
                            >
                                <span className="text-muted">
                                    <svg
                                        className="h-4 w-4"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeWidth="1.7"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3 5a2 2 0 012-2h3l2 5-3 2a16 16 0 007 7l2-3 5 2v3a2 2 0 01-2 2C10 21 3 14 3 5z"
                                        />
                                    </svg>
                                </span>

                                <span className="text-sm text-muted transition-colors group-hover:text-[var(--text-primary)]">
                                    {author.phone}
                                </span>
                            </a>

                            <p className="mt-2 text-xs leading-6 text-muted">
                                Interested in building an e-commerce
                                experience? Let's connect and discuss
                                your project.
                            </p>

                            <a
                                href={cta.secondary.href.startsWith('http')
                                    ? cta.secondary.href
                                    : `https://${cta.secondary.href}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex w-fit items-center gap-2 border-b border-[var(--text-primary)] pb-1 text-sm font-semibold text-[var(--text-primary)] transition hover:opacity-60"
                            >
                                Let's work together

                                <span>↗</span>
                            </a>

                        </div>
                    </div>

                </div>


                {/* Bottom footer */}
                <div className="flex flex-col gap-4 border-t border-[var(--border)] py-6 sm:flex-row sm:items-center sm:justify-between">

                    <p className="text-xs text-muted">
                        © {new Date().getFullYear()} {name}. All rights reserved.
                    </p>

                    <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                        <span>Designed & developed by</span>

                        <span className="font-semibold text-[var(--text-primary)]">
                            {author.name}
                        </span>
                    </div>

                    <Link
                        to="/"
                        className="text-xs font-medium text-muted transition hover:text-[var(--text-primary)]"
                    >
                        Back to top ↑
                    </Link>

                </div>

            </div>
        </footer>
    );
};

export default Footer;
