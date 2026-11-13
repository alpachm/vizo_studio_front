// ---------------------------------------------------------------------------
// ValueProposition — Sticky scroll-scrub "text illumination" section.
//
// A tall scroll runway (`relative h-[250vh] …`) creates the native space that
// temporarily "locks" the section while a sticky inner viewport stays pinned.
// As the user scrolls, the headline and subtitle words brighten word-by-word —
// from a dimmed neutral state to crisp white (the brand accent illuminates to
// `primary`) — driven directly by Framer Motion's useScroll + useTransform.
// ---------------------------------------------------------------------------
import { Fragment, useLayoutEffect, useMemo, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useHeroVisibility } from "../../context/HeroVisibilityContext";
import type {
    IValuePropositionProps,
    IValuePropositionWordGroup,
    IValuePropositionWordProps,
} from "../../interfaces/HomeScreenInterface";

/** Portion of the scroll progress spent illuminating the words; the remaining
 *  15% is reserved to smoothly release the sticky lock before the next section. */
const REVEAL_FINAL_PROGRESS = 0.85;

/** Dimmed ("off") state — the Tailwind `neutral-700` value. */
const COLOR_OFF = "#404040";

/** Fully illuminated ("on") state — pure white (`text-white`). */
const COLOR_ON = "#ffffff";

/** Brand accent the branded subtitle group illuminates to (mirrors `primary`). */
const COLOR_PRIMARY = "#f3661d";

/**
 * Splits a plain headline string into its word tokens, dropping empty entries.
 */
function splitWords(text: string): string[] {
    return text.split(/\s+/).filter(Boolean);
}

/**
 * Splits the subtitle into word groups, flagging any text wrapped in the i18n
 * `<brand>…</brand>` interpolation tags so it can illuminate to `primary`.
 */
function splitSubtitle(text: string): IValuePropositionWordGroup[] {
    const groups: IValuePropositionWordGroup[] = [];
    const brandPattern = /<brand>(.*?)<\/brand>/g;

    let match: RegExpExecArray | null;
    let cursor = 0;

    while ((match = brandPattern.exec(text)) !== null) {
        const preceding = text.slice(cursor, match.index).trim();
        preceding
            .split(/\s+/)
            .filter(Boolean)
            .forEach((word) => groups.push({ text: word, isBrand: false }));

        match[1]
            .split(/\s+/)
            .filter(Boolean)
            .forEach((word) => groups.push({ text: word, isBrand: true }));

        cursor = match.index + match[0].length;
    }

    text
        .slice(cursor)
        .trim()
        .split(/\s+/)
        .filter(Boolean)
        .forEach((word) => groups.push({ text: word, isBrand: false }));

    return groups;
}

/**
 * Computes the scroll-progress window `[start, end]` over which the Nth word
 * group brightens. Words are staggered evenly across the reveal runway.
 */
function revealRange(unitIndex: number, unitCount: number): [number, number] {
    const step = unitCount > 0 ? REVEAL_FINAL_PROGRESS / unitCount : 0;
    return [unitIndex * step, (unitIndex + 1) * step];
}

/** A single word that brightens in lockstep with the shared scroll progress. */
function IlluminatedWord({
    progress,
    range,
    from,
    to,
    reduceMotion,
    className = "",
    children,
}: IValuePropositionWordProps) {
    const color = useTransform(progress, range, [from, to]);

    return (
        <motion.span
            style={{ color: reduceMotion ? to : color }}
            className={className}
        >
            {children}
        </motion.span>
    );
}

function ValueProposition({ className = "" }: IValuePropositionProps) {
    const { t } = useTranslation();
    const containerRef = useRef<HTMLElement>(null);
    const { setIsValuePropositionInView } = useHeroVisibility();
    const shouldReduceMotion = useReducedMotion() ?? false;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"],
    });

    const title = t("HomeScreen.ValueProposition.title");
    const subtitle = t("HomeScreen.ValueProposition.subtitle");

    const headlineWords = useMemo(() => splitWords(title), [title]);
    const subtitleGroups = useMemo(() => splitSubtitle(subtitle), [subtitle]);
    const unitCount = headlineWords.length + subtitleGroups.length;

    // Report visibility upward so the global Header & FloatingButtons can step
    // aside while the Value Proposition occupies the viewport. A synchronous
    // first evaluation (inside useLayoutEffect, before paint) prevents a
    // one-frame flash on load.
    useLayoutEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const applyVisibility = (isInView: boolean) => setIsValuePropositionInView(isInView);

        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const rect = container.getBoundingClientRect();
        applyVisibility(rect.bottom > 0 && rect.top < viewportHeight);

        const observer = new IntersectionObserver(
            ([entry]) => applyVisibility(entry.isIntersecting),
            { threshold: 0 },
        );
        observer.observe(container);

        return () => {
            observer.disconnect();
            setIsValuePropositionInView(false);
        };
    }, [setIsValuePropositionInView]);

    return (
        <section
            id="value-proposition"
            ref={containerRef}
            className={`relative h-[250vh] w-full bg-black scroll-mt-28 ${className}`}
        >
            <div className="sticky top-0 left-0 h-screen w-screen flex flex-col items-center justify-center text-center px-6 z-10">
                {/* Centered display headline — words illuminate sequentially. */}
                <h2 className="font-title text-3xl font-bold leading-[1.08] tracking-tight text-balance sm:text-5xl md:text-6xl lg:text-7xl">
                    {headlineWords.map((word, index) => (
                        <Fragment key={`headline-${index}`}>
                            <IlluminatedWord
                                progress={scrollYProgress}
                                range={revealRange(index, unitCount)}
                                from={COLOR_OFF}
                                to={COLOR_ON}
                                reduceMotion={shouldReduceMotion}
                            >
                                {word}
                            </IlluminatedWord>
                            {index < headlineWords.length - 1 ? " " : null}
                        </Fragment>
                    ))}
                </h2>

                {/* Supporting subtitle — non-brand words brighten to white while
                    the branded group brightens to the brand accent. */}
                <p className="mt-6 max-w-2xl font-body text-base font-medium leading-relaxed sm:text-lg md:mt-8 md:text-xl">
                    {subtitleGroups.map((group, index) => (
                        <Fragment key={`subtitle-${index}`}>
                            <IlluminatedWord
                                progress={scrollYProgress}
                                range={revealRange(headlineWords.length + index, unitCount)}
                                from={COLOR_OFF}
                                to={group.isBrand ? COLOR_PRIMARY : COLOR_ON}
                                reduceMotion={shouldReduceMotion}
                                className={group.isBrand ? "font-semibold" : ""}
                            >
                                {group.text}
                            </IlluminatedWord>
                            {index < subtitleGroups.length - 1 ? " " : null}
                        </Fragment>
                    ))}
                </p>
            </div>
        </section>
    );
}

export default ValueProposition;
