export interface RSVP {
  attendance: 'yes' | 'no';
  accommodation: 'castle' | 'other' | null;
  participationDays: string[];
  guests: {
    name: string;
    dietaryRestrictions: string;
  }[];
}

export type RSVPFormProps = {
  submitCallback: (rsvp: RSVP) => void;
};

export type RsvpResponse = RSVP;