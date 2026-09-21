import styled from "styled-components";
import { useState } from "react";
import MainContentCard from "../../components/cards/MainContentCard";
import FamilyRSVPForm from "../../components/forms/FamilyRSVPForm";
import DualRSVPForm from "../../components/forms/DualRSVPForm";
import { invitationImg } from "../../helpers/constants";
import SingleRSVPForm from "../../components/forms/SingleRSVPForm";
import { scrollToTop } from "../../helpers/functions";
import { RSVP } from "../../helpers/classes";
import { getFunctions, httpsCallable } from "firebase/functions";
import { Heart } from "lucide-react";

const RootContainer = styled.div`
  color: black;
  background-image: url(${invitationImg});
  background-color: #fdf0eb;
  background-size: cover;
  background-position: center;
  height: fit-content;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 3rem 0;
  min-height: 45em;
`;
const TopContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  gap: 2rem;
  @media (max-width: 500px) {
    gap: 1rem;
  }
`;
const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: green;
  margin-bottom: 0;
  font-family: 'Georgia', serif;
  margin-top: 0em;
  @media (max-width: 500px) {
    font-size: 1.5rem;
  }
`;
const IntroText = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: green;
  margin-bottom: 2rem;
  font-family: 'Georgia', serif;
  line-height: 1.6;
  max-width: 550px;
`;
const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  :hover {
    text-decoration: underline;
  }
`;
const ArrowButton = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  width: fit-content;
  background-color: transparent;
  color: white;
  font-weight: bold;
  cursor: pointer;
  padding: 0.5rem 1rem;
  border-radius: 0.5em;
  transition: opacity 0.2s ease;
`;
const TitleContainer = styled.div`
  display: flex;
  :hover {
    text-decoration: underline;
  }
`;
const BackContainer = styled.div`
  :hover {
    text-decoration: underline;
  }
`;
const BackButton = styled.div`
  background-color: transparent;
  color: white;
  margin-right: auto;
  font-weight: bold;
  cursor: pointer;
  padding: 0.5rem 0rem;
  border-radius: 0.5em;
  transition: opacity 0.2s ease;
`;
const ThankYouContainer = styled.div`
  text-align: center;
  padding: 3rem;
  color: green;
`;
const ThankYouTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 1rem;
  font-family: 'Georgia', serif;
`;
const ThankYouMessage = styled.div`
  font-size: 1.2rem;
  max-width: 500px;
  margin: 0 auto 2rem;
  line-height: 1.6;
  font-family: 'Georgia', serif;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const SignatureWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-family: 'Georgia', serif;
`;

function RSVPView({ viewRole }: { viewRole: string | null }) {
  const [showRSVP, setShowRSVP] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedRSVP, setSubmittedRSVP] = useState<RSVP | null>(null);

  const handleProceedToRSVP = () => {
    setShowRSVP(true);
    scrollToTop();
  };

  const handleBackToIntro = () => {
    setShowRSVP(false);
    setSubmitted(false);
    setSubmittedRSVP(null);
    scrollToTop();
  };

  const handleConfirmation = (rsvp: RSVP) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    const functions = getFunctions(undefined, "europe-west1");
    const confirmationData = {
      email: rsvp.email,
      arrival: rsvp.arrival,
      departure: rsvp.departure,
      guests: rsvp.guests,
      accommodation: rsvp.accommodation,
      brunch: rsvp.brunch,
      role: viewRole,
    };
    const sendEmail = httpsCallable(functions, "sendConfirmationEmail")(confirmationData);

    setSubmittedRSVP(rsvp);
    setSubmitted(true);
    sendEmail
      .then(() => {
        console.log("Email sent to", rsvp.email);
      })
      .catch((err: unknown) => {
        console.error("Email failed", err);
      });
  }

  return (
    <RootContainer>
      <MainContentCard backgroundColor="rgba(255, 230, 204, 0.416)" elevated={true}>
        {!showRSVP && !submitted && (
          <>
            <Title>RSVP</Title>
            <IntroText>
              <>
                We're so excited to celebrate our special day with you!
                <br /><br />
                Please take a moment to let us know if you'll be joining us for our wedding celebration. RSVP before April 28th 2026 helps us plan the perfect weekend and ensures we have everything ready for your arrival.
                <br /><br />
                We can't wait to celebrate with you!
              </>
            </IntroText>
            <ButtonContainer>
              <ArrowButton onClick={handleProceedToRSVP}>
                Proceed to RSVP →
              </ArrowButton>
            </ButtonContainer>
          </>
        )}

        {showRSVP && !submitted && (
          <>
            <TopContainer>
              <TitleContainer>
                <BackButton style={{ marginLeft: '1.5rem' }} onClick={handleBackToIntro}>← Back</BackButton>
              </TitleContainer>
              <Title style={{ marginRight: '1.5rem' }}>RSVP</Title>
            </TopContainer>
            {viewRole === 'family' || viewRole === 'hotelfamily'
              ? <FamilyRSVPForm submitCallback={handleConfirmation} role={viewRole || ''} />
              : viewRole === 'couple' || viewRole === 'hotelcouple'
                ? <DualRSVPForm submitCallback={handleConfirmation} role={viewRole || ''} />
                : <SingleRSVPForm submitCallback={handleConfirmation} role={viewRole || ''} />}
          </>
        )}

        {submitted && (
          <ThankYouContainer>
            <ThankYouTitle>Thank You for Your RSVP!</ThankYouTitle>
            <ThankYouMessage>
              Your RSVP has been received and we can't wait to see you on our big day. An email has been sent to {submittedRSVP?.email} with your RSVP details.
              {((submittedRSVP?.accommodation === 'hotel') ||
                (viewRole && (viewRole === 'hotelsingle' || viewRole === 'hotelcouple' || viewRole === 'hotelfamily'))) &&
                "Don't forget to book your accommodation!"}
              <br /><br />
              <SignatureWrapper>
                Afsoon and Axel <Heart size={24} color="#000" />
              </SignatureWrapper>
            </ThankYouMessage>
            <BackContainer>
              <BackButton onClick={handleBackToIntro}>← Back to Intro</BackButton>
            </BackContainer>
          </ThankYouContainer>
        )}
      </MainContentCard>
    </RootContainer>
  );
}

export default RSVPView;