// ---------------------------------------------------------------------------
// FooterInterface — Types & interfaces for the Footer component
// ---------------------------------------------------------------------------

/** A single navigation link displayed in the footer. */
export interface FooterNavItem {
    /** Translation key used with i18next `t()` */
    labelKey: string;
    /** Route destination path */
    to: string;
}

/** Props accepted by the Footer component. */
export interface FooterProps {
    /** Optional custom nav items; defaults to standard blog/services/about links. */
    navItems?: FooterNavItem[];
    /** Optional email address for the contact section. */
    email?: string;
    /** Optional WhatsApp phone number for the contact section. */
    whatsapp?: string;
}