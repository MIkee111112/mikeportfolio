# Mike Portfolio – Full Static Site

| Page | File |
|------|------|
| Home | `index.html` |
| About | `about.html` |
| Portfolio | `portfolio.html` |
| Contact | `contact.html` |

## Assets

- `images/` – portrait photos + studio poster
- `videos/studio-editing.mp4` – desk / editing suite clip used on Home & About
- `css/styles.css`
- `js/` – main.js, particles.js, portfolio.js

## Run

```bash
cd /path/to/artifacts
python -m http.server 8000
```

Open http://localhost:8000

## Contact form

Form opens the user’s email client with a pre-filled message to **miguelgranadoswork@gmail.com**.  
For real server-side submit later, replace the form action with Formspree, Netlify Forms, etc.

## Video

Home hero + intro and About showcase reel use the local `videos/studio-editing.mp4` (autoplay muted loop + controls).
Portfolio project cards still open YouTube reels in a lightbox.
