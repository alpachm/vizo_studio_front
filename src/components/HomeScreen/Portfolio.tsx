// ---------------------------------------------------------------------------
// Portfolio — "Menos palabras. Más «quiero eso»." editorial project grid.
// Two blocks of four immersive image cards with overlaid copy, top-right
// diagonal arrow badge, and smooth hover zoom (`hover:scale-105`).
// ---------------------------------------------------------------------------
import { useTranslation } from "react-i18next";
import { FiArrowUpRight } from "react-icons/fi";
import type {
    IPortfolioProjectItem,
    IPortfolioProps,
} from "../../interfaces/HomeScreenInterface";
import portfolio1 from "../../assets/HomeScreen/images/portfolio/portfolio-1.webp";
import portfolio2 from "../../assets/HomeScreen/images/portfolio/portfolio-2.webp";
import portfolio3 from "../../assets/HomeScreen/images/portfolio/portfolio-3.webp";
import portfolio4 from "../../assets/HomeScreen/images/portfolio/portfolio-4.webp";
import portfolio5 from "../../assets/HomeScreen/images/portfolio/portfolio-5.webp";
import portfolio6 from "../../assets/HomeScreen/images/portfolio/portfolio-6.webp";
import portfolio7 from "../../assets/HomeScreen/images/portfolio/portfolio-7.webp";
import portfolio8 from "../../assets/HomeScreen/images/portfolio/portfolio-8.webp";

/** Number of project cards shown per editorial row (block). */
const PROJECTS_PER_BLOCK = 4;

/** The eight featured projects, rendered as two editorial blocks of four. */
const PORTFOLIO_PROJECTS: IPortfolioProjectItem[] = [
    {
        id: "foundation",
        image: portfolio1,
        categoryKey: "Portfolio.projects.1.category",
        titleKey: "Portfolio.projects.1.title",
        imageAltKey: "Portfolio.projects.1.imageAlt",
    },
    {
        id: "lawyer",
        image: portfolio2,
        categoryKey: "Portfolio.projects.2.category",
        titleKey: "Portfolio.projects.2.title",
        imageAltKey: "Portfolio.projects.2.imageAlt",
    },
    {
        id: "psychologist",
        image: portfolio3,
        categoryKey: "Portfolio.projects.3.category",
        titleKey: "Portfolio.projects.3.title",
        imageAltKey: "Portfolio.projects.3.imageAlt",
    },
    {
        id: "developer",
        image: portfolio4,
        categoryKey: "Portfolio.projects.4.category",
        titleKey: "Portfolio.projects.4.title",
        imageAltKey: "Portfolio.projects.4.imageAlt",
    },
    {
        id: "motorcycle",
        image: portfolio5,
        categoryKey: "Portfolio.projects.5.category",
        titleKey: "Portfolio.projects.5.title",
        imageAltKey: "Portfolio.projects.5.imageAlt",
    },
    {
        id: "finance",
        image: portfolio6,
        categoryKey: "Portfolio.projects.6.category",
        titleKey: "Portfolio.projects.6.title",
        imageAltKey: "Portfolio.projects.6.imageAlt",
    },
    {
        id: "ecommerce",
        image: portfolio7,
        categoryKey: "Portfolio.projects.7.category",
        titleKey: "Portfolio.projects.7.title",
        imageAltKey: "Portfolio.projects.7.imageAlt",
    },
    {
        id: "corporate",
        image: portfolio8,
        categoryKey: "Portfolio.projects.8.category",
        titleKey: "Portfolio.projects.8.title",
        imageAltKey: "Portfolio.projects.8.imageAlt",
    },
];

/** Splits the project list into editorial blocks of `PROJECTS_PER_BLOCK`. */
const PORTFOLIO_BLOCKS: IPortfolioProjectItem[][] = Array.from(
    { length: Math.ceil(PORTFOLIO_PROJECTS.length / PROJECTS_PER_BLOCK) },
    (_, blockIndex) =>
        PORTFOLIO_PROJECTS.slice(
            blockIndex * PROJECTS_PER_BLOCK,
            blockIndex * PROJECTS_PER_BLOCK + PROJECTS_PER_BLOCK,
        ),
);

function Portfolio(_props: IPortfolioProps) {
    const { t } = useTranslation();

    // Split the localized editorial headline after the first sentence period so
    // "Menos palabras." sits on line 1 and "Más «quiero eso»." stacks underneath.
    const rawTitle = t("Portfolio.title");
    const [firstTitleLine, ...restTitleLines] = rawTitle.split(/(?<=\.)\s+/);
    const secondTitleLine = restTitleLines.join(" ");

    const renderProjectCard = (project: IPortfolioProjectItem) => (
        <article
            key={project.id}
            className="group relative isolate flex aspect-[4/3] w-full flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 transition-colors duration-300 hover:border-white/25"
        >
            {/* Immersive background screenshot — subtle zoom on card hover. */}
            <img
                src={project.image}
                alt={t(project.imageAltKey)}
                loading="lazy"
                className="
                    absolute inset-0 -z-20 h-full w-full object-cover object-top
                    transition-transform duration-500 ease-out
                    hover:scale-105 group-hover:scale-105
                "
            />

            {/* Editorial dark scrim so overlaid badge and typography stay legible. */}
            <div
                aria-hidden="true"
                className="
                    pointer-events-none absolute inset-0 -z-10
                    bg-gradient-to-t from-black/90 via-black/45 to-black/15
                    transition-opacity duration-300 group-hover:from-black/95
                "
            />

            {/* Top-right circular diagonal arrow badge. */}
            <div className="flex justify-end p-4 sm:p-5">
                <span
                    aria-hidden="true"
                    className="
                        flex h-9 w-9 items-center justify-center rounded-full
                        border border-white/15 bg-black/60 text-white backdrop-blur-md
                        transition-all duration-300
                        group-hover:border-white/30 group-hover:bg-black/80
                    "
                >
                    <FiArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
            </div>

            {/* Overlaid card copy — category overline + project title. */}
            <div className="flex flex-col gap-1.5 p-5 pt-0 sm:p-6 sm:pt-0">
                <p className="text-xs font-medium uppercase tracking-widest text-primary">
                    {t(project.categoryKey)}
                </p>
                <h3 className="font-title text-base font-bold leading-snug text-white sm:text-lg">
                    {t(project.titleKey)}
                </h3>
            </div>
        </article>
    );

    return (
        <section id="portfolio" className="w-full bg-bg py-20 sm:py-24 lg:py-28">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section header — stacked editorial headline + supporting subtitle. */}
                <div className="max-w-3xl">
                    <h2 className="font-title text-3xl font-bold leading-tight tracking-tight text-text sm:text-4xl lg:text-5xl">
                        <span className="block">{firstTitleLine}</span>
                        {secondTitleLine ? (
                            <span className="mt-1 block">{secondTitleLine}</span>
                        ) : null}
                    </h2>
                    <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-muted sm:text-xl">
                        {t("Portfolio.subtitle")}
                    </p>
                </div>

                {/* Two editorial blocks of four immersive project cards. */}
                <div className="mt-12 space-y-6 lg:mt-16 lg:space-y-8">
                    {PORTFOLIO_BLOCKS.map((block, blockIndex) => (
                        <div
                            key={`portfolio-block-${blockIndex}`}
                            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8"
                        >
                            {block.map(renderProjectCard)}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Portfolio;
