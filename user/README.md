How to create a new user review page

1. Copy the `_template` folder to a new folder named for the user (for example `velocityi2` or `user2`).
2. Edit `config.json` inside the new folder to set:
   - `businessName`
   - `businessTag`
   - `logo` (place the image file in the user folder)
   - `googleReviewUrl` (Google Place Review link)
   - `contactUrl`
   - `startDate` / `expiryDate`
   - `contactLinks`
3. Add the user logo file to the new folder and set `logo` to its filename.
4. Keep the shared `user/app.js` and `user/style.css` as the common UI engine for all user folders.

Notes:
- `index.html` and `contact/index.html` inside each user folder reference the shared `app.js` and `style.css` from the `user/` folder.
- For a new user, copy `_template`, rename the folder, update `config.json`, and place the logo image file. No need to duplicate `app.js` or `style.css`.
