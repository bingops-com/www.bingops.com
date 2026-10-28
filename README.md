# BingOps portfolio

Corentin Guyon’s English-language portfolio, built with React and Vite for
[www.bingops.com](https://www.bingops.com/).

## Development

```sh
npm install
npm run dev
```

Vite listens on `0.0.0.0:5173`. Both `5173.dev.lab.bingo` and
`5173--main--lab--bingops.dev.lab.bingo` are allowed for the Coder proxy.
The running server appears in [Dev](https://dev.lab.bingo/) and opens at
[port 5173](https://5173.dev.lab.bingo/), using the existing Coder session.
Other servers can be opened through the dashboard’s port field.

`npm run build` creates the static site in `dist/`.
`npm run preview` serves that build locally.

## Visual direction

The portfolio leads with Corentin’s name, portrait, DevOps/cybersecurity focus and
professional background. The hero links to experience first; personal projects
follow the career section. The portrait is the original 400 × 400 photograph
provided by Corentin, stored locally at `public/profile/corentin-guyon.jpg`.
It has a narrow rectangular frame. Provenance is recorded in
`public/profile/sources.json`; signed, expiring image URLs are not embedded in the page.

The palette combines graphite `#202124`, pearl `#F2F3F1`, and dark blue `#0A1B44`,
with separate dark theme tokens. The header, hero and contact section all respond
to the selected theme. The non-sticky header scrolls with the page. Onest is used for body copy and
headings, with moderate weights and spacing. Bricolage Grotesque is reserved for
wordmarks. Both fonts are self-hosted with their OFL licences.

Section structures vary: a portrait introduction, a professional timeline on
graphite, aligned project previews, a compact security case study, open skill
columns, article rows and a full-width contact section. LabOps and Portal share
a media aspect ratio so their headings align, including the video controls.
The opening composition takes inspiration from the
[EinCode reference](https://v0.app/templates/eincode-digital-lab-NjOUgG6VT7X), with
Corentin as the subject. Project artwork and the actual Portal interface retain
their own colours.

SII, Thales, Radio France and IPSSI logos retain their original colours. Local
assets and provenance are recorded in `public/brands/sources.json`. namR uses a
text wordmark. SII is the employer, Thales the client, and IPSSI the school.

## Content

- `src/portfolio.json`: profile, experience, education, skills and links.
- `src/projects.json`: project descriptions, categories, technologies and documentation.
- `src/articles.json`: selected blog posts, with English summaries.
- `src/components/portfolio/`: navigation, career and project components.
- `src/portfolio.css`: layout, interactions and themes.

LabOps and Portal descriptions are based on their repositories:
[LabOps](https://github.com/bingops-com/labops),
[GitOps architecture](https://github.com/bingops-com/labops/blob/master/apps/README.md),
[Cluster API](https://github.com/bingops-com/labops/blob/master/capi/README.md),
[Portal](https://github.com/bingops-com/portal).

Corentin confirmed his permanent employment at SII, current assignment at
Thales, and previous experience at namR and Radio France. Upgrade Dental is excluded. This appears in the hero, experience and metadata. Radio France comes
from the previous portfolio; the Nice area and IPSSI programme (2023–2025)
come from the [provided LinkedIn profile](https://www.linkedin.com/in/corentin-guyon/).
Unconfirmed job titles, experience dates and detailed responsibilities are omitted.
Linked blog posts and the actual Portal interface may be in French; the portfolio
copy and controls are in English.

### Project illustrations

The illustrations use the built-in OpenAI image tool. The Ingress illustration
uses the approved LabOps image as its style reference. These are
conceptual illustrations rather than exact deployment diagrams or application screenshots.

| Project | Served asset | Subject |
| --- | --- | --- |
| LabOps | `public/projects/labops-platform-v2.webp` | Terraform/Talos, Kubernetes, applications and GitOps delivery |
| CVE-2025-1974 | `public/projects/ingress-analysis-v1.webp` | AdmissionReview, NGINX Ingress and controller log analysis |

Original PNGs and complete prompts are preserved in `output/imagegen/` with
matching filenames (`.png` and `-prompt.txt`). The served WebPs preserve the
composition and dimensions with smaller transfer sizes. The illustrations retain
their white background in both themes. The earlier hardware illustration is an
unused draft.

### Portal navigation recording

`public/projects/portal-demo.mp4` is a real, muted recording of the running Portal,
captured on 28 October 2026. It navigates through Home, Cluster and Reliability,
scrolls the cluster page and returns home in about 12 seconds. Its interface
remains in its original French language, and the data reflects the capture time.
`portal-demo-poster.jpg` is the starting dashboard image. The MP4 is shown in the
Portal project card and detail dialog, with play/pause controls, lazy loading and
playback only while visible. Reduced-motion and data-saving preferences disable
automatic playback; manual play remains available. A still preview is shown if
video loading fails. There is no GIF download link or GIF asset in the portfolio.

To refresh the recording, install Chromium for Playwright and a full FFmpeg build
with H.264 support, then run:

```sh
npx playwright install ffmpeg
CHROMIUM=/usr/bin/chromium FFMPEG=/path/to/ffmpeg npm run capture:portal-demo
```

The script uses the internal cluster service by default; set `PORTAL_CAPTURE_URL`
for another accessible address. It starts an ephemeral unauthenticated browser
session and records navigation without changing Portal configuration. Source video
is held temporarily and removed after encoding. Review the captured content before
publishing new media. The previous static capture script remains available as
`npm run capture:portal`.


## Contact

Copy `.env.example` to `.env` and configure all three public EmailJS variables
before building to enable the form. The EmailJS template must accept `user_name`,
`user_email` and `message`. Without complete configuration, the page links directly
to LinkedIn. The existing LabOps Docker build does not pass these variables, so
that build uses the LinkedIn contact option.

## Verification

```sh
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

Browser checks cover desktop and mobile layouts, filtering, keyboard access to
project details, navigation, visual theme changes, aligned previews, unavailable storage, reduced
motion, horizontal overflow and contact. EmailJS requests are intercepted, so
no real messages are sent. Configured builds test delivery failure, message
preservation, retry and confirmation; unconfigured builds test the LinkedIn fallback.

`portfolio-checks.yml` tests builds with and without contact configuration.
The `portfolio-browser-review` artifact contains reports and desktop/mobile
screenshots in both themes.

## Design skill

The Anthropic [frontend-design skill](https://github.com/anthropics/skills/tree/main/skills/frontend-design)
is installed in `.agents/skills/frontend-design/`, with its Apache 2.0 licence,
in a dedicated commit before the redesign.

## Deployment

Delivery follows the existing process: PR to `main`, review, then image building
in LabOps. This branch does not change infrastructure manifests.

## Credits

The original portfolio was based on a Figma design by
[Sagar Shah](https://www.figma.com/@shahsagarm).
