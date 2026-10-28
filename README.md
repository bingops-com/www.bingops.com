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

The palette and typography follow [LabOps Portal](https://github.com/bingops-com/portal):
cobalt `#1443D6`, navy `#0A1B44`, mint `#8AF2BF`, ground `#EEF2FB`, and white
surfaces, with matching dark theme tokens. Bricolage Grotesque and Onest are
self-hosted with their OFL licences.

The [EinCode Digital Lab reference](https://v0.app/templates/eincode-digital-lab-NjOUgG6VT7X)
informs the personal digital lab concept. The current layout uses typography,
project descriptions, software platform illustrations and a recorded Portal navigation demo.
The header scrolls with the page; footer section links and “Back to top” provide return navigation.
The mobile menu expands within the page. A short entrance animation and
interaction transitions respect `prefers-reduced-motion`.

SII, Thales, Radio France and IPSSI logos retain their original colours.
Local assets and their provenance are recorded in `public/brands/sources.json`.
SII is the employer, Thales the client, and IPSSI the school.

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

Corentin confirmed his permanent employment at SII and current assignment at
Thales. This appears in the hero, experience and metadata. Radio France comes
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
`portal-demo-poster.jpg` is the starting dashboard image; `portal-demo.gif` is a
looping downloadable GIF of the same recording. The portfolio serves the smaller
MP4 inline, with play/pause controls, lazy loading and playback only while visible.
Reduced-motion and data-saving preferences disable automatic playback; manual
play remains available. The poster and GIF link remain available if video loading fails.

To refresh the recording, install Chromium for Playwright and a full FFmpeg build
with H.264 and GIF support, then run:

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

The opening section follows the EinCode reference’s personal digital workshop
composition: dark navy field, a short typing reveal, a compact workbench window,
and real project links. The workbench contains the Portal recording. The header
scrolls with the page, and reduced motion disables the heading reveal.

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
project details, navigation, theme persistence, unavailable storage, reduced
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
