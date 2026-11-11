# phavankumaar.com

Phavan Kumaar's portfolio: a room in Melbourne you can explore. Built with React, Vite and Motion.

## Run it on your laptop

You need Node.js (version 20 or newer) installed once.

```
npm install      # first time only: downloads the libraries into node_modules
npm run dev      # starts a live preview at http://localhost:5173
npm run build    # makes the finished site in the dist folder
```

## Where things live

- `src/data/content.js`: **all the words on the site.** Edit this to update anything. Text in [BRACKETS] shows up as a pink placeholder.
- `src/scenes/Arrival.jsx`: the street outside; scrolling flies you in through the window.
- `src/os/`: the desk and **PHAVAN OS**. `Desk.jsx` is the scene and the camera, `OS.jsx` the desktop and windows, `apps.jsx` every app, `MobileOS.jsx` the phone version, `sceneMarkup.js` the drawing.
- `src/pages/Resume.jsx`: the plain one-page résumé ("Skip the tour").
- `public/art/`: character pictures. `public/shots/`: screenshots.
- `design/`: the chosen look (Look 1, flat comic with grain).

## Status

Stage 2: the desk and PHAVAN OS in Look 1 (flat comic with grain). Click the screen to sit down; apps open as windows you can drag. On phones it's a home screen of apps.

Every push to `main` builds and publishes the site via `.github/workflows/deploy.yml`.
