# Order Management

## Recommended Free Setup

Use Netlify Forms as the first version.

Customer experience:

1. Customer fills the form on the site.
2. Customer clicks "Envoyer la demande".
3. Customer stays on the site and sees the confirmation toast.

Owner workflow:

1. Open Netlify.
2. Go to the `clean-TN` site.
3. Open `Forms`.
4. Select `kit-order`.
5. Review demandes in the table.
6. Export CSV when you want to open the data in Excel or Google Sheets.

## Why This Is Good For Launch

- Free for early volume.
- No WhatsApp app opens for the user.
- No email dependency.
- All demandes stay in one dashboard.
- CSV export can be opened in Excel as a spreadsheet.

## Optional Later Upgrade

When order volume grows, connect the form to Google Sheets using Zapier,
Make, or a small Google Apps Script endpoint. That gives a live shared sheet,
but it needs one extra account setup step.
