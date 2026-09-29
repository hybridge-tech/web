# Hybridge Technologies

React + TypeScript landing page, built with Vite and served by Nginx in Docker.

## Local development

Requires Node.js 24 and npm.

```sh
npm ci
npm run dev
```

Open the URL printed by Vite (normally `http://localhost:5173`).

```sh
npm run build    # Type-check and create the production bundle in dist/
npm run preview  # Preview the production bundle locally
npm run lint
```

## Customize the page

- Edit company copy, services, and approach in `src/content.ts`.
- Edit layout in `src/App.tsx` and styling in `src/index.css`.
- Edit page title and social metadata in `index.html` and the logo in `public/favicon.svg`.
- Contact links use `soporte@hybridge.com.ar`. Set `VITE_CONTACT_EMAIL` to override it.

The service descriptions are starter copy; review them before publishing.
The “Hablemos de tu proyecto” button opens WhatsApp with +54 9 3584 30-1636.
The email link opens the visitor's email app. There is no backend or contact form service.
Fonts load from Google Fonts with local sans-serif fallbacks.

### Brand palette

The logo's cyan (`#0082B2`) anchors the UI alongside black and white. Shared
color tokens live in `src/index.css`; canvas charts read those same tokens.

| Color | Hex | Use |
| --- | --- | --- |
| Logo cyan | `#0082B2` | Primary buttons and logo details |
| Light cyan | `#62CCEF` | Highlights, chart signals, focus rings, contact section |
| Deep cyan | `#006D96` | Selected tabs and highlights on light surfaces |
| Charcoal | `#080C10` | Page background and primary button text |
| Slate | `#10181E` | Cards and console surfaces |
| White | `#FFFFFF` | Logo and bright foregrounds |
| Ice | `#F5F8FA` | Light sections and primary text on dark surfaces |
| Cool gray | `#A5B4BF` | Secondary text on dark surfaces |

Primary button text has a 4.52:1 contrast ratio against logo cyan. Light cyan
is used for small highlights on dark surfaces, and deep cyan for text on light surfaces.

To change configuration, copy `.env.example` to `.env`:

```sh
cp .env.example .env
```

Vite settings are embedded during the build. Rebuild after changing them.
All `VITE_*` values are public; do not use them for secrets.

## Deploy on a VPS

Install Docker Engine and the Docker Compose plugin, then clone this repository on
the VPS and run from the project directory:

```sh
docker compose up -d --build
```

The page is served at `http://YOUR_VPS_IP:8080`. Allow that port in your firewall
if you want direct access. Set `PORT` in `.env` to change the host port.

For a public domain, point its DNS A record to the VPS, configure HTTPS through
your reverse proxy (for example Caddy, Nginx, or Traefik), and proxy requests to
`http://127.0.0.1:8080`. If the proxy runs directly on the VPS, set
`BIND_ADDRESS=127.0.0.1` in `.env`, then recreate the container. If your proxy runs
in Docker, connect it to the same Docker network and proxy to `web:8080`.

```sh
docker compose logs -f web
docker compose ps
curl http://127.0.0.1:8080/healthz
```

To deploy updates, pull the latest repository changes and run
`docker compose up -d --build` again. To stop the service, use
`docker compose down`.

The Docker image uses a [multi-stage build](https://docs.docker.com/build/building/multi-stage/):
Node compiles the app, and Nginx serves the static output as an unprivileged user.
The container uses a read-only filesystem with temporary storage in `/tmp`,
restarts automatically, and exposes `/healthz` for its health check. Hashed assets
are cached for one year; HTML is revalidated so browsers receive new releases.

The starter follows the official [Vite React template](https://vite.dev/guide/).
