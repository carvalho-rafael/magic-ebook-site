import type { MetadataRoute } from "next";

export const revalidate = 3600; // 1 hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  console.log("Generating sitemap...");
  const baseUrl =
    process.env.NEXT_PUBLIC_WEB_URL || "https://www.magicebook.com.br";

  const defaultUrls: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/login`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${baseUrl}/signup`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];

  const ebooksLabels = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/ebooks/list-labels`
  );

  if (!ebooksLabels.ok) {
    console.error("Failed to fetch ebook labels:", ebooksLabels.statusText);
    return defaultUrls;
  }

  const labels: string[] = await ebooksLabels.json();

  const ebookUrls: MetadataRoute.Sitemap = labels.map((label) => ({
    url: `${baseUrl}/checkout/${label}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...defaultUrls, ...ebookUrls];
}
