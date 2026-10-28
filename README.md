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
It has a narrow rectangular frame and sits beside the name on small screens.
Provenance is recorded in
`public/profile/sources.json`; signed, expiring image URLs are not embedded in the page.

The palette combines graphite `#202124`, pearl `#F2F3F1`, and dark blue `#0A1B44`,
with separate dark theme tokens. The header, hero and contact section all respond
to the selected theme. The non-sticky header scrolls with the page. IBM Plex Sans is used for headings,
JetBrains Mono for the animated skills line, and Onest for body copy. Bricolage
Grotesque is reserved for wordmarks. Fonts are self-hosted with their OFL licences;
new font provenance is recorded in `public/fonts/sources.json`.

Section structures vary: a portrait introduction, a professional timeline on
graphite, two compact project previews, an illustrated security research row, open skill
columns, article rows and a full-width contact section. Portal’s main preview is
a code-native wireframe cycling through Overview, Cluster and Reliability; it
shows layout only, with no fabricated operational metrics. Its animation pauses
outside the viewport and becomes a static overview when reduced motion is requested.
“Explore project” opens the real recording in a wide detail dialog with native
video controls and fullscreen support. No video is mounted on the main page.

A large inline skills line types only names: Terraform, Kubernetes, Communication,
Argo CD, Agile, Go, Teamwork and Python. The line uses JetBrains Mono Bold,
with dark purple for Terraform and blue for Kubernetes and Python. There is no
terminal box, prompt or typing control. Reduced motion shows a complete static
skill. The portrait has a simple frame and responds subtly on hover.
The opening composition takes inspiration from the
[EinCode reference](https://v0.app/templates/eincode-digital-lab-NjOUgG6VT7X), with
Corentin as the subject. Project artwork and the actual Portal interface retain
their own colours.

SII, Thales, Radio France and IPSSI logos retain their original colours. Local
assets and provenance are recorded in `public/brands/sources.json`. namR uses a
text wordmark. SII is the employer, Thales the client, and IPSSI the school. The hero uses
separate labelled employer/client facts, and the career entry presents Thales
as a distinct client assignment under the SII employment.

## Content

- `src/portfolio.json`: profile, experience, education, skills and links. Each
  degree links to its work-study employer through `workStudyCompany`.
- `src/projects.json`: project descriptions, categories, technologies and documentation.
- `src/articles.json`: selected blog posts, with English summaries.
- `src/components/portfolio/`: navigation, career and project components.
- `src/portfolio.css`: layout, interactions and themes.

LabOps and Portal descriptions are based on their repositories:
[LabOps](https://github.com/bingops-com/labops),
[GitOps architecture](https://github.com/bingops-com/labops/blob/master/apps/README.md),
[Cluster API](https://github.com/bingops-com/labops/blob/master/capi/README.md),
[Portal](https://github.com/bingops-com/portal).

Corentin confirmed his permanent employment at SII and current assignment at
Thales. His supplied CV provides the work-study roles, dates and responsibilities
at Radio France (Oct 2023–Sep 2025) and namR (Sep 2022–Sep 2023), plus the two
IPSSI programmes. The major is “Cybersecurity & Cloud computing”; the Bachelor
keeps its requested official title, “Administration Système & Sécurité Réseaux / secOps”.
Upgrade Dental is excluded. The current SII start date and exact job title remain
unspecified. The CV’s older job-search introduction is superseded by his current
employment. The professional email comes from the same supplied CV.
Linked blog posts and the actual Portal interface may be in French; portfolio
copy and controls are English apart from the official Bachelor programme title.

Project details explain the problem, engineering choices and delivered functionality
using the linked repositories and rebuild documentation; no performance figures
are inferred. The navy CG favicon is a local SVG monogram, with PNG and ICO variants.

The career tree uses a central vertical spine, with professional experience on
the left and the relevant IPSSI programme aligned on the right: Master’s-level
programme with Radio France, Bachelor with namR. Mobile shows each role before its degree. The
current SII entry labels Thales separately as the client.

Scroll-triggered reveals keep upcoming periods, project previews, skills, articles
and the contact content visually hidden until they enter the viewport. Keyboard
focus also reveals content; reduced motion and unavailable IntersectionObserver
show everything immediately. Reveals run once. Project previews fade without
moving their interactive controls. The shared hook handles newly filtered cards.

Graphite, pearl and navy remain the base. Cobalt highlights the name and primary
actions, violet identifies security and education, and teal marks applications,
observability and contact. The specialties banner has a neutral background with
coloured icons. The four Toolkit visuals use distinct blue, violet, teal and rose
accents. Buttons and the portrait frame have no shadows. LabOps precedes Portal
in the project list.

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
captured on 28 October 2026 at 1280 × 900. It navigates through Home, Cluster and Reliability,
scrolls the cluster page and returns home in about 12 seconds. Its interface
remains in its original French language, and the data reflects the capture time.
`portal-demo-poster.jpg` is the starting dashboard image. The MP4 is shown in the
expanded Portal detail dialog only, with play/pause controls, lazy loading and
playback only while visible. Closing the detail dialog pauses and unmounts the video. Reduced-motion and data-saving preferences disable
automatic playback; manual play remains available. A still preview is shown if
video loading fails. There is no GIF download link or GIF asset in the portfolio.

To refresh the recording, install Chromium for Playwright and a full FFmpeg build
with H.264 support, then run:

```sh
CHROMIUM=/usr/bin/chromium FFMPEG=/path/to/ffmpeg npm run capture:portal-demo
```

The script uses the internal cluster service by default; set `PORTAL_CAPTURE_URL`
for another accessible address. It starts an ephemeral unauthenticated browser
session and records navigation without changing Portal configuration. Lossless PNG frames are captured with their original timestamps, then encoded
once to H.264 at CRF 18 to keep interface text sharp. Temporary source frames
are removed after encoding. Review the captured content before
publishing new media. The previous static capture script remains available as
`npm run capture:portal`.


## Contact

Copy `.env.example` to `.env` and configure all three public EmailJS variables
before building to enable the form. The EmailJS template must accept `user_name`,
`user_email` and `message`. Without complete configuration, the page links directly
to `mailto:travail.corentinguyon@gmail.com`. The existing LabOps Docker build does
not pass these variables, so that build uses the email contact option.

## Verification

```sh
npm run lint
npm run build
npx playwright install chromium
npm run test:e2e
```

Browser checks cover desktop and mobile layouts, filtering, keyboard access to
project details, navigation, visual theme changes, project-only video viewing, animated wireframes, typed tools and soft skills, unavailable storage, reduced
motion, horizontal overflow and contact. EmailJS requests are intercepted, so
no real messages are sent. Configured builds test delivery failure, message
preservation, retry and confirmation; unconfigured builds test the single email action.

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
