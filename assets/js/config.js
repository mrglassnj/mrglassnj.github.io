/* ============================================================
   MR. GLASS — SITE CONFIGURATION
   ------------------------------------------------------------
   This is the ONLY file you need to edit to connect your photos.
   See README.md for step-by-step setup instructions.
   ============================================================ */

window.MRGLASS_CONFIG = {

  /* 1) Your Google Drive API key.
        Leave it as "" to show sample placeholder tiles.
        Paste your key here once you've created it (see README). */
  apiKey: "",

  /* 2) Your gallery categories.
        - "name"     = the label shown on the website + filter button
        - "folderId" = the ID of that category's Google Drive folder
                       (the long code in the folder's share URL).
        Leave folderId as "" and a category will show sample tiles. */
  categories: [
    { name: "Shower Enclosures", folderId: "" },
    { name: "Custom Mirrors",    folderId: "" },
    { name: "Glass Railings",    folderId: "" },
    { name: "Storefronts",       folderId: "" },
    { name: "Office Partitions", folderId: "" }
  ]

};
