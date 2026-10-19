// Ladda .env vid lokal körning
require("dotenv").config();

// Importer
const { onCall } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2/options");
const { Resend } = require('resend');
const functions = require("firebase-functions");
const admin = require("firebase-admin");
const Busboy = require("busboy");
const { v4: uuidv4 } = require("uuid");

const resend = new Resend(process.env.RESEND_API_KEY);

setGlobalOptions({ region: "europe-west1", cpu: 1 });

// Initiera Firebase Admin
admin.initializeApp();
const bucket = admin.storage().bucket();

// --- Funktion ---
exports.sendAfsoonAxelConfirmationEmail = onCall(async (request) => {
  try {
    const {
      email,
      participationDays = [],
      guests,
      accommodation,
    } = request.data;

    // Validera input
    if (!email) throw new Error("Email saknas");
    if (!Array.isArray(guests)) throw new Error("Guests måste vara en array");
    if (!Array.isArray(participationDays)) {
      throw new Error("Participation days måste vara en array");
    }

    const staysAtCastle = accommodation === "castle";
    const includesFriday = participationDays.includes("Friday");
    const includesSaturday = participationDays.includes("Saturday");
    const includesSunday = participationDays.includes("Sunday");
    const includesSaturdayLunch = participationDays.includes("SaturdayLunch");

    let daysText = "";

    if (includesFriday && includesSaturday && includesSunday) {
      daysText = "Friday to Sunday (2 - 4 July 2027)";
    } else if (!includesFriday && includesSaturday && includesSunday) {
      daysText = "Saturday to Sunday (3 - 4 July 2027)";
    } else if (!includesFriday && includesSaturday && !includesSunday) {
      daysText = "Saturday (3 July 2027)";
    } else if (includesFriday && includesSaturday && !includesSunday) {
      daysText = "Friday to Saturday (2 - 3 July 2027)";
    } else if (includesFriday && !includesSaturday && includesSunday) {
      daysText = "Friday and Sunday (2 and 4 July 2027)";
    } else if (includesFriday) {
      daysText = "Friday (2 July 2027)";
    } else if (includesSunday) {
      daysText = "Sunday (4 July 2027)";
    }

    const escapeHtml = (value) =>
      String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    // Skicka e-post med din befintliga Resend-klient
    const { error } = await resend.emails.send({
      from: `"Afsoon & Axel" <no-reply@afsoonaxelwedding.com>`,
      to: email,
      subject: "💍 Your Wedding RSVP Confirmation",
      html: `
        <div style="
          font-family: 'Georgia', serif;
          background-color: #fcf5eb;
          padding: 35px 20px;
          border-radius: 12px;
          color: #ed1215;
          max-width: 640px;
          margin: auto;
          border: 1px solid #f8dfdb;
          box-shadow: 0 4px 10px rgba(252, 34, 17, 0.08);
        ">
          <h1 style="
            text-align: center;
            color: #fc2211;
            margin-bottom: 20px;
            font-size: 26px;
          ">
            💌 Thank You for Your RSVP!
          </h1>

          <p style="font-size: 16px; line-height: 1.6; text-align: center; color: #000000;">
            We’re so excited to have you join us on our special day!
            Here are your RSVP details:
          </p>

          <div style="
            background-color: #fce4de;
            padding: 20px;
            border-radius: 10px;
            margin-top: 20px;
            border: 1px solid #f8dfdb;
          ">
            ${daysText
          ? `
                  <p style="color: #000000;">
                    <strong style="color: #ed1215;">Days:</strong>
                    ${daysText}
                  </p>
                `
          : ""
        }

            ${staysAtCastle
          ? `
                  <p style="color: #000000;">
                    We welcome you to stay at Häringe Castle with us!
                  </p>
                  <p style="color: #000000;">
                    Please book your rooms using the link and booking code
                    provided in the Accommodation tab on our wedding website.
                  </p>
                `
          : ""
        }

            ${includesSaturdayLunch
          ? `
                  <p style="color: #000000;">
                    <strong style="color: #ed1215;">Saturday Lunch:</strong>
                    Yes
                  </p>
                `
          : ""
        }

            <p style="margin-bottom: 10px; color: #000000;">
              <strong style="color: #ed1215;">Guests:</strong>
            </p>

            ${guests.map(g => `
              <div style="
                margin-bottom: 15px;
                background: #fce4de;
                padding: 12px 15px;
                border-radius: 8px;
                border: 1px solid #f9d6f1;
              ">
                <strong style="
                  display: block;
                  font-size: 16px;
                  color: #fc2211;
                  margin-bottom: 6px;
                ">
                  ${escapeHtml(g.name)}
                </strong>

                <div style="font-size: 14px; line-height: 1.5;">
                  <p style="color: #ed1215;">
                    🍽 <strong style="color: #000000;">
                      Food Preference:
                    </strong>
                    ${escapeHtml(g.dietaryRestrictions || "None specified")}
                  </p>
                </div>
              </div>
            `).join("")}
          </div>

          <p style="margin-top: 25px; font-size: 16px; text-align: center; color: #000000;">
            We can’t wait to celebrate with you! ❤️
          </p>

          <p style="
            text-align: center;
            margin-top: 30px;
            font-size: 14px;
            color: #ed1215;
          ">
            With love,<br>
            <em>Afsoon & Axel</em>
          </p>
        </div>
      `,
    });

    if (error) throw new Error(error.message);

    console.log(`✅ Email sent to ${email}`);
    return { success: true };
  } catch (error) {
    console.error("❌ Error sending email:", error?.response || error);
    throw new Error(
      error.message || "Unable to send email. Kontrollera API key och input."
    );
  }
});

exports.uploadWeddingPhoto = functions.https.onRequest((req, res) => {
  // --- CORS headers ---
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).send("");
  if (req.method !== "POST") return res.status(405).send("Method Not Allowed");

  const busboy = Busboy({ headers: req.headers });
  const uploadedFiles = []; // store { fileName, promise }
  let eventId = "unknown";

  busboy.on("field", (fieldname, value) => {
    if (fieldname === "eventId") eventId = value.toLowerCase();
  });

  busboy.on("file", (fieldname, file, info) => {
    const { mimeType } = info;
    if (!mimeType.startsWith("image/")) {
      file.resume();
      return;
    }

    const fileName = `${eventId}/${uuidv4()}.jpg`;
    const firebaseFile = bucket.file(fileName);

    const uploadPromise = new Promise((resolve, reject) => {
      file
        .pipe(firebaseFile.createWriteStream({ metadata: { contentType: mimeType } }))
        .on("finish", resolve)
        .on("error", reject);
    });

    uploadedFiles.push({ fileName, promise: uploadPromise });
  });

  busboy.on("finish", async () => {
    try {
      // Wait for all uploads
      await Promise.all(uploadedFiles.map(f => f.promise));

      // Make all uploaded files public
      await Promise.all(uploadedFiles.map(f => bucket.file(f.fileName).makePublic()));

      res.status(200).json({ success: true });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "Upload failed" });
    }
  });

  busboy.end(req.rawBody);
});

exports.getWeddingImages = functions.https.onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") return res.status(204).send("");
  if (req.method !== "GET") return res.status(405).send("Method Not Allowed");

  const day = (req.query.day || "").toLowerCase();
  if (!["friday", "saturday", "sunday"].includes(day))
    return res.status(400).json({ error: "Invalid or missing day parameter" });

  const parsedLimit = parseInt(req.query.limit, 10);
  const limit = Number.isFinite(parsedLimit)
    ? Math.min(Math.max(parsedLimit, 1), 100)
    : 9;
  const pageToken = req.query.pageToken || undefined;

  try {
    const [files, , apiResponse] = await bucket.getFiles({
      prefix: `${day}/`,
      maxResults: limit,
      pageToken,
      autoPaginate: false,
    });

    const urls = files
      .filter((file) => file.name && !file.name.endsWith("/"))
      .map(
        (file) => `https://storage.googleapis.com/${bucket.name}/${file.name}`
      );

    res.json({
      images: urls,
      nextPageToken: apiResponse?.nextPageToken || null,
    });
  } catch (err) {
    console.error("Error fetching images:", err);
    res.status(500).json({ error: "Failed to fetch images" });
  }
});
