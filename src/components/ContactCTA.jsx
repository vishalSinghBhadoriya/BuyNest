
import { brand } from '../config/brand';

const ContactCTA = ({ variant = 'section' }) => {
    const { cta, author } = brand;

    const isCompact = variant === 'compact';

    if (isCompact) {
        return (
            <div className="flex flex-wrap gap-3">
                <a
                    href={cta.primary.href}
                    className="btn-primary inline-flex items-center justify-center gap-2"
                >
                    {cta.primary.label}
                    <span aria-hidden="true">→</span>
                </a>

                <a
                    href={cta.secondary.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline inline-flex items-center justify-center"
                >
                    {cta.secondary.label}
                </a>
            </div>
        );
    }

    return (
        <section className="relative overflow-hidden surface-card rounded-2xl p-8 md:p-12 text-center">

            {/* Decorative elements */}
            <div
                className="absolute -top-20 -right-20 w-48 h-48 rounded-full border border-[var(--border)] opacity-50"
                aria-hidden="true"
            />

            <div
                className="absolute -bottom-24 -left-16 w-56 h-56 rounded-full border border-[var(--border)] opacity-50"
                aria-hidden="true"
            />

            <div className="relative z-10 max-w-2xl mx-auto">

                <p className="label-caps mb-4">
                    Let's connect
                </p>

                <h2 className="heading-display text-3xl md:text-4xl mb-4">
                    {cta.headline}
                </h2>

                <p className="text-secondary max-w-md mx-auto mb-8 text-sm md:text-base leading-relaxed">
                    {cta.subline}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                    <a
                        href={cta.primary.href}
                        className="btn-primary inline-flex items-center justify-center gap-2"
                    >
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.8}
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                        </svg>

                        {cta.primary.label}
                    </a>

                    <a
                        href={cta.secondary.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline inline-flex items-center justify-center gap-2"
                    >
                        {cta.secondary.label}
                        <span aria-hidden="true">↗</span>
                    </a>
                </div>

                <div className="mt-9 pt-6 border-t border-[var(--border)]">
                    <p className="text-xs text-muted">
                        {brand.name} · Designed and customized by {author.name}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default ContactCTA;
