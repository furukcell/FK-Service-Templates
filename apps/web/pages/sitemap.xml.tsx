import type { GetServerSideProps } from "next";

const routes = [
  "/",
  "/appointment",
  "/salon",
  "/real-estate",
  "/cafe",
  "/kindergarten",
  "/event-venue",
  "/properties",
  "/hakkimizda",
  "/iletisim",
  "/gizlilik-politikasi",
  "/kvkk-aydinlatma-metni",
  "/cerez-politikasi",
  "/kullanim-kosullari",
  "/sss"
];

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const now = new Date().toISOString();
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((route) => `  <url><loc>${siteUrl}${route}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>${route === "/" ? "1.0" : "0.7"}</priority></url>`).join("\n")}
</urlset>`;
  res.setHeader("Content-Type", "application/xml");
  res.write(body);
  res.end();
  return { props: {} };
};

export default function SitemapXml() {
  return null;
}