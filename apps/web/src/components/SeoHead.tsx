import Head from "next/head";

const defaultTitle = "Hazır İşletme Web Sitesi";
const defaultDescription = "Küçük işletmeler için yönetilebilir admin panelli hazır web sitesi.";

export function SeoHead({
  title = defaultTitle,
  description = defaultDescription,
  canonicalPath = "/",
  imageUrl,
  noIndex = false
}: {
  title?: string;
  description?: string;
  canonicalPath?: string;
  imageUrl?: string;
  noIndex?: boolean;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const canonicalUrl = `${siteUrl}${canonicalPath}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#12312a" />
      {noIndex ? <meta name="robots" content="noindex,nofollow" /> : null}
      <link rel="canonical" href={canonicalUrl} />
      <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
      <link rel="manifest" href="/site.webmanifest" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      {imageUrl ? <meta property="og:image" content={imageUrl} /> : null}
      <meta name="twitter:card" content={imageUrl ? "summary_large_image" : "summary"} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {imageUrl ? <meta name="twitter:image" content={imageUrl} /> : null}
    </Head>
  );
}
