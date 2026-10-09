export interface RSVP {
  attendance: 'yes' | 'no';
  accommodation: 'castle' | 'other' | null;
  participationDays: string[];
  email: string | null;
  guests: {
    name: string;
    dietaryRestrictions: string;
  }[];
}

export type RSVPFormProps = {
  submitCallback: (rsvp: RSVP) => void;
};

export type RsvpResponse = RSVP;