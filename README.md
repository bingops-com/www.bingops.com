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
project descriptions, an editorial LabOps illustration and an actual Portal screenshot. The header scrolls with
the page; footer section links and “Back to top” provide return navigation.
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

### LabOps illustration

`public/projects/labops-editorial-v1.webp` is an editorial hardware illustration
generated with the built-in OpenAI image tool. It is a conceptual visual, not
a photograph or a literal diagram of the deployed lab. The original PNG is in
`output/imagegen/labops-editorial-v1.png`; the prompt is recorded alongside it.
The WebP preserves the composition and dimensions with a smaller transfer size.

### Portal screenshot

`public/projects/portal.jpg` is a real screenshot of the running Portal, captured
on 28 October 2026. Its metrics reflect that moment and its interface remains
in its original French language.

To refresh it from an environment authorised to access Portal:

```sh
CHROMIUM=/usr/bin/chromium npm run capture:portal
```

The script uses the internal cluster service by default; set `PORTAL_CAPTURE_URL`
for another accessible address. It starts an ephemeral light-theme browser session,
waits for widgets, and captures a 1600 × 1150 viewport without changing Portal’s
configuration. Review visible content before publishing a replacement screenshot.

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
