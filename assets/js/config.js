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
  apiKey: "AIzaSyBLWKbV2ba7wdu3z1YVoyzagMTwnn7lqUY",

  /* 2) Your gallery categories.
        - "name"     = the label shown on the website + filter button
        - "folderId" = the ID of that category's Google Drive folder
                       (the long code in the folder's share URL).
        Leave folderId as "" and a category will show sample tiles. */
  categories: [
    { name: "Shower Enclosures", folderId: "1VUu1-awi0LouqE8cisalEf7qDQBF9Tbk" },
    { name: "Custom Mirrors",    folderId: "1j1w9MaUwToR6X43yQ9gouXaCQahMDD5b" },
    { name: "Glass Railings",    folderId: "1yUefuUEx2PQi5A9PqAEw3ThwW7y439_-" },
    { name: "Storefronts",       folderId: "1Y_DL8RLUnZya3KKZ-WLQPeyrqnHweEsr" },
    { name: "Office Partitions", folderId: "1coUFzbk-Ot6Z84YdGxnYADG52KArLPWS" }
  ]

};
