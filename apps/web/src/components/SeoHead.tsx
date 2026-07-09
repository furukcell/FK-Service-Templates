import Head from "next/head";

const defaultTitle = "FK Service Templates | Hazır İşletme Web Sitesi";
const defaultDescription = "Küçük işletmeler için yönetilebilir admin panelli hazır web sitesi şablonları.";

export function SeoHead({
  title = defaultTitle,
  description = defaultDescription,
  canonicalPath = "/",
  imageUrl
}: {
  title?: string;
  description?: string;
  canonicalPath?: string;
  imageUrl?: string;
}) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://example.com";
  const canonicalUrl = `${siteUrl}${canonicalPath}`;

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="canonical" href={canonicalUrl} />
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
