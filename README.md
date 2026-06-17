# MR. Glass — Website

A static landing page for MR. Glass (custom glass installation, NJ & NY), hosted on
GitHub Pages. The project gallery pulls photos automatically from **Google Drive
folders** — you add photos to a folder, they show up on the site. No code edits needed
for day-to-day photo updates.

---

## File overview

```
index.html              ← the page
assets/css/styles.css   ← styling (green/lime brand theme)
assets/js/config.js     ← ★ the only file you edit to connect Drive
assets/js/gallery.js    ← gallery + lightbox logic (no need to touch)
assets/img/             ← logo + favicon
.nojekyll               ← tells GitHub Pages to serve files as-is
```

---

## Part 1 — Publish the site on GitHub Pages (one time)

1. Create a new GitHub repository (e.g. `mrglass-site`).
2. Upload **all** the files in this folder to the repo (keep the folder structure).
3. In the repo: **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **Deploy from a branch**.
5. Branch: `main`, folder: `/ (root)` → **Save**.
6. Wait ~1 minute. Your site goes live at
   `https://<your-username>.github.io/<repo-name>/`

The site works immediately — the gallery shows sample tiles until you connect Drive.

---

## Part 2 — Connect Google Drive for the photo gallery

### Step A — Create the photo folders in Google Drive

1. In Google Drive, create one parent folder, e.g. **"MR Glass Photos"**.
2. Inside it, create one folder per category (names can be anything):
   - Shower Enclosures
   - Custom Mirrors
   - Glass Railings
   - Storefronts
   - Office Partitions
3. Make the **parent folder shareable**: right-click it → **Share** → under
   *General access* choose **"Anyone with the link" → Viewer**. Subfolders inherit this.

> To add photos later, just drag them into the matching category folder. Done.

### Step B — Get each folder's ID

Open a category folder. The browser URL looks like:

```
https://drive.google.com/drive/folders/1AbCdEfGhIjKlMnOpQrStUvWxYz
                                        └──────────── this is the folder ID ────────────┘
```

Copy the part after `/folders/` for each category folder.

### Step C — Create a free Google Drive API key

1. Go to <https://console.cloud.google.com/>
2. Top bar → **Select a project → New Project** → name it `mrglass` → **Create**.
3. With the project selected, open **APIs & Services → Library**.
4. Search **"Google Drive API"** → open it → **Enable**.
5. Go to **APIs & Services → Credentials → + Create Credentials → API key**.
6. Copy the key that appears.
7. (Recommended) Click the key to restrict it:
   - **API restrictions** → *Restrict key* → check **Google Drive API only**.
   - **Application restrictions** → *Websites* → add your site address, e.g.
     `https://<your-username>.github.io/*`
   - Save.

### Step D — Fill in `assets/js/config.js`

Open the file and paste your key and folder IDs:

```js
window.MRGLASS_CONFIG = {
  apiKey: "PASTE_YOUR_API_KEY_HERE",
  categories: [
    { name: "Shower Enclosures", folderId: "PASTE_FOLDER_ID" },
    { name: "Custom Mirrors",    folderId: "PASTE_FOLDER_ID" },
    { name: "Glass Railings",    folderId: "PASTE_FOLDER_ID" },
    { name: "Storefronts",       folderId: "PASTE_FOLDER_ID" },
    { name: "Office Partitions", folderId: "PASTE_FOLDER_ID" }
  ]
};
```

Commit/upload the change. The gallery now loads your real photos and filters them by
category.

---

## Adding / removing photos (everyday use)

- **Add:** drag image files into the right category folder in Google Drive.
- **Remove:** delete (or move to trash) the file in Drive.
- The website reflects changes automatically on the next page load.

> Tip: phone photos are large. The site already requests scaled-down versions for fast
> loading, so you don't need to resize them — but smaller files still load a bit faster.

---

## Updating business info

Phone, email, service area, and copy live in `index.html`. Search for:

- `3478410399` / `(347) 841-0399` — phone number
- `mrglassnj@gmail.com` — email
- "New Jersey & New York" — service area

Change category names in **both** `config.js` and the Services/Footer sections of
`index.html` if you rename them.

---

## Notes & limitations

- Google Drive isn't a true image CDN; for a local business this is fine, but under very
  heavy traffic images may load slowly. (Cloudinary is the upgrade path if ever needed.)
- The API key is visible in the page source — that's normal for this setup. Restricting
  it (Step C.7) to read-only Drive + your domain keeps it safe.
