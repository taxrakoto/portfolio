import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const projects = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    eyebrow: z.string(),
    summary: z.string(),
    role: z.string(),
    year: z.string(),
    status: z.enum(['Production', 'Completed', 'Active lab']),
    featured: z.boolean().default(false),
    order: z.number().default(99),
    stack: z.array(z.string()),
    impact: z.array(z.string()),
    repository: z.string().url().optional(),
    accent: z.enum(['rose', 'amber', 'green', 'blue']).default('rose')
  })
});

const settings = defineCollection({
  loader: glob({ base: './src/content/settings', pattern: 'site.md' }),
  schema: z.object({
    name: z.string(),
    monogram: z.string(),
    role: z.string(),
    email: z.string().email(),
    github: z.string().url(),
    githubLabel: z.string(),
    linkedin: z.string().url(),
    linkedinLabel: z.string(),
    location: z.string(),
    timezone: z.string(),
    availability: z.string(),
    description: z.string(),
    addressLocality: z.string(),
    addressCountry: z.string(),
    knowsAbout: z.array(z.string()),
    navigation: z.array(z.object({ href: z.string(), label: z.string() })),
    footerKicker: z.string(),
    footerHeadline: z.string(),
    footerEmailLabel: z.string(),
    footerGithubLabel: z.string(),
    footerLinkedinLabel: z.string()
  })
});

const callToAction = z.object({ label: z.string(), href: z.string() });

const homePage = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: 'home.md' }),
  schema: z.object({
    heroKicker: z.string(),
    headlineFirst: z.string(),
    headlineAccent: z.string(),
    introduction: z.string(),
    primaryAction: callToAction,
    secondaryAction: callToAction,
    portraitAlt: z.string(),
    statusTitle: z.string(),
    statusText: z.string(),
    metricsLabel: z.string(),
    metrics: z.array(z.object({ value: z.string(), label: z.string() })),
    projectsKicker: z.string(),
    projectsTitle: z.string(),
    projectsIntroduction: z.string(),
    projectsButtonLabel: z.string(),
    capabilitiesKicker: z.string(),
    capabilitiesTitle: z.string(),
    capabilitiesIntroduction: z.string(),
    certificationKicker: z.string()
  })
});

const projectsPage = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: 'projects.md' }),
  schema: z.object({
    pageTitle: z.string(),
    seoDescription: z.string(),
    kicker: z.string(),
    headline: z.string(),
    introduction: z.string()
  })
});

const experiencePage = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: 'experience.md' }),
  schema: z.object({
    pageTitle: z.string(),
    seoDescription: z.string(),
    kicker: z.string(),
    headline: z.string(),
    introduction: z.string(),
    cvButtonLabel: z.string(),
    educationKicker: z.string(),
    educationTitle: z.string()
  })
});

const aboutPage = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: 'about.md' }),
  schema: z.object({
    pageTitle: z.string(),
    seoDescription: z.string(),
    portraitAlt: z.string(),
    kicker: z.string(),
    headline: z.string(),
    introduction: z.string(),
    bodyText: z.string(),
    primaryAction: callToAction,
    secondaryAction: callToAction,
    principlesKicker: z.string(),
    principlesTitle: z.string(),
    principles: z.array(z.object({ title: z.string(), summary: z.string() })),
    quoteKicker: z.string(),
    quote: z.string(),
    quoteAuthor: z.string()
  })
});

const contactPage = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: 'contact.md' }),
  schema: z.object({
    pageTitle: z.string(),
    seoDescription: z.string(),
    kicker: z.string(),
    headline: z.string(),
    introduction: z.string(),
    emailLabel: z.string(),
    githubLabel: z.string(),
    linkedinLabel: z.string(),
    locationLabel: z.string(),
    noteKicker: z.string(),
    noteTitle: z.string(),
    emailButtonLabel: z.string(),
    emailSubject: z.string()
  })
});

const notFoundPage = defineCollection({
  loader: glob({ base: './src/content/pages', pattern: '404.md' }),
  schema: z.object({
    pageTitle: z.string(),
    kicker: z.string(),
    headline: z.string(),
    message: z.string(),
    buttonLabel: z.string()
  })
});

const experience = defineCollection({
  loader: glob({ base: './src/content/experience', pattern: '**/*.md' }),
  schema: z.object({
    period: z.string(),
    employer: z.string(),
    title: z.string(),
    achievements: z.array(z.string()),
    stack: z.array(z.string()),
    order: z.number()
  })
});

const capabilities = defineCollection({
  loader: glob({ base: './src/content/capabilities', pattern: '**/*.md' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number()
  })
});

const certifications = defineCollection({
  loader: glob({ base: './src/content/certifications', pattern: '**/*.md' }),
  schema: z.object({
    code: z.string(),
    title: z.string(),
    issuer: z.string(),
    summary: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
    verifyUrl: z.string().url(),
    verifyLabel: z.string(),
    featured: z.boolean().default(false),
    order: z.number()
  })
});

const education = defineCollection({
  loader: glob({ base: './src/content/education', pattern: '**/*.md' }),
  schema: z.object({
    qualification: z.string(),
    institution: z.string(),
    year: z.string(),
    order: z.number()
  })
});

export const collections = {
  projects,
  settings,
  homePage,
  projectsPage,
  experiencePage,
  aboutPage,
  contactPage,
  notFoundPage,
  experience,
  capabilities,
  certifications,
  education
};
