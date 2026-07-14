import { getCollection } from 'astro:content';

export const prerender = true;

export async function GET() {
  const base = 'https://devops-tahina.dev';
  const staticPages = ['/', '/projects/', '/experience/', '/about/', '/contact/'];
  const projects = await getCollection('projects');
  const pages = [
    ...staticPages,
    ...projects.map((project) => `/projects/${project.id}/`)
  ];

  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map((page) => `  <url><loc>${base}${page}</loc></url>`).join('\n')}
</urlset>`;

  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' }
  });
}
