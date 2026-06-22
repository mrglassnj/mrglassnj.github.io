/* ============================================================
   MR. GLASS — gallery + UI behavior
   Reads photos from Google Drive folders defined in config.js,
   renders a filterable catalog with a lightbox. Falls back to
   sample placeholder tiles when Drive isn't configured yet.
   ============================================================ */
(function () {
  "use strict";

  var CONFIG = window.MRGLASS_CONFIG || { apiKey: "", categories: [] };

  var grid = document.getElementById("gallery-grid");
  var filters = document.getElementById("gallery-filters");
  var note = document.getElementById("gallery-note");

  // photos = [{ src, full, tag }]
  var photos = [];
  var activeFilter = "";

  /* ---------- Google Drive image URLs ---------- */
  // Drive serves resizable images via the thumbnail endpoint.
  function driveImg(id, width) {
    return "https://drive.google.com/thumbnail?id=" + id + "&sz=w" + width;
  }

  /* ---------- Fetch one category's images from Drive ---------- */
  function fetchFolder(cat) {
    var q =
      "'" + cat.folderId + "' in parents and trashed=false and mimeType contains 'image/'";
    var url =
      "https://www.googleapis.com/drive/v3/files?q=" +
      encodeURIComponent(q) +
      "&key=" + CONFIG.apiKey +
      "&fields=" + encodeURIComponent("files(id,name)") +
      "&pageSize=200&orderBy=createdTime desc";

    return fetch(url)
      .then(function (r) {
        if (!r.ok) throw new Error("Drive API " + r.status);
        return r.json();
      })
      .then(function (data) {
        return (data.files || []).map(function (f) {
          return { src: driveImg(f.id, 800), full: driveImg(f.id, 1600), tag: cat.name };
        });
      })
      .catch(function (err) {
        console.warn("MR.Glass: could not load '" + cat.name + "':", err.message);
        return []; // fail soft — that category just shows nothing / placeholders
      });
  }

  /* ---------- Build filter buttons ---------- */
  function renderFilters(categories) {
    var names = categories.map(function (c) { return c.name; });
    if (!activeFilter && names.length) activeFilter = names[0];
    filters.innerHTML = "";
    names.forEach(function (name) {
      var btn = document.createElement("button");
      btn.className = "filter-btn" + (name === activeFilter ? " active" : "");
      btn.type = "button";
      btn.textContent = name;
      btn.addEventListener("click", function () {
        activeFilter = name;
        Array.prototype.forEach.call(filters.children, function (b) {
          b.classList.toggle("active", b.textContent === name);
        });
        renderGrid();
      });
      filters.appendChild(btn);
    });
  }

  /* ---------- Render the photo grid ---------- */
  function renderGrid() {
    var list = photos.filter(function (p) { return p.tag === activeFilter; });

    grid.innerHTML = "";

    if (!list.length) {
      // Nothing loaded for this view — show on-brand placeholder tiles.
      renderPlaceholders();
      return;
    }

    list.forEach(function (p, i) {
      var item = document.createElement("div");
      item.className = "gallery-item";
      item.innerHTML =
        '<img loading="lazy" src="' + p.src + '" alt="' + p.tag + ' project by MR. Glass" />' +
        '<span class="gi-tag">' + p.tag + "</span>";
      item.addEventListener("click", function () { openLightbox(list, i); });
      grid.appendChild(item);
    });
  }

  /* ---------- Placeholder tiles (when Drive not connected) ---------- */
  var glassIcon =
    '<svg viewBox="0 0 24 24"><path fill="currentColor" d="M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2zm0 2v14h14V5H5zm2 2h4l-4 6V7z"/></svg>';

  function renderPlaceholders() {
    var label = activeFilter || "Sample";
    var count = 6;
    for (var i = 0; i < count; i++) {
      var item = document.createElement("div");
      item.className = "gallery-item placeholder";
      item.innerHTML =
        '<div class="ph-art">' + glassIcon + "<span>" + label + " photo</span></div>";
      grid.appendChild(item);
    }
  }

  /* ---------- Lightbox ---------- */
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lightbox-img");
  var lbList = [];
  var lbIndex = 0;

  function openLightbox(list, index) {
    lbList = list; lbIndex = index;
    showLightbox();
    lb.classList.add("open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }
  function showLightbox() {
    var p = lbList[lbIndex];
    if (p) { lbImg.src = p.full; lbImg.alt = p.tag + " project by MR. Glass"; }
  }
  function closeLightbox() {
    lb.classList.remove("open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }
  function step(dir) {
    if (!lbList.length) return;
    lbIndex = (lbIndex + dir + lbList.length) % lbList.length;
    showLightbox();
  }
  if (lb) {
    lb.querySelector(".lightbox-close").addEventListener("click", closeLightbox);
    lb.querySelector(".lightbox-prev").addEventListener("click", function () { step(-1); });
    lb.querySelector(".lightbox-next").addEventListener("click", function () { step(1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("open")) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") step(-1);
      if (e.key === "ArrowRight") step(1);
    });
  }

  /* ---------- Init ---------- */
  function init() {
    var cats = CONFIG.categories || [];
    renderFilters(cats);

    var configured = CONFIG.apiKey &&
      cats.some(function (c) { return c.folderId; });

    if (!configured) {
      renderGrid(); // shows placeholders
      note.textContent =
        "Sample gallery shown. Connect Google Drive (see README) to display your real project photos.";
      return;
    }

    grid.innerHTML = '<p class="gallery-loading">Loading projects…</p>';

    var toLoad = cats.filter(function (c) { return c.folderId; });
    Promise.all(toLoad.map(fetchFolder)).then(function (results) {
      results.forEach(function (arr) { photos = photos.concat(arr); });
      renderGrid();
      if (!photos.length) {
        note.textContent =
          "No photos found yet. Add images to your Google Drive category folders and they'll appear here automatically.";
      } else {
        note.textContent = "";
      }
    });
  }

  /* ---------- Misc UI: mobile nav + footer year ---------- */
  function ui() {
    var toggle = document.querySelector(".nav-toggle");
    var mobile = document.querySelector(".mobile-nav");
    if (toggle && mobile) {
      toggle.addEventListener("click", function () {
        var open = mobile.classList.toggle("open");
        toggle.setAttribute("aria-expanded", open ? "true" : "false");
      });
      mobile.querySelectorAll("a").forEach(function (a) {
        a.addEventListener("click", function () {
          mobile.classList.remove("open");
          toggle.setAttribute("aria-expanded", "false");
        });
      });
    }
    var year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  document.addEventListener("DOMContentLoaded", function () { ui(); init(); });
})();
