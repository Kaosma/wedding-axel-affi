// test-preview.js
const fs = require("fs");

// Example guest data
const arrival = "Fri";
const departure = "Sun";
const isHerrgard = false;
const guests = [
  { firstName: "Erik", lastName: "Ugarte", food: "Matis", music: "Songis", alcohol: "Alcohol" },
  { firstName: "Sofia", lastName: "Lind", food: "Vegetarian", music: "Jazz", alcohol: "Wine" },
];

const html = `
  <div style="
          font-family: 'Georgia', serif;
          background-color: #fcf6f3;
          padding: 35px;
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
            padding: 20px 25px;
            border-radius: 10px;
            margin-top: 20px;
            border: 1px solid #eed9c5;
          ">
            <p><strong style="color: #a15236;">Days:</strong> ${arrival} - ${departure}</p>
            <p><strong style="color: #a15236;">Accommodation:</strong> ${isHerrgard ? 'We welcome you to stay at Schenströmska with us!' : 'Do not forget to book your accomodation nearby!'}</p>
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
`;

// Save HTML preview file
fs.writeFileSync("preview.html", html);
console.log("✅ Preview saved to preview.html — open it in your browser!");
