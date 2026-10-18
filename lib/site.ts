export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Prefix a public asset path with the base path (GitHub Pages serves the site under /newoptivads). */
export const asset = (path: string) => `${BASE_PATH}${path}`;

export const LEAD_ENDPOINT = process.env.NEXT_PUBLIC_LEAD_ENDPOINT || `${BASE_PATH}/api/lead`;

export const CONTACT = {
  email: "partnership@optivads.com",
  phone: "+44 7739 364474",
  phoneHref: "tel:+447739364474",
  linkedin: "https://www.linkedin.com/company/optivadslimited",
  instagram: "https://www.instagram.com/optivadslimited/",
  x: "https://x.com/optivadslimited",
  london: "London, United Kingdom, WC2H 9JQ",
  casablanca: "Residence Shehrazade 3, Etage 5, N°22, Palmiers, Casablanca",
};

export const NAV = [
  { href: "/", label: "Home" },
  { href: "/performance-media-buying", label: "Performance Media Buying" },
  { href: "/creator-content-marketing", label: "Creator & Content" },
  { href: "/#clients", label: "Clients", neverActive: true },
];

export const CLIENTS = [
  { file: "nirio", name: "Nirio" },
  { file: "scamless", name: "Scamless" },
  { file: "albert", name: "Albert" },
  { file: "gemini", name: "Gemini" },
  { file: "veepn", name: "VeePN" },
  { file: "walking", name: "Walking by Slimkit" },
  { file: "fitme", name: "FitMe" },
  { file: "sendwave", name: "Sendwave" },
  { file: "worldremit", name: "WorldRemit" },
  { file: "zero", name: "Zero" },
  { file: "remitly", name: "Remitly" },
  { file: "isybank", name: "isybank" },
  { file: "nutriwalking", name: "NutriWalking" },
  { file: "deblock", name: "Deblock" },
  { file: "youhodler", name: "YouHodler" },
  { file: "vpnhotspot", name: "VPN Hotspot" },
];
