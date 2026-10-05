import styled from 'styled-components';
import MainContentCard from '../../components/cards/MainContentCard';
import { Bed } from 'lucide-react';
import { useTheme } from '../../app/AppStyling';

const RootContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: 3rem;
  overflow: hidden;
  isolation: isolate;
  color: ${() => useTheme().colors.mix.darkest};

  @media (max-width: 500px) {
    padding: 2rem 1rem;
  }
`;

const BackgroundVideo = styled.video`
  position: absolute;
  inset: 0;
  z-index: -1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const ContentWrapper = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 760px;
`;

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 0.75rem;
  color: ${() => useTheme().colors.red.primary};
  transition: transform 0.3s ease;
`;

const Card = styled.div`
  padding: 1.5rem;
  border-radius: 0.75rem;
  background: #f8f9fa;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  text-align: center;
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.1);
  }

  &:hover ${IconWrapper} {
    transform: scale(1.15);
  }
`;

const CardTitle = styled.h3`
  margin: 0 0 0.25rem;
  color: ${() => useTheme().colors.mix.darkest};
  font-size: 1.125rem;
  font-weight: 600;
`;

const CardText = styled.p`
  margin: 0.75rem 0;
  color: ${() => useTheme().colors.mix.darkest};
  font-size: 1rem;
  line-height: 1.6;
  text-align: start;
`;

const Emphasis = styled.span`
  color: ${() => useTheme().colors.red.primary};
  font-weight: bold;
`;

const ContentContainer = styled.div`
  margin: 1rem 0;
`;

function AccommodationView() {
  return (
    <RootContainer>
      <BackgroundVideo
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/images/backgroundaa.png"
        aria-hidden="true"
      >
        <source
          src="/images/backgroundaa.mp4"
          type="video/mp4"
        />

        Your browser does not support the video tag.
      </BackgroundVideo>

      <ContentWrapper>
        <MainContentCard elevated={true}>
          <ContentContainer>
            <Card>
              <IconWrapper>
                <Bed size={32} />
              </IconWrapper>

              <CardTitle>
                Accommodation
              </CardTitle>

              <CardText>
                For our wedding weekend, Häringe Castle has
                been exclusively reserved for us and our
                guests, and we would love for everyone to
                stay with us at the castle for the weekend.
              </CardText>

              <CardText>
                The castle offers hotel rooms for our wedding
                guests, and we strongly encourage you to
                book a room as part of your stay.
              </CardText>

              <CardText>
                Staying at the castle means you can fully
                enjoy the celebrations, without having to
                worry about getting home late, and join us
                for a relaxed morning together the following
                day. We can&apos;t wait to celebrate together!
              </CardText>

              <CardText>
                Check-in time:{' '}
                <Emphasis>15:00</Emphasis>
              </CardText>

              <CardText>
                Check-out time:{' '}
                <Emphasis>12:00</Emphasis>
              </CardText>

              <CardText>
                <Emphasis>Breakfast</Emphasis> is included.
              </CardText>

              <CardText>
                The castle provides free{' '}
                <Emphasis>parking.</Emphasis>
              </CardText>
            </Card>
          </ContentContainer>
        </MainContentCard>
      </ContentWrapper>
    </RootContainer>
  );
}

export default AccommodationView;