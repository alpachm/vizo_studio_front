// ---------------------------------------------------------------------------
// FluyaVital — Placeholder screen view
// ---------------------------------------------------------------------------
import { useTranslation } from "react-i18next";
import type { IFluyaVitalProps } from "../interfaces/FluyaVitalInterface";
import styles from "./FluyaVital.module.css";

export const FluyaVital: React.FC<IFluyaVitalProps> = () => {
    const { t } = useTranslation();

    return (
        <div className={styles.fvContainer}>
            <h1 className={styles.fvTitle}>
                {t("FluyaVital.title")}
            </h1>
            <span className={styles.fvAccent} aria-hidden="true" />
            <p className={styles.fvSubtitle}>
                {t("FluyaVital.subtitle")}
            </p>
        </div>
    );
};

export default FluyaVital;
