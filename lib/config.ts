const name = process.env.NEXT_PUBLIC_SITE_NAME ?? "Ventura Auto";
const email = process.env.NEXT_PUBLIC_SITE_EMAIL ?? "halo@venturaauto.id";
const phone = process.env.NEXT_PUBLIC_SITE_PHONE ?? "+62 812 1000 2000";
const phoneDigits = phone.replace(/\D/g, "");

export const siteConfig = {
  name,
  wordmark: "Ventura",
  email,
  phone,
  phoneTel: `tel:+${phoneDigits}`,
  whatsapp: `https://wa.me/${phoneDigits}?text=${encodeURIComponent(
    "Halo Ventura Auto, saya ingin tanya seputar sewa mobil.",
  )}`,
  socials: {
    instagram: "#",
    x: "#",
    youtube: "#",
    facebook: "#",
  },
} as const;