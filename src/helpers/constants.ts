const bucketUrl = 'https://pub-c969fab9789641878859031eb5d2ddf2.r2.dev/';
function newUrl(url: string): string {
  return bucketUrl + url;
}

export const introImage = newUrl('intro_all.png');
export const middleEnglish = newUrl('middle_en.png');
export const backEnglish = newUrl('back_en.png');
export const timelineEnglish = newUrl('timeline_en.png');
export function getEnglishImage(code: string): string {
  return newUrl(`front_en_${code}.png`);
}
export const logoUrl = newUrl('weddinglogo.svg');
export const logoTerracottaImg = newUrl('weddinglogoTerracotta.svg');
export const homeImg = newUrl('home.jpg');
export const scheduleImg = newUrl('schedule.png');
export const qaImg = newUrl('qa.png');
export const mansionImg = newUrl('herrgard.jpg');
export const mapImg = newUrl('map.jpg');
export const pic1Img = newUrl('weddingpic1.png');
export const pic2Img = newUrl('weddingpic2.png');
export const pic4Img = newUrl('weddingpic4.png');
export const invitationImg = newUrl('weddingpic3.png');
export const danceLogo = newUrl('dance-logo.png');
export const saraImage = newUrl('sara.JPG');
export const ivarImage = newUrl('ivar.jpg');
export const loginLogo = newUrl('loginlogo.png');

export const passcodes: Record<string, string> = {
  july2027: 'family',
  sexy: 'friends',
};

export const validCodes = ['2819', '3737', '4619', '5582', '6491', '7364', '8712'];

export const TOTAL_GUESTS = 211;

/** Wedding day date for countdown and "The Big Day" (July 25, 2026 2:00 PM local) */
export const weddingDate = new Date(2026, 6, 25, 16, 0, 0);

/** Firebase folder for guest photo uploads (`{day}/{uuid}.jpg`). Switch per wedding day. */
export type WeddingPhotoUploadDay = 'friday' | 'saturday' | 'sunday';

/** Change to `'saturday'` (or `'sunday'`) on that day; guests always use `/upload`. */
export const weddingPhotoUploadDay: WeddingPhotoUploadDay = 'saturday';

export const faqs: { questionKey: string; answerKey: string }[] = [
  {
    questionKey: "Where will the ceremony and reception take place?",
    answerKey:
      "The whole ceremony will take place within the confines of Häringe Castle.",
  },
  {
    questionKey: "Do I have to stay at Häringe Castle?",
    answerKey:
      "We would love for our overseas guests to stay with us at the castle. If you live in Stockholm, we hope you’ll consider making it a little staycation, but we completely understand if you prefer to join us just for the day.",
  },
  {
    questionKey: "How do I book my stay at Häringe Castle?",
    answerKey:
      "Please book your hotel room at the castle using the following link.",
  },
  {
    questionKey: "Can I bring a plus one and/or children?",
    answerKey:
      "Due to space limitations, invitations are extended to the named guests only. We have already included plus ones where possible, but if you are unsure, please reach out to us. Children are very welcome!",
  },
  {
    questionKey: "Will there be vegetarian or special meal options?",
    answerKey:
      "Yes, please let us know of any dietary restrictions or preferences when you RSVP so we can accommodate everyone.",
  },
  {
    questionKey: "What time does the event end?",
    answerKey:
      "The celebrations will conclude at 12pm during checkout on Sunday, 4 July. More information can be found in the schedule tab.",
  },
  {
    questionKey: "Can I bring a gift?",
    answerKey:
      "Your presence at our wedding is the greatest gift we could ask for. If you would like to contribute something extra, a contribution to our honeymoon fund would be greatly appreciated, but please know that celebrating with us is more than enough.\n\nSwish: +46702363332\nPayNow: 92483425\nWISE: @axelgustafh",
  },
  {
    questionKey: "How do I RSVP?",
    answerKey:
      "Simply navigate to RSVP and fill out the form. We look forward to hearing from you!",
  },
  {
    questionKey: "Is it possible to swim near the venue?",
    answerKey:
      "Absolutely so bring your swimmers! Häringe Slott is home to Sweden’s first Olympic-size outdoor swimming pool, and the castle is also bordered by a beautiful lake. For those looking to relax, there is also a traditional sauna available for guests to enjoy during their stay.",
  },
  {
    questionKey:
      "Are there any activities planned for guests before or after the wedding?",
    answerKey:
      "Since we have many guests flying from abroad, we want to make the best of their time in Sweden. We will be arranging a casual get-together in the days leading up to the wedding, with more details to follow on WhatsApp.\n\nFor our Swedish friends, it would be very helpful if you also have WhatsApp so you can stay updated on the plans.",
  },
  {
    questionKey: "Will transportation be provided for the guests?",
    answerKey:
      "We kindly ask guests to arrange their own transportation to and from the venue. More information on transportation options can be found under the travel tab.",
  },
  {
    questionKey: "What weather can I expect?",
    answerKey:
      "Swedish summers can be incredibly unpredictable. The days may be warm, but the evenings can get quite chilly, so we recommend bringing a few layers and something suitable in case of rain.",
  },
  {
    questionKey: "What is the dress code?",
    answerKey:
      "Please see the information tab but we would recommend coming prepared for the weather.",
  },
  {
    questionKey: "Is Häringe Castle pet-friendly?",
    answerKey: "Yes, all the hotel rooms are pet-friendly.",
  },
  {
    questionKey: "Is there an open bar?",
    answerKey:
      "Drinks will be served at various moments throughout the wedding. There won’t be an open bar, but you’ll be able to purchase additional drinks at the bar(s).",
  },
];