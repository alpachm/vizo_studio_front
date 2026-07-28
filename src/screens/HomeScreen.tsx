// ---------------------------------------------------------------------------
// HomeScreen — Main landing screen view
// ---------------------------------------------------------------------------
import { useTranslation } from "react-i18next";
import type { IHomeScreenProps } from "../interfaces/HomeScreenInterface";

function HomeScreen(_props: IHomeScreenProps) {
    const { t } = useTranslation();

    return (
        <section className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
            <h1 className="font-title text-4xl font-bold text-[var(--color-primary)] sm:text-5xl lg:text-6xl">
                {t("homeScreen.title")}
            </h1>
            <p className="mt-4 max-w-xl text-lg text-[var(--color-text-muted)] sm:text-xl">
                {t("homeScreen.subtitle")}
            </p>
        </section>
    );
}

export default HomeScreen;
