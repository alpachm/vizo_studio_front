// ---------------------------------------------------------------------------
// NotFound — Minimalist 404 Error screen inspired by clean editorial layouts
// ---------------------------------------------------------------------------
import { useEffect } from "react";
import { Link, useNavigate, useRouter } from "@tanstack/react-router";
import { motion, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
    FiAlertCircle,
    FiCode,
    FiGlobe,
    FiSlash,
    FiWifiOff,
} from "react-icons/fi";
import { useScrollToSection } from "../hooks/useScrollToSection";
import { getGlitchAnimationStyles } from "../utils/glitchAnimation";
import { skipNextHomeScrollRestore } from "../utils/homeScrollPosition";
import type { INotFoundScreenProps } from "../interfaces/NotFoundInterface";

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

const NOT_FOUND_GLITCH_STYLES = getGlitchAnimationStyles({
    className: "vizo-404-glitch",
    fontSwapMode: "mono-to-playfair",
    durationSeconds: 9,
});

function NotFound(_props: INotFoundScreenProps) {
    const { t } = useTranslation();
    const router = useRouter();
    const navigate = useNavigate();
    const { scrollToSection } = useScrollToSection();
    const shouldReduceMotion = useReducedMotion() ?? false;

    useEffect(() => {
        window.scrollTo({ top: 0, behavior: "instant" });
    }, []);

    const handleBack = () => {
        if (window.history.length > 1) {
            router.history.back();
        } else {
            void navigate({ to: "/", resetScroll: false });
        }
    };

    const handleContact = () => {
        skipNextHomeScrollRestore();
        void navigate({ to: "/" }).then(() => {
            window.setTimeout(() => {
                scrollToSection("contacto");
            }, 120);
        });
    };

    return (
        <section className="relative flex min-h-[calc(100dvh-5rem)] w-full items-center justify-center overflow-clip bg-bg pt-28 pb-16 text-text sm:pt-32 sm:pb-20">
            <style>{NOT_FOUND_GLITCH_STYLES}</style>

            <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-12">
                <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-12">
                    {/* ========================================================
                        LEFT COLUMN — 404, Headline, Short Copy & Pill Buttons
                        ======================================================== */}
                    <motion.div
                        initial={shouldReduceMotion ? false : { opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, ease: EASE_OUT }}
                        className="flex flex-col items-start text-left lg:col-span-6"
                    >
                        {/* Giant 404 */}
                        <div className="select-none font-title text-[clamp(5.25rem,14vw,9.5rem)] font-bold leading-none tracking-tight text-primary">
                            <span
                                className="vizo-404-glitch text-primary"
                                data-text={t("NotFoundScreen.code")}
                            >
                                {t("NotFoundScreen.code")}
                            </span>
                        </div>

                        {/* Two-line minimal heading */}
                        <h1 className="mt-6 font-title text-2xl font-bold leading-snug tracking-tight text-text sm:text-3xl lg:text-4xl">
                            <span className="block">{t("NotFoundScreen.oops")}</span>
                            <span className="mt-1 block font-normal text-text/90">
                                {t("NotFoundScreen.subtitle")}
                            </span>
                        </h1>

                        {/* Short two-line muted copy */}
                        <p className="mt-6 max-w-md font-body text-sm leading-relaxed text-text-muted sm:text-base">
                            <span className="block">
                                {t("NotFoundScreen.descriptionLine1")}
                            </span>
                            <span className="block">
                                {t("NotFoundScreen.descriptionLine2")}
                            </span>
                        </p>

                        {/* Clean Pill Buttons */}
                        <div className="mt-9 flex flex-wrap items-center gap-3.5">
                            <button
                                type="button"
                                onClick={handleBack}
                                className="cursor-pointer rounded-full bg-primary px-7 py-2.5 font-body text-xs font-semibold tracking-wider text-white transition-all duration-200 hover:opacity-90 hover:shadow-[0_0_20px_rgba(243,102,29,0.35)] sm:text-sm"
                            >
                                {t("NotFoundScreen.backButton")}
                            </button>

                            <Link
                                to="/"
                                resetScroll={false}
                                className="rounded-full bg-primary px-7 py-2.5 font-body text-xs font-semibold tracking-wider text-white transition-all duration-200 hover:opacity-90 hover:shadow-[0_0_20px_rgba(243,102,29,0.35)] sm:text-sm"
                            >
                                {t("NotFoundScreen.homeButton")}
                            </Link>

                            <button
                                type="button"
                                onClick={handleContact}
                                className="cursor-pointer rounded-full border border-orange-500/45 bg-orange-500/10 px-7 py-2.5 font-body text-xs font-semibold tracking-wider text-primary transition-all duration-200 hover:bg-primary hover:text-white sm:text-sm"
                            >
                                {t("NotFoundScreen.contactButton")}
                            </button>
                        </div>
                    </motion.div>

                    {/* ========================================================
                        RIGHT COLUMN — Minimalist Broken Website Illustration
                        ======================================================== */}
                    <motion.div
                        role="img"
                        aria-label={t("NotFoundScreen.illustrationAria")}
                        initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.96 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT }}
                        className="relative mx-auto flex w-full max-w-md items-center justify-center lg:col-span-6 lg:max-w-none"
                    >
                        <div className="relative h-80 w-full max-w-md sm:h-96">
                            {/* Subtle ambient glow behind the broken browser */}
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute left-1/2 top-1/2 h-56 w-56 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange-500/10 blur-3xl"
                            />

                            {/* Disconnected orbital wireframe rings (tangled/unplugged feel) */}
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rotate-12 rounded-full border border-dashed border-neutral-500/30 sm:h-72 sm:w-72"
                            />
                            <div
                                aria-hidden="true"
                                className="pointer-events-none absolute left-1/2 top-1/2 h-52 w-72 -translate-x-1/2 -translate-y-1/2 -rotate-12 rounded-full border border-orange-500/25 sm:h-60 sm:w-80"
                            />

                            {/* TOP-LEFT HALF — Tilted Browser Window Frame */}
                            <motion.div
                                animate={
                                    shouldReduceMotion
                                        ? undefined
                                        : { y: [0, -6, 0], rotate: [-4, -5.5, -4] }
                                }
                                transition={{
                                    duration: 5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="absolute left-2 top-6 w-64 -rotate-3 rounded-2xl border border-neutral-500/30 bg-[color-mix(in_srgb,var(--color-bg)_92%,transparent)] p-4 shadow-xl backdrop-blur-md sm:left-6 sm:w-72"
                            >
                                {/* Browser top bar */}
                                <div className="flex items-center gap-2 border-b border-neutral-500/20 pb-3">
                                    <span className="h-2.5 w-2.5 rounded-full bg-orange-500/80" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-neutral-500/40" />
                                    <span className="h-2.5 w-2.5 rounded-full bg-neutral-500/40" />
                                    <div className="ml-1.5 flex flex-1 items-center gap-1.5 rounded-md border border-neutral-500/20 bg-neutral-500/[0.06] px-2 py-1">
                                        <FiGlobe className="h-3 w-3 shrink-0 text-primary" />
                                        <span className="truncate font-title text-[10px] text-text-muted">
                                            {t("NotFoundScreen.browserUrl")}
                                        </span>
                                    </div>
                                </div>

                                {/* Broken wireframe skeleton inside top window */}
                                <div className="mt-4 space-y-2.5">
                                    <div className="h-3 w-2/3 rounded-full bg-neutral-500/20" />
                                    <div className="h-2.5 w-full rounded-full bg-neutral-500/15" />
                                    <div className="h-2.5 w-4/5 rounded-full bg-neutral-500/15" />
                                </div>

                                {/* Jagged fracture line indicator at bottom edge */}
                                <div className="mt-4 flex items-center justify-between border-t border-dashed border-orange-500/40 pt-2.5">
                                    <span className="font-title text-[10px] text-primary">
                                        {t("NotFoundScreen.errorTag")}
                                    </span>
                                    <FiWifiOff className="h-3.5 w-3.5 text-primary" />
                                </div>
                            </motion.div>

                            {/* CENTER DISCONNECTED LINK NODE */}
                            <div className="absolute left-1/2 top-1/2 z-20 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl border border-orange-500/45 bg-bg text-primary shadow-[0_0_25px_rgba(243,102,29,0.25)]">
                                <FiSlash className="h-6 w-6" aria-hidden="true" />
                            </div>

                            {/* BOTTOM-RIGHT HALF — Detached Broken Layout Fragment */}
                            <motion.div
                                animate={
                                    shouldReduceMotion
                                        ? undefined
                                        : { y: [0, 6, 0], rotate: [5, 6.5, 5] }
                                }
                                transition={{
                                    duration: 5.5,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="absolute bottom-6 right-2 w-60 rotate-6 rounded-2xl border border-orange-500/35 bg-[color-mix(in_srgb,var(--color-bg)_92%,transparent)] p-4 shadow-xl backdrop-blur-md sm:right-6 sm:w-64"
                            >
                                <div className="flex items-center justify-between border-b border-dashed border-neutral-500/25 pb-2.5">
                                    <span className="inline-flex items-center gap-1.5 font-title text-xs font-bold text-primary">
                                        <FiAlertCircle className="h-3.5 w-3.5" />
                                        {t("NotFoundScreen.code")}
                                    </span>
                                    <FiCode className="h-4 w-4 text-text-muted" />
                                </div>

                                <div className="mt-3.5 grid grid-cols-2 gap-2.5">
                                    <div className="h-12 rounded-xl border border-neutral-500/20 bg-neutral-500/[0.05]" />
                                    <div className="h-12 rounded-xl border border-orange-500/25 bg-orange-500/[0.06]" />
                                </div>

                                <div className="mt-3 h-2.5 w-3/5 rounded-full bg-neutral-500/20" />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}

export default NotFound;
