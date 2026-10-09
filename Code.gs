/**
 * Thermal Engineering Assessment — Google Apps Script email endpoint
 *
 * SETUP:
 * 1. Go to https://script.google.com and create a new project.
 * 2. Replace the placeholder below with the instructor's Gmail address.
 * 3. Paste this code into Code.gs and save.
 * 4. Deploy > New deployment > Select type: Web app.
 * 5. Execute as: Me.
 * 6. Who has access: Anyone (needed for a standalone HTML page to POST without signing in).
 *    This means the endpoint is public. Do not treat a shared secret in HTML as secure.
 * 7. Click Deploy, authorize permissions, then copy the Web app URL ending in /exec.
 * 8. Paste that URL into APPS_SCRIPT_ENDPOINT in the HTML file.
 */
const RECIPIENT_EMAIL = "jontorapadang35@gmail.com,terondhorom35@gmail.com";
const EMAIL_SUBJECT_PREFIX = "Thermal Engineering Assessment Report";

function doPost(e) {
  try {
    if (!e || !e.postData || !e.postData.contents) {
      return jsonResponse({ ok: false, message: "Missing request body." });
    }

    const data = JSON.parse(e.postData.contents);
    if (!data.student || !data.result || !data.reportText) {
      return jsonResponse({ ok: false, message: "Required report fields are missing." });
    }

    const studentName = String(data.student.name || "Unknown student").slice(0, 120);
    const rollNo = String(data.student.roll || "Unknown roll").slice(0, 60);
    const total = Number(data.result.total);
    const subject = `${EMAIL_SUBJECT_PREFIX} — ${studentName} (${rollNo})`;

    const body =
      `A Thermal Engineering assessment has been submitted.\n\n` +
      `Student: ${studentName}\n` +
      `Roll number: ${rollNo}\n` +
      `Score: ${Number.isFinite(total) ? total : "N/A"}/10\n` +
      `Submitted: ${String(data.finishedAt || "Unknown")}\n\n` +
      `Full report:\n\n${String(data.reportText).slice(0, 45000)}\n\n` +
      `Note: This report was sent by a browser-based assessment page. Verify short-answer marks manually.`;

    MailApp.sendEmail({
      to: RECIPIENT_EMAIL,
      subject: subject,
      body: body,
      name: "Thermal Engineering Assessment"
    });

    return jsonResponse({ ok: true, message: "Email sent." });
  } catch (err) {
    console.error(err);
    return jsonResponse({ ok: false, message: String(err && err.message || err) });
  }
}

function doGet() {
  return ContentService
    .createTextOutput("Thermal Engineering Assessment email endpoint is active.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function jsonResponse(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
