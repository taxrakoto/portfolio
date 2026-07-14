# Tahina Rakotomaharo — DevOps Portfolio

A fast, fully static Astro portfolio designed for Cloudflare Pages. All personal and recruiter-facing content is stored in simple Markdown files under `src/content/`. You do not need to edit Astro, JavaScript, or CSS to update the site’s text.

## Start the site on your Mac

The first time you open the project, install its dependencies:

```bash
npm install
```

Start the local site:

```bash
npm run start
```

Your browser opens `http://127.0.0.1:4321/`. Keep the terminal open while editing. When you save a Markdown file in VS Code, the browser refreshes automatically. Press `Control + C` in the terminal to stop the site.

## The only folder you normally edit

All editable text is inside `src/content/`:

- `settings/site.md` — name, job title, email, GitHub, LinkedIn, location, navigation, availability, SEO description, and footer
- `pages/home.md` — homepage headline, introduction, buttons, status, metrics, section headings, and supporting text
- `pages/projects.md` — Projects page headline and publishing explanation
- `pages/experience.md` — Experience page headline, introduction, print button, and education heading
- `pages/about.md` — biography, buttons, working principles, and quote
- `pages/contact.md` — Contact page headline, labels, email prompt, and button
- `pages/404.md` — page-not-found message
- `experience/` — one Markdown file per job
- `projects/` — one Markdown file per project
- `capabilities/` — one Markdown file per skill group
- `certifications/` — one Markdown file per certification or course
- `education/` — one Markdown file per qualification

You normally should not edit anything in `src/pages/`, `src/components/`, or `src/styles/` unless you want to change the design or page behavior.

## How Markdown content files work

Most files begin with fields between two `---` lines:

```md
---
headlineFirst: I make delivery fast.
headlineAccent: Platforms dependable.
statusTitle: Available
---
```

Change the text after the colon, but keep the field name before the colon unchanged.

Lists use indentation:

```md
achievements:
  - Reduced deployment time by 50%.
  - Automated infrastructure tasks with Ansible.
```

Important rules:

- Keep the opening and closing `---` lines.
- Use spaces for indentation, not tabs.
- Do not rename fields unless the site code is also updated.
- Put quotation marks around a value when it contains unusual punctuation or should stay a string, such as `year: "2026"`.
- `order: 1` appears before `order: 2`.
- Save the file and check the local preview.
- Run `npm run build` before pushing to GitHub. Astro will report a clear error if a required field is missing or invalid.

## Update the homepage

Open `src/content/pages/home.md`.

You can edit:

- `heroKicker`
- `headlineFirst` and `headlineAccent`
- `introduction`
- button labels and destinations under `primaryAction` and `secondaryAction`
- availability text
- the four homepage metrics
- Projects, Capabilities, and Certification section headings

The homepage capability cards come from `src/content/capabilities/`. Edit an existing file or copy `_template.md.example` to create a new one.

The large certification block uses the certification where `featured: true`. Keep only one certification featured at a time. Certification entries can optionally provide a custom badge image; when no image is provided, the block displays the certification's `code` as text.

## Add or update professional experience

Every job has its own file in `src/content/experience/`.

To add a job:

1. Copy `src/content/experience/_template.md.example`.
2. Rename it with a simple filename ending in `.md`, for example `platform-engineer-company.md`.
3. Update the period, employer, title, achievements, stack, and order.
4. Save the file and check `/experience/` in the local site.

To remove a job, delete its `.md` file. To rearrange jobs, change their `order` values.

## Publish a project

Every project has its own Markdown case study in `src/content/projects/`.

1. Copy `src/content/projects/_template.md.example`.
2. Rename the copy to a URL-friendly filename ending in `.md`, for example `observability-platform.md`.
3. Complete the fields between `---`.
4. Write the project story below the closing `---` using Markdown headings and paragraphs.
5. Run `npm run build`.

The filename becomes the page URL. For example:

```text
src/content/projects/observability-platform.md
→ /projects/observability-platform/
```

Set `featured: true` to show a project on the homepage. Use `order` to control its position.

### Add a tile under Selected Work

The homepage automatically displays every project whose frontmatter contains:

```yaml
featured: true
```

To feature an existing project, open its Markdown file in `src/content/projects/` and change `featured: false` to `featured: true`. For example, to add **Backstage on Kubernetes** as a tile, update `src/content/projects/backstage-gitops-platform.md`.

To add a completely new project tile:

1. Copy `src/content/projects/_template.md.example`.
2. Rename it to a URL-friendly filename ending in `.md`, such as `my-new-project.md`.
3. Complete the project details and case study.
4. Set `featured: true`.
5. Set `order` to the position where the tile should appear.

The filename becomes the project URL. For example, `my-new-project.md` creates `/projects/my-new-project/`.

The Selected Work counter is text rather than an automatic count. After adding a featured project, update `projectsKicker` in `src/content/pages/home.md`. For example, change:

```yaml
projectsKicker: Selected work / 01—03
```

to:

```yaml
projectsKicker: Selected work / 01—04
```

## Add education or certifications

Copy the appropriate example file:

- `src/content/education/_template.md.example`
- `src/content/certifications/_template.md.example`

Rename the copy so it ends with `.md`, update the fields, and save it. Files ending in `.md.example` are documentation templates and are not displayed by the site.

### Add a certification

Each certification is a Markdown file in `src/content/certifications/`. To add one:

1. Copy `src/content/certifications/_template.md.example`.
2. Rename it with a URL-friendly filename ending in `.md`, such as `terraform-associate.md`.
3. Update the certification details, verification link, and `order`.
4. Set `featured: true` to show it in the homepage certification block, and set every other certification to `featured: false`.

The homepage currently displays only the featured certification. Non-featured certification files remain available as content but are not displayed elsewhere.

### Use a custom certification image

Place the badge or logo in `public/certifications/`, then add `image` and `imageAlt` to the certification frontmatter:

```yaml
image: /certifications/terraform-associate.webp
imageAlt: HashiCorp Certified Terraform Associate badge
```

PNG, WebP, JPEG, and SVG files can be used. Prefer a square image with a transparent background for the best fit inside the circular certification mark. If `image` is omitted, the homepage automatically displays the value of `code` as text instead.

## Change contact information

Open `src/content/settings/site.md` to update:

- Email address
- GitHub URL and display label
- LinkedIn URL and display label
- Location and time zone
- Availability
- Navigation labels
- Footer message

The Contact page automatically uses these values. Its surrounding headline and instructions are stored in `src/content/pages/contact.md`.

## Replace images

- Profile photo: replace `public/tahina.webp` with another WebP image using the same filename.
- Social sharing preview: replace `public/og.png` with a 1200 × 630 PNG using the same filename.

## Check before publishing

Run:

```bash
npm run build
```

A successful build creates the finished static website in `dist/`.

## GitHub and Cloudflare Pages workflow

After checking the local site:

```bash
git add .
git commit -m "Update portfolio content"
git push
```

When the GitHub repository is connected to Cloudflare Pages, every push to the production branch triggers a new build and deployment.

Use these Cloudflare Pages settings:

- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: `22`

The `public/_headers` file adds baseline security headers. `public/_redirects` preserves important URLs from the previous WordPress site.
