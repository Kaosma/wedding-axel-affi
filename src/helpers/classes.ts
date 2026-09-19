export interface RSVP {
  email: string;
  arrival: string;
  departure: string;
  brunch: string;
  accommodation?: string;
  guests: {
    firstName: string;
    lastName: string;
    music: string;
    food: string;
    alcohol: string;
  }[];
}

export type RSVPFormProps = {
  submitCallback: (rsvp: RSVP) => void;
};

export type RsvpResponse = {
  email?: string;
  guests?: unknown[];
  accommodation?: string;
  music?: string;
  arrival?: string;
  departure?: string;
  brunch?: string;
};