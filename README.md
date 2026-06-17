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

## Part 1 — Hosting (already set up)

This site is live on GitHub Pages at **<https://mrglassnj.github.io/>**, served from the
`main` branch (root) of the `mrglassnj/mrglassnj.github.io` repository.

To publish updates: commit your changes and push to `main` — the site rebuilds
automatically in about a minute.

The site works immediately — the gallery shows sample tiles until you connect Drive.

---

## Part 2 — Connect Google Drive for the photo gallery

### Step A — Create the photo folders in Google Drive

1. Go to **[Google Drive](https://drive.google.com/)** and create one parent folder,
   e.g. **"MR Glass Photos"**.
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

## Part 3 — Connect a custom domain from GoDaddy

Point a domain you bought on GoDaddy (e.g. `mrglassnj.com`) at this GitHub Pages site.
You'll set DNS records at GoDaddy, then tell GitHub the domain.

### Step 1 — Add DNS records at GoDaddy

1. Sign in at **[GoDaddy](https://godaddy.com/)** → **My Products** → next to your domain
   click **DNS** (or **Manage DNS**).
2. Under **Records**, add the following. Delete any existing default `A` record for
   `@` (the "Parked" one) first.

   **For the root/apex domain** (`mrglassnj.com`) — add **four A records**, all with
   Name `@`:

   | Type | Name | Value           | TTL     |
   |------|------|-----------------|---------|
   | A    | @    | 185.199.108.153 | 1 Hour  |
   | A    | @    | 185.199.109.153 | 1 Hour  |
   | A    | @    | 185.199.110.153 | 1 Hour  |
   | A    | @    | 185.199.111.153 | 1 Hour  |

   *(Optional but recommended — also add these four AAAA records for IPv6, Name `@`:*
   `2606:50c0:8000::153`, `2606:50c0:8001::153`, `2606:50c0:8002::153`,
   `2606:50c0:8003::153`.)*

   **For the `www` subdomain** — add **one CNAME record**:

   | Type  | Name | Value                    | TTL    |
   |-------|------|--------------------------|--------|
   | CNAME | www  | `mrglassnj.github.io.`   | 1 Hour |

3. **Save**. DNS changes can take anywhere from a few minutes to a few hours to
   propagate.

### Step 2 — Tell GitHub about the domain

1. In the repo on GitHub: **Settings → Pages**.
2. Under **Custom domain**, type your domain (e.g. `mrglassnj.com`) → **Save**.
   - This creates a `CNAME` file in the repo. If you pull the repo afterward, run
     `git pull` so your local copy stays in sync.
3. Wait for the **DNS check** to pass (GitHub shows a green check).
4. Tick **Enforce HTTPS** once it becomes available (can take up to ~24h for the
   certificate to be issued).

### Step 3 — Update the API key restriction

If you set up the Google Drive API key with a website restriction (Part 2, Step C.7),
add your new domain to the allowed referrers, e.g. `https://mrglassnj.com/*` and
`https://www.mrglassnj.com/*`. Otherwise the gallery images may stop loading on the new
domain.

> Use either the root domain (`mrglassnj.com`) or `www` as your primary in GitHub —
> GitHub automatically redirects the other one to it.

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
