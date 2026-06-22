How to create a new user review page

1. Copy the `_template` folder to a new folder named for the user (for example `user123`).
2. Edit `config.json` inside the new folder to set `businessName`, `logo` (replace with a local file if desired), `googleReviewUrl` (use Google Place Review link), and `contactUrl`.
3. Optionally replace `logo` file in the folder with a custom `logo.png`.
4. To keep a single source of truth, you can keep an iframe wrapper that points to `../_template/index.html` as shown in `velocityi2/index.html`.

Notes:
- The template's `app.js` copies review text to clipboard and opens the configured `googleReviewUrl` when the "Copy & Open Google Review" button is clicked.
- For standalone deployments, copy `_template/index.html`, `app.js`, and `config.json` into the user's folder and update paths.
