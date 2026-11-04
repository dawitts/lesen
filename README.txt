LESEN – installable offline app
================================
Files (keep them together in one folder):
  index.html, manifest.webmanifest, sw.js, icon-192.png, icon-512.png

Chrome only installs an app (and only works offline as an app) when the files
are served from an https:// address. Opening index.html from your phone's file
manager can't do this.

Easiest free ways to host it (once, takes ~2 minutes):
  - Netlify Drop: go to app.netlify.com/drop and drag this folder onto the page.
  - GitHub Pages / Cloudflare Pages: upload the folder, enable Pages.

Then on your phone, in Chrome:
  1. Open the https:// address once while online (loads ~12 MB, then it is cached).
  2. Tap "Install as app" on the home screen, or Chrome menu > Install app.
  3. From then on it opens like a normal app, with no internet needed.
     Your books and saved words stay on the phone.

Full screen: tap the corner-arrows button (top right). The header and bottom bar disappear so the book fills the whole screen; swipe left/right to turn pages. Tap the small round button in the top-right corner to exit.

Updating: if you change index.html, edit sw.js and change VERSION = 'v1' to 'v2'.
