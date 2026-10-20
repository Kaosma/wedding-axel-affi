import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';
import { db, push, ref } from '../../firebase/firebase';
import styled from 'styled-components';
import { useTheme } from '../../app/AppStyling';
import type { RSVP, RSVPFormProps } from '../../helpers/classes';
import { Heart } from 'lucide-react';

const FormContainer = styled.div`
  width: 100%;
  max-width: 500px;
  min-width: 0;
  margin: 2rem auto;
  padding: 2rem 3rem 3rem;
  background: #fff8f1;
  border-radius: 0.5rem;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  font-family: 'Georgia', serif;

  @media (max-width: 500px) {
    padding: 2rem 1.5rem 3rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const Question = styled.h3`
  margin: 0;
  color: var(--rsvp-primary);
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.4;
`;

const Input = styled.input`
  width: 100%;
  box-sizing: border-box;
  padding: 0.75rem 1rem;
  border: 1px solid #d3c6ba;
  background: #fff;
  color: #000;
  font-family:
    'Gill Sans',
    'Gill Sans MT',
    Calibri,
    'Trebuchet MS',
    sans-serif;

  &:focus {
    outline: none;
    border-color: var(--rsvp-secondary);
  }

  &:-webkit-autofill {
    box-shadow: 0 0 0 1000px white inset !important;
    -webkit-text-fill-color: black !important;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 100px;
  box-sizing: border-box;
  padding: 0.75rem 1rem;
  border: 1px solid #d3c6ba;
  background: #fff;
  color: #000;
  resize: vertical;
  font-family:
    'Gill Sans',
    'Gill Sans MT',
    Calibri,
    'Trebuchet MS',
    sans-serif;

  &:focus {
    outline: none;
    border-color: var(--rsvp-secondary);
  }
`;

const OptionList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Option = styled.label`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--rsvp-primary);
  cursor: pointer;
  font-family:
    'Gill Sans',
    'Gill Sans MT',
    Calibri,
    'Trebuchet MS',
    sans-serif;
  line-height: 1.4;
`;

const Radio = styled.input`
  width: 1.2rem;
  height: 1.2rem;
  flex-shrink: 0;
  margin: 0;
  appearance: none;
  -webkit-appearance: none;
  border: 2px solid var(--rsvp-primary);
  border-radius: 50%;
  background-color: #fff;
  cursor: pointer;
  display: grid;
  place-content: center;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &::before {
    content: '';
    width: 0.55rem;
    height: 0.55rem;
    border-radius: 50%;
    background-color: #fff;
    transform: scale(0);
    transition: transform 0.15s ease;
  }

  &:checked {
    background-color: var(--rsvp-secondary);
    border-color: var(--rsvp-secondary);
  }

  &:checked::before {
    transform: scale(1);
  }

  &:focus-visible {
    outline: 2px solid var(--rsvp-secondary);
    outline-offset: 2px;
  }

  &:disabled {
    background-color: #f5f5f5;
    border-color: #d3c6ba;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const Checkbox = styled.input`
  width: 1.2rem;
  height: 1.2rem;
  flex-shrink: 0;
  margin: 0;
  appearance: none;
  -webkit-appearance: none;
  border: 2px solid var(--rsvp-primary);
  border-radius: 0.25rem;
  background-color: #fff;
  cursor: pointer;
  display: grid;
  place-content: center;
  transition:
    background-color 0.2s ease,
    border-color 0.2s ease;

  &::before {
    content: '✓';
    color: #fff;
    font-size: 0.85rem;
    font-weight: bold;
    line-height: 1;
    transform: scale(0);
    transition: transform 0.15s ease;
  }

  &:checked {
    background-color: var(--rsvp-secondary);
    border-color: var(--rsvp-secondary);
  }

  &:checked::before {
    transform: scale(1);
  }

  &:focus-visible {
    outline: 2px solid var(--rsvp-secondary);
    outline-offset: 2px;
  }

  &:disabled {
    background-color: #f5f5f5;
    border-color: #d3c6ba;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const GuestContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-top: 1rem;
  border-top: 1px solid #d3c6ba;
`;

const GuestHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const GuestTitle = styled.h4`
  margin: 0;
  color: var(--rsvp-primary);
  font-size: 0.95rem;
`;

const RemoveButton = styled.button`
  padding: 0.25rem;
  border: none;
  background: none;
  color: #000;
  cursor: pointer;
  font-size: 1.25rem;

  &:hover {
    font-weight: bold;
  }
`;

const AddGuestButton = styled.button`
  align-self: flex-start;
  padding: 0;
  border: none;
  background: none;
  color: var(--rsvp-primary);
  cursor: pointer;
  font-size: 0.85rem;

  &:hover {
    text-decoration: underline;
  }
`;

const SubmitButton = styled.button`
  padding: 0.75rem 1.5rem;
  border: 1px solid var(--rsvp-dark);
  border-radius: 1rem;
  background-color: var(--rsvp-pink);
  color: var(--rsvp-dark);
  cursor: pointer;
  font-family: 'linnea-bold', 'PP Cirka', sans-serif;
  font-size: 1rem;
  font-weight: 800;

  &:hover {
    opacity: 0.9;
    text-decoration: underline;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
    color: #fff;
    border-color: var(--rsvp-pink);
  }
`;

const HeartOption = styled.label`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  color: var(--rsvp-primary);
  cursor: pointer;
  font-family:
    'Gill Sans',
    'Gill Sans MT',
    Calibri,
    'Trebuchet MS',
    sans-serif;
  text-align: center;
`;

const HiddenRadio = styled.input`
  position: absolute;
  opacity: 0;
  pointer-events: none;

  &:focus-visible + svg {
    outline: 2px solid var(--rsvp-secondary);
    outline-offset: 4px;
    border-radius: 0.25rem;
  }
`;

const HeartRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 3rem;
  margin-top: 0.5rem;

  @media (max-width: 500px) {
    gap: 1.5rem;
  }
`;

type Attendance = 'yes' | 'no' | '';
type Accommodation = 'castle' | 'other' | '';

type Guest = {
  name: string;
  dietaryRestrictions: string;
};

type FormData = {
  attendance: Attendance;
  accommodation: Accommodation;
  participationDays: string[];
  email: string;
  guests: Guest[];
  unableToAttendName: string;
};

interface FamilyRSVPFormProps extends RSVPFormProps {
  role: string | null;
}

const createInitialFormData = (): FormData => ({
  attendance: '',
  accommodation: '',
  participationDays: [],
  email: '',
  guests: [
    {
      name: '',
      dietaryRestrictions: '',
    },
  ],
  unableToAttendName: '',
});

function FamilyRSVPForm({
  submitCallback,
  role,
}: FamilyRSVPFormProps) {
  const theme = useTheme();

  const [formData, setFormData] = useState<FormData>(
    createInitialFormData
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableDays = [
    ...(role === 'family'
      ? []
      : [
        {
          value: 'Friday',
          label: 'Friday - Welcome Dinner for Friends',
        },
        {
          value: 'SaturdayLunch',
          label: 'Saturday - Lunch',
        },
      ]),
    {
      value: 'Saturday',
      label: 'Saturday - Wedding Ceremony and Dinner',
    },
    {
      value: 'Sunday',
      label: 'Sunday - Goodbye Breakfast',
    },
  ];

  const handleUnableToAttendNameChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    setFormData((previous) => ({
      ...previous,
      unableToAttendName: value,
    }));
  };

  const handleAttendanceChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const attendance = event.target.value as Attendance;

    setFormData((previous) => ({
      ...previous,
      attendance,
      participationDays:
        attendance === 'no' ? [] : previous.participationDays,
      accommodation:
        attendance === 'no' ? '' : previous.accommodation,
      guests:
        attendance === 'no'
          ? createInitialFormData().guests
          : previous.guests,
    }));
  };

  const handleEmailChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value;

    setFormData((previous) => ({
      ...previous,
      email: value,
    }));
  };

  const handleAccommodationChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const accommodation = event.target.value as Accommodation;

    setFormData((previous) => ({
      ...previous,
      accommodation,
    }));
  };

  const handleParticipationDaysChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = event.target;

    setFormData((previous) => ({
      ...previous,
      participationDays: checked
        ? [...previous.participationDays, value]
        : previous.participationDays.filter(
          (day) => day !== value
        ),
    }));
  };

  const handleGuestChange = (
    index: number,
    field: keyof Guest,
    value: string
  ) => {
    setFormData((previous) => ({
      ...previous,
      guests: previous.guests.map((guest, guestIndex) =>
        guestIndex === index
          ? { ...guest, [field]: value }
          : guest
      ),
    }));
  };

  const addGuest = () => {
    setFormData((previous) => ({
      ...previous,
      guests: [
        ...previous.guests,
        {
          name: '',
          dietaryRestrictions: '',
        },
      ],
    }));
  };

  const removeGuest = (index: number) => {
    setFormData((previous) => ({
      ...previous,
      guests: previous.guests.filter(
        (_, guestIndex) => guestIndex !== index
      ),
    }));
  };

  const canSubmit =
    !isSubmitting &&
    formData.attendance !== '' &&
    (formData.attendance === 'no'
      ? formData.unableToAttendName.trim().length > 0
      : formData.accommodation !== '' &&
      formData.email.trim().length > 0 &&
      formData.participationDays.length > 0 &&
      formData.guests.length > 0 &&
      formData.guests.every(
        (guest) => guest.name.trim().length > 0
      ));

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!canSubmit) {
      return;
    }

    const response: RSVP =
      formData.attendance === 'no'
        ? {
          attendance: 'no',
          accommodation: null,
          participationDays: [],
          email: null,
          guests: [
            {
              name: formData.unableToAttendName.trim(),
              dietaryRestrictions: '',
            },
          ],
        }
        : {
          attendance: 'yes',
          accommodation:
            formData.accommodation === 'castle'
              ? 'castle'
              : 'other',
          participationDays: formData.participationDays,
          email: formData.email.trim(),
          guests: formData.guests.map((guest) => ({
            name: guest.name.trim(),
            dietaryRestrictions:
              guest.dietaryRestrictions.trim(),
          })),
        };

    setIsSubmitting(true);

    try {
      await push(ref(db, 'affiAxelRsvp'), response);
    } catch (error) {
      console.error('Error submitting RSVP:', error);
      alert('Error submitting RSVP. Please try again.');
      return;
    } finally {
      setIsSubmitting(false);
    }

    setFormData(createInitialFormData());
    submitCallback(response);
  };

  return (
    <FormContainer
      style={{
        '--rsvp-primary': theme.colors.red.primary,
        '--rsvp-secondary': theme.colors.red.secondary,
        '--rsvp-pink': theme.colors.red.pink,
        '--rsvp-dark': theme.colors.red.dark,
      } as import('react').CSSProperties}
    >
      <Form onSubmit={handleSubmit}>
        <Section>
          <Question>Will you be joining us?</Question>

          <HeartRow>
            <HeartOption htmlFor="attendance-yes">
              <HiddenRadio
                id="attendance-yes"
                type="radio"
                name="attendance"
                value="yes"
                checked={formData.attendance === 'yes'}
                onChange={handleAttendanceChange}
                required
              />

              <Heart
                size={54}
                fill={
                  formData.attendance === 'yes'
                    ? theme.colors.red.primary
                    : 'none'
                }
                color={theme.colors.red.primary}
                aria-hidden="true"
              />

              <span>Yes, we’ll be there!</span>
            </HeartOption>

            <HeartOption htmlFor="attendance-no">
              <HiddenRadio
                id="attendance-no"
                type="radio"
                name="attendance"
                value="no"
                checked={formData.attendance === 'no'}
                onChange={handleAttendanceChange}
                required
              />

              <Heart
                size={54}
                fill={
                  formData.attendance === 'no'
                    ? theme.colors.red.primary
                    : 'none'
                }
                color={theme.colors.red.primary}
                aria-hidden="true"
              />

              <span>Sadly, we can’t make it</span>
            </HeartOption>
          </HeartRow>

          {formData.attendance === 'no' && (
            <Input
              type="text"
              name="unableToAttendName"
              placeholder="Name"
              aria-label="Name"
              value={formData.unableToAttendName}
              onChange={handleUnableToAttendNameChange}
              required
            />
          )}
        </Section>

        {formData.attendance === 'yes' && (
          <>
            <Section>
              <Question>
                Will you be staying over at Häringe Castle?
              </Question>

              <OptionList>
                <Option htmlFor="accommodation-castle">
                  <Radio
                    id="accommodation-castle"
                    type="radio"
                    name="accommodation"
                    value="castle"
                    checked={
                      formData.accommodation === 'castle'
                    }
                    onChange={handleAccommodationChange}
                    required
                  />
                  Yes
                </Option>

                <Option htmlFor="accommodation-other">
                  <Radio
                    id="accommodation-other"
                    type="radio"
                    name="accommodation"
                    value="other"
                    checked={
                      formData.accommodation === 'other'
                    }
                    onChange={handleAccommodationChange}
                    required
                  />
                  No
                </Option>
              </OptionList>
            </Section>

            <Section>
              <Question>Participation days and meals</Question>

              <OptionList>
                {availableDays.map((day) => (
                  <Option
                    key={day.value}
                    htmlFor={`day-${day.value}`}
                  >
                    <Checkbox
                      id={`day-${day.value}`}
                      type="checkbox"
                      name="participationDays"
                      value={day.value}
                      checked={formData.participationDays.includes(
                        day.value
                      )}
                      onChange={handleParticipationDaysChange}
                    />
                    {day.label}
                  </Option>
                ))}
              </OptionList>
            </Section>

            <Section>
              <Input
                type="email"
                name="email"
                placeholder="Email"
                aria-label="Email"
                value={formData.email}
                onChange={handleEmailChange}
                autoComplete="email"
                required
              />
            </Section>

            <Section>
              <Question>Guest information</Question>

              {formData.guests.map((guest, index) => (
                <GuestContainer key={index}>
                  <GuestHeader>
                    <GuestTitle>Guest {index + 1}</GuestTitle>

                    {formData.guests.length > 1 && (
                      <RemoveButton
                        type="button"
                        onClick={() => removeGuest(index)}
                        aria-label={`Remove guest ${index + 1}`}
                      >
                        ×
                      </RemoveButton>
                    )}
                  </GuestHeader>

                  <Input
                    type="text"
                    placeholder="Name"
                    aria-label={`Guest ${index + 1} name`}
                    value={guest.name}
                    onChange={(event) =>
                      handleGuestChange(
                        index,
                        'name',
                        event.target.value
                      )
                    }
                    required
                  />

                  <Textarea
                    placeholder="Dietary restrictions or special requests"
                    aria-label={`Guest ${index + 1} dietary restrictions or special requests`}
                    value={guest.dietaryRestrictions}
                    onChange={(event) =>
                      handleGuestChange(
                        index,
                        'dietaryRestrictions',
                        event.target.value
                      )
                    }
                  />
                </GuestContainer>
              ))}

              <AddGuestButton type="button" onClick={addGuest}>
                Add guest +
              </AddGuestButton>
            </Section>
          </>
        )}

        <SubmitButton type="submit" disabled={!canSubmit}>
          {isSubmitting ? 'Submitting...' : 'Submit RSVP'}
        </SubmitButton>
      </Form>
    </FormContainer>
  );
}

export default FamilyRSVPForm;