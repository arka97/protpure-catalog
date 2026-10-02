/* Primary navigation, shared by the header, the mobile menu and the footer. */

export interface NavItem {
  label: string;
  to: string;
  /** Opens a flyout on large screens. */
  menu?: "products" | "applications";
}

export const NAV: NavItem[] = [
  { label: "Products", to: "/products", menu: "products" },
  { label: "Applications", to: "/applications", menu: "applications" },
  { label: "Services", to: "/services" },
  { label: "Technology", to: "/technology" },
  { label: "Company", to: "/about" },
  { label: "Resources", to: "/resources" },
];
