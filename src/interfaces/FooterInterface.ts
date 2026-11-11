// ---------------------------------------------------------------------------
// FooterInterface — Types & interfaces for the Footer component
// ---------------------------------------------------------------------------

import type { IconType } from "react-icons";

/** A single navigation link displayed in the footer. */
export interface FooterNavItem {
    /** Translation key used with i18next `t()` */
    labelKey: string;
    /** Route destination path */
    to: string;
}

/** A single social media link rendered in the footer. */
export interface FooterSocialLink {
    /** Translation key used for the link's accessible label. */
    labelKey: string;
    /** External URL for the social platform. */
    href: string;
    /** Brand icon component from react-icons. */
    icon: IconType;
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