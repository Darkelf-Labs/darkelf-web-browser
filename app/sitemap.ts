import { MetadataRoute } from 'next';
import { getAllReleases } from '@/lib/releases';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://darkelfbrowser.com';
  const now = new Date();

  const releasePages = getAllReleases().map((r) => ({
    url: `${base}/releases/${r.product}/${encodeURIComponent(r.version)}`,
    lastModified: new Date(r.dateISO),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [
    {
      url: base,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${base}/download-center`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${base}/releases`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${base}/security`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${base}/gallery`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    ...releasePages,
  ];
}
