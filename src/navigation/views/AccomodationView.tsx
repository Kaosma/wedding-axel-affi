import styled from "styled-components";
import MainContentCard from "../../components/cards/MainContentCard";
import { Bed } from 'lucide-react';
import { useTheme } from "../../app/AppStyling";


const RootContainer = styled.div`
  color: black;
  background-image: url("/images/affiaxel.avif");
  background-size: cover;
  background-position: center;
  height: fit-content;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 3rem;
`;
const IconWrapper = styled.div`
  color: ${() => useTheme().colors.red.primary};
  margin-bottom: 0.75rem;
  display: flex;
  justify-content: center;
  transition: transform 0.3s ease;
`;
const Card = styled.div`
  background:  #f8f9fa;
  border-radius: 0.75rem;
  padding: 1.5rem;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.25s ease, box-shadow 0.25s ease;

  &:hover ${/* sc-selector */ IconWrapper} {
    transform: scale(1.15);
  }
`;
const CardTitle = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
  color: ${() => useTheme().colors.mix.darkest};
`;
const CardText = styled.p`
  margin: 0.5rem 0;
  font-size: 1rem;
  color: ${() => useTheme().colors.mix.darkest};
  text-align: start;
`;
const Emphasis = styled.span`
  color: ${() => useTheme().colors.red.primary};
  font-weight: bold;
`;
const ContentContainer = styled.div`
  margin: 1rem 0;
`;


function InfoView() {

  return (
    <RootContainer>
      <MainContentCard elevated={true}>
        <ContentContainer>
          <Card>
            <IconWrapper>
              <Bed size={32} />
            </IconWrapper>
            <CardTitle>Accommodation</CardTitle>
            <CardText>For our wedding weekend, Häringe Castle has been exclusively reserved for us and our guests, and we would love for everyone to stay with us at the castle for the weekend.</CardText>

            <CardText>The castle offers hotel rooms for our wedding guests, and we strongly encourage you to book a room as part of your stay.</CardText>

            <CardText>Staying at the castle means you can fully enjoy the celebrations, without having to worry about getting home late, and join us for a relaxed morning together the following day. We can't wait to celebrate together!</CardText>
            <CardText>Check-in time: <Emphasis>15:00</Emphasis></CardText>
            <CardText>Check-out time: <Emphasis>12:00</Emphasis></CardText>
            <CardText><Emphasis>Breakfast</Emphasis> is included.</CardText>
            <CardText>The castle provides free <Emphasis>parking.</Emphasis></CardText>
          </Card>
        </ContentContainer>
      </MainContentCard>
    </RootContainer>
  );
}

export default InfoView;