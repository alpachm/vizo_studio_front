// ---------------------------------------------------------------------------
// Portfolio — "Menos palabras. Más «quiero eso»." editorial project grid.
// Two blocks of four dark minimalist cards; each thumbnail performs a soft,
// smooth zoom on hover (`overflow-hidden` + `group-hover:scale-105`).
// ---------------------------------------------------------------------------
import { useTranslation } from "react-i18next";
import type { IPortfolioProjectItem } from "../../interfaces/HomeScreenInterface";
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

function Portfolio() {
    const { t } = useTranslation();

    const renderProjectCard = (project: IPortfolioProjectItem) => (
        <article
            key={project.id}
            className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 transition-colors duration-300 hover:border-white/25"
        >
            {/* Thumbnail — soft zoom on hover, clipped by the overflow wrapper. */}
            <div className="relative aspect-[4/3] w-full overflow-hidden">
                <img
                    src={project.image}
                    alt={t(project.imageAltKey)}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
            </div>

            {/* Card copy — category overline + project title. */}
            <div className="flex flex-col gap-2 p-5 sm:p-6">
                <p className="text-xs font-medium uppercase tracking-widest text-primary">
                    {t(project.categoryKey)}
                </p>
                <h3 className="font-title text-lg font-bold leading-snug text-white sm:text-xl">
                    {t(project.titleKey)}
                </h3>
            </div>
        </article>
    );

    return (
        <section id="portfolio" className="w-full bg-bg py-20 sm:py-24 lg:py-28">
            <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                {/* Section header — editorial catchphrase + supporting line. */}
                <div className="max-w-3xl">
                    <h2 className="font-title text-3xl font-bold tracking-tight text-text sm:text-4xl lg:text-5xl">
                        {t("Portfolio.title")}
                    </h2>
                    <p className="mt-4 max-w-2xl text-lg leading-relaxed text-text-muted sm:text-xl">
                        {t("Portfolio.subtitle")}
                    </p>
                </div>

                {/* Two editorial blocks of four project cards. */}
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
