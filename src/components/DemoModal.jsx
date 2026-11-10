
import { useEffect, useRef } from 'react';
import { brand } from '../config/brand';

const DemoModal = ({ isOpen, onClose, title, message }) => {
    const modalRef = useRef(null);
    const closeButtonRef = useRef(null);

    useEffect(() => {
        if (!isOpen) return;

        const previousOverflow = document.body.style.overflow;
        const previouslyFocused = document.activeElement;

        document.body.style.overflow = 'hidden';

        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        const handleTab = (event) => {
            if (event.key !== 'Tab' || !modalRef.current) return;

            const focusableElements = modalRef.current.querySelectorAll(
                'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
            );

            const firstElement = focusableElements[0];
            const lastElement = focusableElements[focusableElements.length - 1];

            if (event.shiftKey && document.activeElement === firstElement) {
                event.preventDefault();
                lastElement?.focus();
            } else if (
                !event.shiftKey &&
                document.activeElement === lastElement
            ) {
                event.preventDefault();
                firstElement?.focus();
            }
        };

        closeButtonRef.current?.focus();

        document.addEventListener('keydown', handleEscape);
        document.addEventListener('keydown', handleTab);

        return () => {
            document.body.style.overflow = previousOverflow;

            document.removeEventListener('keydown', handleEscape);
            document.removeEventListener('keydown', handleTab);

            previouslyFocused?.focus?.();
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    const { cta, author, demo } = brand;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
            role="dialog"
            aria-modal="true"
            aria-labelledby="demo-modal-title"
            aria-describedby="demo-modal-description"
        >
            {/* Backdrop */}
            <button
                type="button"
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
                aria-label="Close dialog"
            />

            {/* Modal */}
            <div
                ref={modalRef}
                className="relative surface-card rounded-2xl p-7 sm:p-9 max-w-md w-full animate-slide-up shadow-2xl"
            >
                {/* Close button */}
                <button
                    ref={closeButtonRef}
                    type="button"
                    onClick={onClose}
                    className="absolute top-4 right-4 w-9 h-9 rounded-full flex items-center justify-center text-muted hover:bg-subtle hover:text-[var(--text-primary)] transition"
                    aria-label="Close dialog"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.8}
                            d="M6 18 18 6M6 6l12 12"
                        />
                    </svg>
                </button>

                {/* Success icon */}
                <div className="w-14 h-14 rounded-full bg-subtle border border-[var(--border)] flex items-center justify-center mb-6">
                    <svg
                        className="w-7 h-7 text-[var(--text-primary)]"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.8}
                            d="m5 12 4 4L19 6"
                        />
                    </svg>
                </div>

                {/* Content */}
                <p className="label-caps mb-3">
                    {demo.label}
                </p>

                <h2
                    id="demo-modal-title"
                    className="heading-display text-2xl sm:text-3xl mb-4 pr-5"
                >
                    {title ?? demo.checkoutTitle}
                </h2>

                <p
                    id="demo-modal-description"
                    className="text-sm text-secondary leading-relaxed mb-8"
                >
                    {message ?? demo.checkoutMessage}
                </p>

                {/* Actions */}
                <div className="flex flex-col gap-3">
                    <a
                        href={cta.primary.href}
                        className="btn-primary w-full text-center"
                    >
                        {cta.primary.label}
                    </a>

                    <a
                        href={cta.secondary.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-outline w-full text-center"
                    >
                        {cta.secondary.label}
                    </a>

                    <button
                        type="button"
                        onClick={onClose}
                        className="w-full py-3 text-sm text-muted hover:text-[var(--text-primary)] transition"
                    >
                        Continue browsing
                    </button>
                </div>

                {/* Author */}
                <div className="mt-7 pt-5 border-t border-[var(--border)] text-center">
                    <p className="text-xs text-muted">
                        Designed and customized by {author.name}
                    </p>

                    <p className="text-xs text-muted mt-1">
                        {author.role}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DemoModal;
