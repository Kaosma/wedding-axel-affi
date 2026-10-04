import styled from 'styled-components';
import { useState } from 'react';
import MainContentCard from '../../components/cards/MainContentCard';
import FamilyRSVPForm from '../../components/forms/FamilyRSVPForm';
import { scrollToTop } from '../../helpers/functions';
import { RSVP } from '../../helpers/classes';
import { Heart } from 'lucide-react';
import { useTheme } from '../../app/AppStyling';

const RootContainer = styled.div`
  color: ${() => useTheme().colors.red.primary};
  background-color: ${() => useTheme().colors.red.secondary};
  background-size: cover;
  background-position: center;
  height: fit-content;
  min-height: 45em;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 3rem 0;
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
  color: ${() => useTheme().colors.red.dark};
  margin: 0;
  font-family: 'Georgia', serif;

  @media (max-width: 500px) {
    font-size: 1.5rem;
  }
`;

const IntroText = styled.p`
  text-align: center;
  font-size: 1.1rem;
  color: ${() => useTheme().colors.red.dark};
  margin: 0 auto 2rem;
  font-family: 'Georgia', serif;
  line-height: 1.6;
  max-width: 550px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
  color: ${() => useTheme().colors.red.dark};

  &:hover {
    text-decoration: underline;
  }
`;

const ArrowButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: fit-content;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5em;
  background-color: transparent;
  color: ${() => useTheme().colors.red.dark};
  cursor: pointer;
  font-size: 1.1rem;
  font-weight: 600;
`;

const TitleContainer = styled.div`
  &:hover {
    text-decoration: underline;
  }
`;

const BackContainer = styled.div`
  &:hover {
    text-decoration: underline;
  }
`;

const BackButton = styled.button`
  padding: 0.5rem 0;
  border: none;
  border-radius: 0.5em;
  background-color: transparent;
  color: ${() => useTheme().colors.red.primary};
  cursor: pointer;
  font-weight: bold;
`;

const ThankYouContainer = styled.div`
  padding: 3rem;
  color: ${() => useTheme().colors.red.primary};
  text-align: center;
`;

const ThankYouTitle = styled.h2`
  margin-bottom: 1rem;
  font-family: 'Georgia', serif;
  font-size: 2rem;
`;

const ThankYouMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 500px;
  margin: 0 auto 2rem;
  font-family: 'Georgia', serif;
  font-size: 1.2rem;
  line-height: 1.6;
`;

const SignatureWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'Georgia', serif;
  font-size: 1.1rem;
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
    setSubmittedRSVP(rsvp);
    setSubmitted(true);

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const isAttending = submittedRSVP?.attendance === 'yes';
  const isNotAttending = submittedRSVP?.attendance === 'no';

  const role: 'family' | 'friends' =
    viewRole === 'family' ? 'family' : 'friends';

  return (
    <RootContainer>
      <MainContentCard
        backgroundColor="rgba(255, 230, 204, 0.416)"
        elevated={true}
      >
        {!showRSVP && !submitted && (
          <>
            <Title>RSVP</Title>

            <IntroText>
              We&apos;re so excited to celebrate our special day with you!
              <br />
              <br />
              Please take a moment to let us know if you&apos;ll be joining us
              for our wedding celebration. RSVP before April 28th 2027 helps us
              plan the perfect weekend and ensures we have everything ready for
              your arrival.
              <br />
              <br />
              We can&apos;t wait to celebrate with you!
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
                <BackButton
                  style={{ marginLeft: '1.5rem' }}
                  onClick={handleBackToIntro}
                >
                  ← Back
                </BackButton>
              </TitleContainer>

              <Title style={{ marginRight: '1.5rem' }}>
                RSVP
              </Title>
            </TopContainer>

            <FamilyRSVPForm
              submitCallback={handleConfirmation}
              role={role}
            />
          </>
        )}

        {submitted && submittedRSVP && (
          <ThankYouContainer>
            {isNotAttending ? (
              <>
                <ThankYouTitle>
                  Thank You for Letting Us Know
                </ThankYouTitle>

                <ThankYouMessage>
                  We&apos;re sorry that you won&apos;t be able to join us, but we
                  completely understand. You&apos;ll be in our thoughts as we
                  celebrate our wedding day.

                  <br />
                  <br />

                  <SignatureWrapper>
                    Afsoon and Axel
                    <Heart
                      size={24}
                      color={useTheme().colors.red.primary}
                    />
                  </SignatureWrapper>
                </ThankYouMessage>
              </>
            ) : isAttending ? (
              <>
                <ThankYouTitle>
                  Thank You for Your RSVP!
                </ThankYouTitle>

                <ThankYouMessage>
                  We&apos;re so happy that you&apos;ll be joining us, and we
                  can&apos;t wait to celebrate with you!

                  {submittedRSVP.accommodation === 'castle' && (
                    <>
                      <br />
                      <br />
                      We&apos;re also looking forward to having you stay with us
                      at Häringe Castle.
                    </>
                  )}

                  {submittedRSVP.accommodation === 'other' && (
                    <>
                      <br />
                      <br />
                      We&apos;ll see you at the celebration. Please remember to
                      arrange your own accommodation.
                    </>
                  )}

                  <br />
                  <br />

                  <SignatureWrapper>
                    Afsoon and Axel
                    <Heart
                      size={24}
                      color={useTheme().colors.red.primary}
                    />
                  </SignatureWrapper>
                </ThankYouMessage>
              </>
            ) : null}

            <BackContainer>
              <BackButton onClick={handleBackToIntro}>
                ← Back to Intro
              </BackButton>
            </BackContainer>
          </ThankYouContainer>
        )}
      </MainContentCard>
    </RootContainer>
  );
}

export default RSVPView;