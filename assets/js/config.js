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
    { name: "Shower Enclosures", folderId: "https://drive.google.com/drive/folders/1VUu1-awi0LouqE8cisalEf7qDQBF9Tbk?usp=drive_link" },
    { name: "Custom Mirrors",    folderId: "https://drive.google.com/drive/folders/1j1w9MaUwToR6X43yQ9gouXaCQahMDD5b?usp=drive_link" },
    { name: "Glass Railings",    folderId: "https://drive.google.com/drive/folders/1yUefuUEx2PQi5A9PqAEw3ThwW7y439_-?usp=drive_link" },
    { name: "Storefronts",       folderId: "https://drive.google.com/drive/folders/1Y_DL8RLUnZya3KKZ-WLQPeyrqnHweEsr?usp=drive_link" },
    { name: "Office Partitions", folderId: "https://drive.google.com/drive/folders/1coUFzbk-Ot6Z84YdGxnYADG52KArLPWS?usp=drive_link" }
  ]

};
