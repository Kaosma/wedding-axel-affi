import { ChangeEvent, FormEvent, useState } from 'react';
import { db, push, ref } from '../../firebase/firebase';
import styled from 'styled-components';
import { useTheme } from '../../app/AppStyling';
import { RSVPFormProps } from '../../helpers/classes';
import { Heart } from 'lucide-react';

const FormContainer = styled.div`
  max-width: 500px;
  min-width: 350px;
  margin: 2rem auto;
  padding: 2rem 3rem 3rem 3rem;
  background: #fff8f1;
  border-radius: 0.5rem;
  box-shadow: 0 15px 40px rgba(0, 0, 0, 0.1);
  font-family: 'Georgia', serif;
  @media (max-width: 500px) {
    padding: 2rem 1.5rem 3rem 1.5rem;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 0.5rem;
`;
const Input = styled.input`
  padding: 0.75rem 1rem;
  border: 1px solid #d3c6ba;
  background: #fff;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  color: black;
  &:-webkit-autofill {
    box-shadow: 0 0 0 1000px white inset !important;
    -webkit-text-fill-color: black !important;
    transition: background-color 5000s ease-in-out 0s;
  }

  &:-webkit-autofill:focus {
    box-shadow: 0 0 0 1000px white inset !important;
    -webkit-text-fill-color: black !important;
  }
  &:focus-visible {
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;
const Textarea = styled.textarea`
  padding: 0.75rem 1rem;
  border: 1px solid #d3c6ba;
  background: #fff;
  resize: none;
  min-height: 100px;
  color: black;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  margin-bottom: 2rem;
  &:focus-visible {
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;
const Label = styled.label`
  font-weight: 600;
  font-size: 0.8rem;
  color: ${() => useTheme().colors.olive.darker};
  width: 100%;
  display: flex;
  justify-content: flex-start;
`;
const GuestLabel = styled(Label)`
  justify-content: center;
`;
const CheckboxContainer = styled.div`
  display: flex;
  margin: 1rem 0 0 0;
  flex-direction: column;
  align-items: flex-start;
`;
const GuestContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
`;
const GuestTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const CheckboxContainerCentered = styled.div`
  display: flex;
  margin: 0;
  flex-direction: column;
  align-items: center;
`;
const CheckboxContainerRow = styled(CheckboxContainer)`
  flex-direction: row;
  margin: 0;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;
const BigCheckboxContainerRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
`;
const CheckboxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.25rem 0;
  cursor: pointer;
  @media (max-width: 500px) {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;
const CheckboxWrapperColumn = styled(CheckboxWrapper)`
  flex-direction: column;
`;
const Checkbox = styled.input`
  width: 1.2rem;
  height: 1.2rem;
  accent-color: ${() => useTheme().colors.terracotta.primary};
  border: 1px solid #d3c6ba;
  border-radius: 2rem;
  flex-shrink: 0;
  margin-top: 0.1rem;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
  background-color: white;
  cursor: pointer;

  &:checked {
    background-color: ${() => useTheme().colors.terracotta.primary};
    background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='white' d='M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z'/%3e%3c/svg%3e");
  }

  &:disabled {
    background-color: #f5f5f5;
    border-color: #d3c6ba;
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
const CheckboxLabel = styled.label`
  font-size: 0.9rem;
  color: ${() => useTheme().colors.olive.darker};
  font-weight: 500;
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  cursor: pointer;
  line-height: 1.4;
  flex: 1;
  display: flex;
  justify-content: flex-start;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const HeartCheckbox = styled.input`
  display: none;
`;
const HeartIconWrapper = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;
const AddFamilyMemberButton = styled.button`
  background: none;
  border: none;
  font-size: 0.8rem;
  color: ${() => useTheme().colors.olive.darker};
  cursor: pointer;
  align-self: start;
  padding-left: 0.5rem;
  &:focus-visible {
    outline: none;
  }
  &:focus {
    outline: none;
  }
  &:hover {
    text-decoration: underline;
  }
`;
const RemoveFamilyMemberButton = styled.button`
  background: none;
  border: none;
  color: #000;
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1.2rem;
  &:focus-visible {
    outline: none;
  }
  &:focus {
    outline: none;
  }
  &:hover {
    font-weight: bold;
  }
`;
const SubmitButton = styled.button`
  background-color: ${() => useTheme().colors.terracotta.primary};
  color: #fff;
  font-size: 1rem;
  padding: 0.75rem 1.5rem;
  border-radius: 1rem;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  font-family: "linnea-bold", "PP Cirka", sans-serif;
  font-weight: 800;

  &:hover {
    background-color: ${() => useTheme().colors.terracotta.primary};
  }
  &:focus-visible {
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;

interface FamilyRSVPFormProps extends RSVPFormProps {
  role: string;
}

function FamilyRSVPForm({ submitCallback, role }: FamilyRSVPFormProps) {

  const initialFormData = {
    email: '',
    arrival: '',
    departure: '',
    brunch: '',
    participationDays: [] as string[],
    accommodation: role?.startsWith('hotel') ? 'hotel' : '',
    guests: [
      { firstName: '', lastName: '', music: '', food: '', alcohol: '' },
    ]
  };
  const [formData, setFormData] = useState(initialFormData);
  const theme = useTheme();

  const calculateArrivalDeparture = (selectedDays: string[]) => {
    if (selectedDays.length === 0) {
      return { arrival: '', departure: '' };
    }

    const dayOrder = ['Fri', 'Sat', 'Sun'];
    const sortedDays = selectedDays.sort((a, b) => dayOrder.indexOf(a) - dayOrder.indexOf(b));

    return {
      arrival: sortedDays[0],
      departure: sortedDays[sortedDays.length - 1]
    };
  };

  const removeFamilyMember = (index: number) => {
    setFormData((prev) => {
      const updatedGuests = [...prev.guests];
      updatedGuests.splice(index, 1);
      return { ...prev, guests: updatedGuests };
    });
  };

  const handleGuestChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const target = e.target as HTMLInputElement | HTMLTextAreaElement;
    const { name, value } = target;
    const isCheckbox = (target as HTMLInputElement).type === "checkbox";

    // Extract the field name without the index (e.g., "alcohol_0" -> "alcohol")
    const fieldName = name.replace(/_0$|_1$|_2$|_3$|_4$|_5$|_6$|_7$|_8$|_9$/, '');

    const formattedValue = isCheckbox
      ? ((target as HTMLInputElement).checked ? value : "")
      : fieldName === "firstName" || fieldName === "lastName"
        ? value.charAt(0).toUpperCase() + value.slice(1)
        : value;

    const newGuests = [...formData.guests];
    newGuests[index] = {
      ...newGuests[index],
      [fieldName]: formattedValue,
    };

    setFormData({ ...formData, guests: newGuests });
  };

  const handleParticipationDaysChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;

    const updatedDays = checked
      ? [...formData.participationDays, value]
      : formData.participationDays.filter(day => day !== value);

    const { arrival, departure } = calculateArrivalDeparture(updatedDays);

    setFormData({
      ...formData,
      participationDays: updatedDays,
      arrival,
      departure
    });
  };

  const handleSharedChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    // If accommodation changes to herrgarden for non-hotel role, set all participation days
    if (name === 'accommodation' && value === 'herrgarden' && !role?.startsWith('hotel')) {
      setFormData({
        ...formData,
        [name]: value,
        participationDays: ['Fri', 'Sat', 'Sun'],
        arrival: 'Fri',
        departure: 'Sun',
        brunch: 'brunch',
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleBrunchChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { checked } = e.target;
    setFormData({
      ...formData,
      brunch: checked ? 'brunch' : 'no-brunch'
    });
  };

  const addFamilyMember = () => {
    setFormData((prev) => ({
      ...prev,
      guests: [...prev.guests, { firstName: '', lastName: '', music: '', food: '', alcohol: '' }],
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { participationDays, ...data } = formData;
      await push(ref(db, 'rsvpResponses'), data).then(() => submitCallback(data)).then(() => {
        setFormData(initialFormData);
      });
    } catch (error) {
      console.error('Error submitting:', error);
      alert('Error submitting RSVP.');
    }
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        {!role?.startsWith('hotel') && (
          <CheckboxContainerCentered>
            <Label>Do you want to stay with us at Schenströmska Mansion during the wedding party? It will cost 2000 SEK per person. Included are both dinners, a brunch on Saturday and a breakfast on Sunday. If you accept, we will plan and book your accommodation and all meals for the entire weekend.</Label>
            <BigCheckboxContainerRow>
              <CheckboxWrapperColumn as="label" htmlFor="accommodation-herrgarden">
                <HeartCheckbox
                  type="radio"
                  name="accommodation"
                  id="accommodation-herrgarden"
                  value="herrgarden"
                  checked={formData.accommodation === 'herrgarden'}
                  onChange={handleSharedChange}
                  required
                />
                <HeartIconWrapper htmlFor="accommodation-herrgarden">
                  {formData.accommodation === 'herrgarden' ? (
                    <Heart
                      size={60}
                      fill={theme.colors.terracotta.dark}
                      color={theme.colors.terracotta.dark}
                    />
                  ) : (
                    <Heart
                      size={60}
                      fill="none"
                      color={theme.colors.terracotta.dark}
                    />
                  )}
                </HeartIconWrapper>
                <CheckboxLabel htmlFor="accommodation-herrgarden">Joyfully agree</CheckboxLabel>
              </CheckboxWrapperColumn>
              <CheckboxWrapperColumn as="label" htmlFor="accommodation-hotel">
                <HeartCheckbox
                  type="radio"
                  name="accommodation"
                  id="accommodation-hotel"
                  value="hotel"
                  checked={formData.accommodation === 'hotel'}
                  onChange={handleSharedChange}
                />
                <HeartIconWrapper htmlFor="accommodation-hotel">
                  {formData.accommodation === 'hotel' ? (
                    <Heart
                      size={60}
                      fill={theme.colors.terracotta.dark}
                      color={theme.colors.terracotta.dark}
                    />
                  ) : (
                    <Heart
                      size={60}
                      fill="none"
                      color={theme.colors.terracotta.dark}
                    />
                  )}
                </HeartIconWrapper>
                <CheckboxLabel htmlFor="accommodation-hotel">Respectfully decline</CheckboxLabel>
              </CheckboxWrapperColumn>
            </BigCheckboxContainerRow>
          </CheckboxContainerCentered>
        )}
        <InfoContainer>
          <Label>CONFIRMATION INFO</Label>
          <Input type="text" name="email" placeholder="E-mail for confirmation" value={formData.email} onChange={handleSharedChange} required />
        </InfoContainer>

        <CheckboxContainer>
          <Label>PARTICIPATION DAYS</Label>
          <CheckboxWrapper as="label" htmlFor="participation-fri">
            <Checkbox
              type="checkbox"
              name="participationDays"
              id="participation-fri"
              value="Fri"
              checked={formData.participationDays.includes('Fri')}
              onChange={handleParticipationDaysChange}
              disabled={!role?.startsWith('hotel') && formData.accommodation === 'herrgarden'}
            />
            <CheckboxLabel htmlFor="participation-fri">Friday | BBQ Dinner &amp; Mingle</CheckboxLabel>
          </CheckboxWrapper>
          <CheckboxWrapper as="label" htmlFor="brunch-sat">
            <Checkbox
              type="checkbox"
              name="brunch"
              id="brunch-sat"
              value="Sat"
              checked={formData.brunch === 'brunch'}
              onChange={handleBrunchChange}
              disabled={!role?.startsWith('hotel') && formData.accommodation === 'herrgarden'}
            />
            <CheckboxLabel htmlFor="brunch-sat">Saturday | Brunch</CheckboxLabel>
          </CheckboxWrapper>
          <CheckboxWrapper as="label" htmlFor="participation-sat">
            <Checkbox
              type="checkbox"
              name="participationDays"
              id="participation-sat"
              value="Sat"
              checked={formData.participationDays.includes('Sat')}
              onChange={handleParticipationDaysChange}
              disabled={!role?.startsWith('hotel') && formData.accommodation === 'herrgarden'}
            />
            <CheckboxLabel htmlFor="participation-sat">Saturday | Wedding Ceremony &amp; Dinner</CheckboxLabel>
          </CheckboxWrapper>
          <CheckboxWrapper as="label" htmlFor="participation-sun">
            <Checkbox
              type="checkbox"
              name="participationDays"
              id="participation-sun"
              value="Sun"
              checked={formData.participationDays.includes('Sun')}
              onChange={handleParticipationDaysChange}
              disabled={!role?.startsWith('hotel') && formData.accommodation === 'herrgarden'}
            />
            <CheckboxLabel htmlFor="participation-sun">Sunday | Good Bye Breakfast</CheckboxLabel>
          </CheckboxWrapper>
        </CheckboxContainer>

        {formData.guests.map((guest, index) => (
          <GuestContainer key={index}>
            <GuestTop>
              <GuestLabel>Family Member {index + 1}</GuestLabel>
              {formData.guests.length > 1 && (
                <RemoveFamilyMemberButton type="button" onClick={() => removeFamilyMember(index)} >×</RemoveFamilyMemberButton>
              )}
            </GuestTop>
            <InfoContainer>
              <Label>BASIC INFO</Label>
              <Input type="text" name="firstName" placeholder="First Name" value={guest.firstName} onChange={(e) => handleGuestChange(e, index)} required />
              <Input type="text" name="lastName" placeholder="Last Name" value={guest.lastName} onChange={(e) => handleGuestChange(e, index)} required />
            </InfoContainer>

            <CheckboxContainer>
              <Label>PREFERENCES</Label>
              <CheckboxContainerRow>
                <CheckboxWrapper as="label" htmlFor={`alcohol_${index}`}>
                  <Checkbox
                    type="radio"
                    id={`alcohol_${index}`}
                    name={`alcohol_${index}`}
                    value="Alcohol"
                    checked={guest.alcohol === 'Alcohol'}
                    onChange={e => handleGuestChange(e, index)}
                    required
                  />
                  <CheckboxLabel htmlFor={`alcohol_${index}`}>Alcohol</CheckboxLabel>
                </CheckboxWrapper>
                <CheckboxWrapper as="label" htmlFor={`non-alcohol_${index}`}>
                  <Checkbox
                    type="radio"
                    id={`non-alcohol_${index}`}
                    name={`alcohol_${index}`}
                    value="Non-alcohol"
                    checked={guest.alcohol === 'Non-alcohol'}
                    onChange={e => handleGuestChange(e, index)}
                  />
                  <CheckboxLabel htmlFor={`non-alcohol_${index}`}>Non-alcohol</CheckboxLabel>
                </CheckboxWrapper>
              </CheckboxContainerRow>
            </CheckboxContainer>
            <Input type="text" name="music" placeholder="A song that makes you dance" value={guest.music} onChange={(e) => handleGuestChange(e, index)} />
            <Textarea name="food" placeholder="Do you have any food preferences, allergies, or special requests?" value={guest.food} onChange={(e) => handleGuestChange(e, index)} />
          </GuestContainer>
        ))}

        <AddFamilyMemberButton type="button" onClick={addFamilyMember} >Add family member +</AddFamilyMemberButton>
        <SubmitButton type="submit">Submit RSVP</SubmitButton>
      </Form>
    </FormContainer>
  );
}

export default FamilyRSVPForm;