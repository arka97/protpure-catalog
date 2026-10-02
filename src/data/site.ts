/* Company constants used across the site. Sources: 2026 brochures and datasheets supplied by the client. */

export const SITE = {
  name: "ProtPure",
  legalName: "Protpure Tech Pvt. Ltd.",
  url: "https://protpure.com",
  tagline: "Purity that Drives Results",
  description:
    "ProtPure develops and manufactures agarose chromatography resins in Anand, India: metal affinity, ion exchange, hydrophobic interaction, mixed-mode and size exclusion media, pre-packed columns and downstream bioprocessing services.",
  email: "info@protpure.com",
  phone: "+91 94265 96644",
  phoneHref: "tel:+919426596644",
  whatsappNumber: "919426596644",
  linkedin: "https://www.linkedin.com/company/protpure-tech-pvt-ltd/",
  address: {
    lines: ["A2, Plot No. A2/440/2", "Opp. Paragon Paints, GIDC V.U. Nagar", "Anand – 388121, Gujarat, India"],
    locality: "Anand",
    region: "Gujarat",
    postalCode: "388121",
    country: "IN",
  },
  founded: "2023",
} as const;

export const MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  "Protpure Tech Pvt Ltd, GIDC Vitthal Udyog Nagar, Anand, Gujarat 388121",
)}`;

export function whatsappUrl(text: string) {
  return `https://wa.me/${SITE.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export function mailtoUrl(subject: string, body: string) {
  return `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
