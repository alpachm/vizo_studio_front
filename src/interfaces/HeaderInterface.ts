// ---------------------------------------------------------------------------
// HeaderInterface — Types & interfaces for the Header component
// ---------------------------------------------------------------------------

/** A single navigation link displayed in the header. */
export interface NavItem {
    /** Translation key used with i18next `t()` */
    labelKey: string;
    /** TanStack Router destination path */
    to: string;
}

/** Props accepted by the Header component (currently reserved for future expansion). */
export interface HeaderProps {
    /** Optional custom nav items; defaults to standard blog/services/about links. */
    navItems?: NavItem[];
}