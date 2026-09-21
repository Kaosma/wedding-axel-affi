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
  { questionKey: "question1", answerKey: "answer1" },
  { questionKey: "question2", answerKey: "answer2" },
  { questionKey: "question3", answerKey: "answer3" },
  { questionKey: "question4", answerKey: "answer4" },
  { questionKey: "question5", answerKey: "answer5" },
  { questionKey: "question6", answerKey: "answer6" },
  { questionKey: "question7", answerKey: "answer7" },
  { questionKey: "question8", answerKey: "answer8" },
  { questionKey: "question9", answerKey: "answer9" },
  { questionKey: "question10", answerKey: "answer10" },
  { questionKey: "question11", answerKey: "answer11" },
  { questionKey: "question12", answerKey: "answer12" },
];