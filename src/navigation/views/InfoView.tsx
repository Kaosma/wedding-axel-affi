import styled from "styled-components";
import { mapImg } from "../../helpers/constants";
import MainContentCard from "../../components/cards/MainContentCard";
import { ArrowUpRight, Calendar, Map, MapPin, MessageCircleQuestion, Shirt } from 'lucide-react';
import { useState } from "react";
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
const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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

  &:hover {
    transform: translateY(-5px) scale(1.03);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.1);
    cursor: pointer;
  }

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
const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1em;
  margin-top: 1em;
  gap: 1em;
`;
const CardText = styled.p`
  margin: 0.25rem 0;
  font-size: 1rem;
  color: ${() => useTheme().colors.mix.darkest};
`;
const CardTextSpecial = styled(CardText)`
  display: flex;
  margin: 0;
  justify-content: space-between;
`;
const Emphasis = styled.span`
  color: ${() => useTheme().colors.red.primary};
  font-weight: bold;
`;
const EmphasisSpecial = styled(Emphasis)`
  width: fit-content;
  margin-left: 1em;
  max-width: 11em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  white-space: normal;
  word-break: break-word;
  text-align: right;
`;
const ImageCard = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background-image: url(${mapImg});
  background-size: cover;
  background-position: center;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s ease;
  margin-top: 1em;
  border: 1px solid orange;

  &:hover {
    transform: scale(1.02);
  }

  &:hover div {
    opacity: 1;
    transform: translate(0, 0);
  }
  @media (max-width: 720px) {
    height: 150px;
  }
  @media (max-width: 550px) {
    height: 100px;
  }
  @media (max-width: 370px) {
    height: 100px;
  }
`;
const CornerIcon = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 8px;
  padding: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translate(10px, -10px);
  transition: all 0.3s ease;

  svg {
    color: white;
    width: 20px;
    height: 20px;
  }
`;
const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
`;
const ModalImage = styled.div`
  background-image: url(${mapImg});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  width: 90%;
  height: 90%;
  border-radius: 8px;
`;
const ContentContainer = styled.div`
  margin: 1rem 0;
`;

function InfoView({ role }: { role: string | null }) {

  const [open, setOpen] = useState(false);
  const googleLocation = 'https://maps.app.goo.gl/b3F63JXfekN6MM4L6';
  const emailLink = 'mailto:euawedding@gmail.com';

  const openTab = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <RootContainer>
      {open && (
        <>
          <ModalOverlay onClick={() => setOpen(false)}>
            <ModalImage />
          </ModalOverlay>
        </>
      )}
      <MainContentCard elevated={true}>
        <InfoGrid>
          <Card>
            <IconWrapper>
              <Calendar size={32} />
            </IconWrapper>
            <CardTitle>Dates</CardTitle>
            <CardText>{role && role === 'family' ? 'Saturday' : 'Friday'} - Sunday</CardText>
            <CardText><Emphasis>{role && role === 'family' ? '3' : '2'}-4 July</Emphasis></CardText>
          </Card>
          <Card onClick={(() => openTab(googleLocation))}>
            <IconWrapper>
              <MapPin size={32} />
            </IconWrapper>
            <CardTitle>Location</CardTitle>
            <CardText>Häringe Slott</CardText>
            <CardText><Emphasis>Stockholm</Emphasis></CardText>
          </Card>
          <Card onClick={(() => openTab(emailLink))}>
            <IconWrapper>
              <MessageCircleQuestion size={32} />
            </IconWrapper>
            <CardTitle>For other questions</CardTitle>
            <CardText>Check Q&amp;A</CardText>
            <CardText>or contact us on:</CardText>
            <CardText><Emphasis> afsoonaxel@gmail.com</Emphasis></CardText>
          </Card>
          <Card>
            <IconWrapper>
              <Shirt size={32} />
            </IconWrapper>
            <CardTitle>Dresscode</CardTitle>
            <TextContainer>
              {role && role === 'friends' && <CardTextSpecial>Friday <EmphasisSpecial>Beachclub Chic</EmphasisSpecial></CardTextSpecial>}
              <CardTextSpecial>Saturday <EmphasisSpecial>Summery Suit and Dress</EmphasisSpecial></CardTextSpecial>
            </TextContainer>
          </Card>
        </InfoGrid>
        <ContentContainer>
          <Card onClick={() => setOpen(true)}>
            <IconWrapper>
              <Map size={32} />
            </IconWrapper>
            <CardTitle>Things to do at Häringe Castle</CardTitle>
            <ImageCard onClick={() => setOpen(true)}>
              <CornerIcon>
                <ArrowUpRight color="orange" />
              </CornerIcon>
            </ImageCard>
          </Card>
        </ContentContainer>
      </MainContentCard>
    </RootContainer>
  );
}

export default InfoView;