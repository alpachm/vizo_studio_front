// ---------------------------------------------------------------------------
// ThemeToggleDemo — Adaptive theme showcase section for the Home screen.
// Automatically activates Light Mode with a smooth transition when the
// section becomes centered in the viewport, while allowing manual toggling.
// ---------------------------------------------------------------------------
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FiArrowUpRight, FiCheck, FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "../../context/ThemeContext";
import { useScrollToSection } from "../../hooks/useScrollToSection";
import type { IThemeToggleDemoProps } from "../../interfaces/HomeScreenInterface";

/** Delay (ms) after centering so the user sees the switch glide into Light Mode. */
const AUTO_TOGGLE_DELAY_MS = 220;

function ThemeToggleDemo({ className = "" }: IThemeToggleDemoProps) {
    const { t } = useTranslation();
    const { theme, toggleTheme } = useTheme();
    const { scrollToSection } = useScrollToSection();
    const sectionRef = useRef<HTMLElement | null>(null);
    const isInViewCenterRef = useRef<boolean>(false);

    const isLight = theme === "light";

    // Switch to Light Mode when the section is centered in the viewport and
    // restore Dark Mode as soon as it leaves, using an rAF-throttled scroll
    // listener so mobile touch/momentum scrolling and dynamic URL bars never miss.
    useEffect(() => {
        let rafId: number | null = null;
        let timerId: number | null = null;

        const evaluateCenterState = () => {
            rafId = null;
            const sectionNode = sectionRef.current;
            if (!sectionNode) return;

            const vh =
                window.innerHeight || document.documentElement.clientHeight;
            const rect = sectionNode.getBoundingClientRect();

            // Section is considered active/centered when the user has scrolled
            // past the hero and the section occupies the middle band of the viewport.
            const isCentered =
                window.scrollY > 100 &&
                rect.top <= vh * 0.6 &&
                rect.bottom >= vh * 0.4;

            if (isCentered && !isInViewCenterRef.current) {
                isInViewCenterRef.current = true;
                if (timerId !== null) {
                    window.clearTimeout(timerId);
                }
                timerId = window.setTimeout(() => {
                    timerId = null;
                    if (isInViewCenterRef.current) {
                        toggleTheme("light");
                    }
                }, AUTO_TOGGLE_DELAY_MS);
            } else if (!isCentered && isInViewCenterRef.current) {
                isInViewCenterRef.current = false;
                if (timerId !== null) {
                    window.clearTimeout(timerId);
                    timerId = null;
                }
                toggleTheme("dark");
            }
        };

        const handleScrollOrResize = () => {
            if (rafId !== null) return;
            rafId = window.requestAnimationFrame(evaluateCenterState);
        };

        window.addEventListener("scroll", handleScrollOrResize, {
            passive: true,
        });
        window.addEventListener("resize", handleScrollOrResize, {
            passive: true,
        });
        window.addEventListener("touchmove", handleScrollOrResize, {
            passive: true,
        });

        return () => {
            window.removeEventListener("scroll", handleScrollOrResize);
            window.removeEventListener("resize", handleScrollOrResize);
            window.removeEventListener("touchmove", handleScrollOrResize);
            if (rafId !== null) {
                window.cancelAnimationFrame(rafId);
            }
            if (timerId !== null) {
                window.clearTimeout(timerId);
            }
            if (isInViewCenterRef.current) {
                isInViewCenterRef.current = false;
                toggleTheme("dark");
            }
        };
    }, [toggleTheme]);

    return (
        <section
            ref={sectionRef}
            id="theme-toggle-demo"
            className={`w-full bg-bg py-24 sm:py-28 lg:py-32 transition-colors duration-500 ease-out ${className}`}
        >
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12 lg:gap-x-16 lg:gap-y-8">
                    {/* -------------------------------------------------- */}
                    {/* 1 (Mobile) / Left Top (Desktop) — Headline & copy  */}
                    {/* -------------------------------------------------- */}
                    <div className="order-1 lg:order-none lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:self-end">
                        <h2 className="font-title text-3xl font-bold leading-tight tracking-tight sm:text-4xl lg:text-5xl">
                            <span className="block text-text transition-colors duration-500">
                                {t("HomeScreen.ThemeToggleDemo.titleLine1")}
                            </span>
                            <span className="mt-1 block text-primary">
                                {t("HomeScreen.ThemeToggleDemo.titleLine2")}
                            </span>
                        </h2>

                        <p className="mt-6 max-w-xl text-base leading-relaxed text-text-muted transition-colors duration-500 sm:text-lg">
                            {t("HomeScreen.ThemeToggleDemo.subtitle")}
                        </p>
                    </div>

                    {/* -------------------------------------------------- */}
                    {/* 2 (Mobile) / Right Column (Desktop) — Theme Card   */}
                    {/* -------------------------------------------------- */}
                    <div className="order-2 lg:order-none lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:self-center">
                        <div className="rounded-3xl border border-neutral-500/20 bg-neutral-500/[0.04] p-7 shadow-sm transition-colors duration-500 sm:p-10">
                            {/* Top Row — Toggle Switch + Pill Badge */}
                            <div className="flex flex-wrap items-center justify-between gap-4">
                                <button
                                    type="button"
                                    role="switch"
                                    aria-checked={isLight}
                                    aria-label={t(
                                        "HomeScreen.ThemeToggleDemo.card.toggleAriaLabel",
                                    )}
                                    onClick={() => toggleTheme()}
                                    className="group relative inline-flex h-11 w-20 shrink-0 cursor-pointer items-center rounded-full border-2 border-primary bg-neutral-500/15 p-1 transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                >
                                    <span
                                        className={`flex h-8 w-8 items-center justify-center rounded-full bg-primary text-black shadow-md transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                                            isLight
                                                ? "translate-x-9"
                                                : "translate-x-0"
                                        }`}
                                    >
                                        {isLight ? (
                                            <FiSun
                                                className="h-4 w-4"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <FiMoon
                                                className="h-4 w-4"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </span>
                                </button>

                                <span className="rounded-full border border-orange-500/35 bg-orange-500/5 px-4 py-1.5 text-xs font-medium text-primary">
                                    {t("HomeScreen.ThemeToggleDemo.card.badge")}
                                </span>
                            </div>

                            {/* Middle — Stacked Card Title */}
                            <h3 className="mt-10 font-title text-xl font-bold leading-snug text-text transition-colors duration-500 sm:text-2xl">
                                <span className="block">
                                    {t(
                                        "HomeScreen.ThemeToggleDemo.card.titleLine1",
                                    )}
                                </span>
                                <span className="mt-1 block">
                                    {t(
                                        "HomeScreen.ThemeToggleDemo.card.titleLine2",
                                    )}
                                </span>
                            </h3>

                            {/* Divider */}
                            <div className="my-7 border-t border-neutral-500/20 transition-colors duration-500" />

                            {/* Bottom Footnote */}
                            <div className="flex items-center gap-2.5 text-xs text-text-muted transition-colors duration-500 sm:text-sm">
                                <FiCheck
                                    className="h-4 w-4 shrink-0 text-primary"
                                    aria-hidden="true"
                                />
                                <span>
                                    {t(
                                        "HomeScreen.ThemeToggleDemo.card.footnote",
                                    )}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* -------------------------------------------------- */}
                    {/* 3 (Mobile, Last) / Left Bottom (Desktop) — CTA     */}
                    {/* -------------------------------------------------- */}
                    <div className="order-3 lg:order-none lg:col-span-6 lg:col-start-1 lg:row-start-2 lg:self-start">
                        <button
                            type="button"
                            onClick={() => scrollToSection("contacto")}
                            className="group inline-flex cursor-pointer items-center gap-2 rounded-full border border-neutral-500/35 px-5 py-2.5 font-body text-sm font-medium text-text transition-[border-color,box-shadow,color] duration-300 hover:border-[color-mix(in_srgb,var(--color-primary)_70%,transparent)] hover:shadow-[0_0_20px_color-mix(in_srgb,var(--color-primary)_35%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color-mix(in_srgb,var(--color-primary)_50%,transparent)]"
                        >
                            <span>
                                {t("HomeScreen.ThemeToggleDemo.cta")}
                            </span>
                            <FiArrowUpRight
                                className="h-4 w-4 shrink-0 text-primary transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                                aria-hidden="true"
                            />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default ThemeToggleDemo;
