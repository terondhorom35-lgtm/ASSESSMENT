# Thermal Engineering Assessment

A standalone, browser-based Thermal Engineering assessment for Mechanical Engineering students.

## Features

- Student login form (name, roll number, access code)
- 20-minute countdown and automatic submission on timeout
- 6 MCQs (6 marks) + 2 short-answer questions (4 marks), total 10 marks
- Browser-based monitoring warnings for tab/page visibility changes, focus loss, full-screen exit, right-click, clipboard shortcuts and pointer leaving the window
- Submission page with score breakdown
- Downloadable TXT and CSV reports
- Email report button connected to a Google Apps Script Web App
- Two configured report recipients:
  - `jontorapadang35@gmail.com`
  - `terondhorom35@gmail.com`

## Repository contents

- `index.html` — GitHub Pages website entry point
- `Code.gs` — Google Apps Script endpoint source (deploy separately in Apps Script)
- `.nojekyll` — tells GitHub Pages not to run Jekyll processing
- `.gitignore` — common local editor/OS files

## Run locally

Download or clone this repository and open `index.html` in a modern browser (Chrome or Edge recommended).

The assessment uses the configured Apps Script URL. Email delivery requires the Apps Script deployment to be active and authorized.

## Publish with GitHub Pages

1. Create a GitHub repository, for example `thermal-engineering-assessment`.
2. Upload all files in this package to the repository root (not inside an extra nested folder).
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, select **Deploy from a branch**.
5. Select branch `main` and folder `/(root)`, then click **Save**.
6. Wait for GitHub Pages to publish the site. The public URL will appear in the Pages section, usually in the form:
   `https://YOUR-USERNAME.github.io/thermal-engineering-assessment/`
7. Open the published URL and test with a sample student submission.

## Google Apps Script email setup

The `index.html` file is already configured with the supplied Web App endpoint. The Apps Script source `Code.gs` is configured to email reports to both recipients listed above.

If the live endpoint does not already run this exact code:

1. Open [Google Apps Script](https://script.google.com/) using the Google account authorized to send email.
2. Open the project that owns the Web App endpoint, or create a project and paste the contents of `Code.gs`.
3. Save the code and confirm the recipient addresses at the top of the file.
4. Deploy as a Web app, executing as **Me**. For this simple public static site, access must allow unauthenticated requests (commonly **Anyone**).
5. Authorize the requested mail permissions.
6. If updating an existing deployment, use **Deploy → Manage deployments → Edit → New version → Deploy**. Keep the existing deployment if you want the current URL to continue working.
7. Test by submitting a sample assessment and clicking **Email report to instructor**. Check both recipients' inbox and spam folders. The browser cannot confirm actual email delivery; check Apps Script **Executions** if no email arrives.

## Important limitations and security

- This is a client-side demonstration, not a secure exam platform. Browser monitoring can be bypassed.
- The access code is stored in `index.html` and can be viewed by anyone with access to the page source. Do not use it as a real authentication secret.
- The Apps Script endpoint is included in the public HTML. A publicly accessible endpoint can be abused to trigger emails. Consider rate limiting, authentication, server-side validation, or a managed assessment platform before using this with a large class.
- Short answers are graded using approximate keyword matching and should be checked manually before official marks are recorded.
- The email request uses browser `no-cors` mode, so the page can show that a request was initiated but cannot verify that the email was delivered.
- The report includes student names, roll numbers, answers and monitoring events. Share and retain this data responsibly.
- GitHub Pages is static hosting; it does not run `Code.gs`. Google Apps Script must be deployed separately.

## License

This project is provided as-is for educational demonstration. Adapt it to your institution's privacy, accessibility and examination policies before use.
