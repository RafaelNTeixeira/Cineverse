# 🎬 CineVerse — A Cinematic Review Journal

> A personal movie & TV review website with a cinematic, immersive experience. Powered by the TMDB API.

---

## ✨ Features

### 🎥 Cinematic Trailer Integration
- **Netflix-Style Hero Banner** — Every movie/show detail page opens with an auto-playing, muted YouTube trailer filling the entire header. A prominent **Unmute** button and volume slider let you dive in immediately.
- **Theater Mode** — A dedicated "Watch Trailer" button dims the entire page to 90% black and centers the player for a distraction-free experience. Press `ESC` or click outside to exit.

### 🎨 Adaptive UI/UX
- **Dynamic Color Palettes** — Uses [ColorThief](https://lokeshdhakar.com/projects/color-thief/) to extract the dominant colors from the official movie poster, then dynamically updates accent colors, button highlights, and background gradients to perfectly match the film being viewed.
- **Film Grain Overlay** — A canvas-based animated film grain texture rendered over the entire page for an authentic cinematic feel.
- **Smooth Transitions** — CSS color variable transitions ensure the palette shift between titles is elegant, not jarring.

### 🔐 Admin-Only Reviews
- Password-protected admin session (session-scoped, clears on browser close).
- Only the admin can write, edit, or delete reviews. Visitors have read-only access.
- Review form includes: **5-star rating**, **headline**, **full review text**, **watched date**, **recommended toggle**, and a **spoiler warning** flag.
- Spoiler-tagged reviews are blurred for visitors, with a one-click reveal.

### 🗂 Review Management
- Filter by **Films** or **TV Series**, sort by **Latest**, **Highest Rated**, or **A–Z**.
- Reviews persist in `localStorage` — no backend required.
- **Critic's Pick** badge automatically awarded to titles rated 4.5★ or above.
- Stats bar shows total reviews, film/series count, recommendations, and average rating.

### 🎞 Extra Cinematic Touches
- Cast carousel with profile photos pulled from TMDB.
- "You Might Also Like" similar titles section.
- Quick-facts sidebar: runtime, budget, revenue, content rating, director/writer.
- Share button copies the page URL to clipboard.
- Reading time estimator on reviews.
- Responsive design — works on mobile, tablet, and desktop.

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone https://github.com/yourusername/cineverse.git
cd cineverse
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Copy the example env file and fill in your values:
```bash
cp .env.example .env
```

Edit `.env`:
```env
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_ADMIN_PASSWORD=your_secure_password_here
```

> **Get a free TMDB API key** at [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api).  
> Registration is free and takes under 2 minutes.

### 4. Run locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000).

### 5. Build for production
```bash
npm run build
npm run preview
```

---

## 🛡 Admin Access

1. Navigate to `/admin` or click the 🔒 icon in the navbar.
2. Enter your password (set in `.env` as `VITE_ADMIN_PASSWORD`).
3. You'll now see **"+ Add Review"** in the navbar.
4. Search for any movie or TV show → navigate to its page → write your review.

> **Note:** This is client-side authentication intended for a personal site. Your password is stored in an env variable, which is compiled into the client bundle. Do not use a sensitive password you use elsewhere.

---

## 🗂 Tech Stack

| Tool | Purpose |
|---|---|
| [React 18](https://react.dev) | UI framework |
| [Vite](https://vitejs.dev) | Build tool & dev server |
| [React Router v6](https://reactrouter.com) | Client-side routing |
| [TMDB API](https://developer.themoviedb.org) | Movie/TV data, posters, trailers |
| [YouTube IFrame API](https://developers.google.com/youtube/iframe_api_reference) | Embedded trailer playback |
| [ColorThief](https://lokeshdhakar.com/projects/color-thief/) | Dynamic color extraction from posters |
| `localStorage` | Persisting reviews (no backend) |

---

## 📁 Project Structure

```
src/
├── components/
│   ├── CastCarousel.jsx     # Horizontal scrollable cast list
│   ├── FilmGrain.jsx        # Animated canvas film grain overlay
│   ├── HeroBanner.jsx       # Auto-playing YouTube trailer hero
│   ├── MovieCard.jsx        # Review card for the grid
│   ├── Navbar.jsx           # Navigation + search trigger
│   ├── ReviewForm.jsx       # Admin-only review editor
│   ├── SearchModal.jsx      # TMDB search overlay
│   ├── StarRating.jsx       # Interactive & read-only star rating
│   └── TheaterMode.jsx      # Fullscreen theater overlay
├── context/
│   ├── AdminContext.jsx     # Admin auth state
│   └── ThemeContext.jsx     # Dynamic ColorThief palette
├── pages/
│   ├── AdminLogin.jsx       # Password gate
│   ├── Home.jsx             # Review grid + featured hero
│   └── MovieDetail.jsx      # Full detail + trailer + review page
├── utils/
│   ├── storage.js           # localStorage CRUD for reviews
│   └── tmdb.js              # TMDB API wrapper functions
├── config.js                # API keys, image URL helpers
├── App.jsx                  # Routing setup
└── index.css                # Global styles & CSS variables
```

---

## 🌐 Deployment

This is a fully static app — deploy to any static host:

- **[Vercel](https://vercel.com)** — Connect your GitHub repo, zero config needed.
- **[Netlify](https://netlify.com)** — Drag & drop the `dist/` folder after `npm run build`.
- **[GitHub Pages](https://pages.github.com)** — Use the `gh-pages` package or a GitHub Actions workflow.

Remember to set your environment variables in the host's dashboard.

---

## 📝 License

MIT — personal use, fork freely.

---

*Built with React + Vite. Data from [The Movie Database (TMDB)](https://www.themoviedb.org). This product uses the TMDB API but is not endorsed or certified by TMDB.*
