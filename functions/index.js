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
exports.sendConfirmationEmail = onCall(async (request) => {
  try {
    const { email, arrival, departure, guests, accommodation, role, brunch } = request.data;

    // Validera input
    if (!email) throw new Error("Email saknas");
    if (!Array.isArray(guests)) throw new Error("Guests måste vara en array");

    // Beräkna pris
    const isHerrgard = !role?.startsWith('hotel') && accommodation === 'herrgarden';
    const includesBrunch = brunch === 'brunch';
    const pricePerGuest = isHerrgard ? 2000 : 0;
    const totalGuests = guests.length;
    const totalPriceAllGuests = pricePerGuest * totalGuests;

    // Skicka e-post
    await resend.emails.send({
      from: `"Wedding RSVP" <no-reply@euawedding.com>`,
      to: email,
      subject: "💍 Your Wedding RSVP Confirmation",
      html: `
        <div style="
          font-family: 'Georgia', serif;
          background-color: #fcf6f3;
          padding: 35px 20px;
          border-radius: 12px;
          color: #5a4634;
          max-width: 640px;
          margin: auto;
          border: 1px solid #f2e3d7;
          box-shadow: 0 4px 10px rgba(214, 169, 142, 0.15);
        ">
          <h1 style="
            text-align: center;
            color: #b05a3c;
            margin-bottom: 20px;
            font-size: 26px;
          ">
            💌 Thank You for Your RSVP!
          </h1>

          <p style="font-size: 16px; line-height: 1.6; text-align: center;">
            We’re so excited to have you join us on our special day!
            Here are your RSVP details:
          </p>

          <div style="
            background-color: #fff;
            padding: 20px 20px;
            border-radius: 10px;
            margin-top: 20px;
            border: 1px solid #eed9c5;
          ">
            <p><strong style="color: #a15236;">Days:</strong> ${arrival} - ${departure}</p>
            <p><strong style="color: #a15236;">Saturday Brunch:</strong> ${includesBrunch ? 'Yes' : 'No'}</p>
            <p><strong style="color: #a15236;">Accommodation:</strong> ${isHerrgard ? 'We welcome you to stay at Schenströmska with us!' : 'Do not forget to book your accomodation nearby!'}</p>
            ${isHerrgard ? `
            <p><strong style="color: #a15236;">Price per guest:</strong> ${pricePerGuest} SEK</p>
            <p><strong style="color: #a15236;">Total for ${totalGuests} guest(s):</strong> ${totalPriceAllGuests} SEK</p>
            <p style="margin-top: 15px; margin-bottom: 10px; font-size: 15px; line-height: 1.6;">
              <strong style="color: #a15236;">Payment:</strong> You can pay via Swish to <strong>+46762731333</strong> or by bank transfer to SEB account <strong>56990401761</strong>. Mark the payment with your name.
            </p>
            <p style="margin-bottom: 10px; font-size: 15px; line-height: 1.6;">
              <strong style="color: #a15236;">Last payment date:</strong> March 31st
            </p>` : ''}
            <p style="margin-bottom: 10px;"><strong style="color: #a15236;">Guests:</strong></p>

            ${guests.map(g => `
              <div style="
                margin-bottom: 15px;
                background: #fff8f5;
                padding: 12px 15px;
                border-radius: 8px;
                border: 1px solid #f1d4c6;
              ">
                <strong style="
                  display: block;
                  font-size: 16px;
                  color: #b05a3c;
                  margin-bottom: 6px;
                ">
                  ${g.firstName} ${g.lastName}
                </strong>
                <div style="font-size: 14px; line-height: 1.5;">
                  <p>🍽 <strong style="color: #a15236;">Food Preference:</strong> ${g.food}</p>
                  <p>🎵 <strong style="color: #a15236;">Music Preference:</strong> ${g.music}</p>
                  <p>🍷 <strong style="color: #a15236;">Alcohol Preference:</strong> ${g.alcohol}</p>
                </div>
              </div>
            `).join('')}
          </div>

          <p style="margin-top: 25px; font-size: 16px; text-align: center;">
            We can’t wait to celebrate with you! 🧡
          </p>

          <p style="
            text-align: center;
            margin-top: 30px;
            font-size: 14px;
            color: #a1866f;
          ">
            With love,<br>
            <em>The Wedding Couple</em>
          </p>
          <img src="https://euawedding.com/favicon.png" alt="Wedding Logo" width="120" style="display:block;margin:auto;margin-top: 20px;">
        </div>
      `,
    });

    console.log(`✅ Email sent to ${email}`);
    return { success: true };

  } catch (error) {
    console.error("❌ Error sending email:", error?.response || error);
    throw new Error(error.message || "Unable to send email. Kontrollera API key och input.");
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
