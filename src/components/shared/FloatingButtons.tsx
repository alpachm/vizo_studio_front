// ---------------------------------------------------------------------------
// FloatingButtons — Global floating action buttons pinned to the bottom-right
//                   corner of every screen, above all other content. Hidden
//                   while the Home hero is in view to keep focus on the message.
// ---------------------------------------------------------------------------
import { useTranslation } from "react-i18next";
import { FaWhatsapp } from "react-icons/fa";
import { useHeroVisibility } from "../../context/HeroVisibilityContext";

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const WHATSAPP_URL = import.meta.env.VITE_WHATSAPP_URL;

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

function FloatingButtons() {
    const { t } = useTranslation();
    const { isHeroInView } = useHeroVisibility();

    return (
        <div
            role="group"
            aria-label={t("FloatingButtons.ariaLabel")}
            className={`fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3 ease-[cubic-bezier(0.22,1,0.36,1)] transition-[opacity,transform] duration-500 ${
                isHeroInView
                    ? "pointer-events-none translate-y-4 opacity-0"
                    : "translate-y-0 opacity-100"
            }`}
        >
            <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                tabIndex={isHeroInView ? -1 : 0}
                aria-label={t("FloatingButtons.contactWhatsApp")}
                title={t("FloatingButtons.contactWhatsApp")}
                className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-whatsapp text-white shadow-lg shadow-whatsapp/40 hover:shadow-xl transition-transform duration-200 ease-out hover:scale-110 hover:bg-whatsapp-dark focus:outline-none focus-visible:ring-2 focus-visible:ring-whatsapp focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
            >
                <FaWhatsapp className="h-7 w-7 shrink-0" aria-hidden="true" />
            </a>
        </div>
    );
}

export default FloatingButtons;
