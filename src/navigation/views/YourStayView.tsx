import styled from "styled-components";
import { mansionImg, mapImg } from "../../helpers/constants";
import MainContentCard from "../../components/cards/MainContentCard";
import { ArrowUpRight, Calendar, Map, MapPin, MessageCircleQuestion, Shirt, X, Bed, ExternalLink } from 'lucide-react';
import { useState } from "react";
import { useTheme } from "../../app/AppStyling";
import { useTranslation } from "react-i18next";

const RootContainer = styled.div`
  color: black;
  background-image: url(${mansionImg});
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
  color: #fc834b;
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
  color: ${() => useTheme().colors.olive.darker};
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
  color: ${() => useTheme().colors.olive.darker};
`;
const CardTextSpecial = styled(CardText)`
  display: flex;
  margin: 0;
  justify-content: space-between;
`;
const Emphasis = styled.span`
  color: #fc834b;
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
  width: 300px;
  height: 100px;
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
const CloseButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(0, 0, 0, 0.6);
  border: none;
  padding: 8px;
  border-radius: 8px;
  z-index: 1000;
  &:focus-visible {
    outline: none;
  }
  &:focus {
    outline: none;
  }
  svg {
    color: white;
    width: 24px;
    height: 24px;
  }
`;
const AccommodationModal = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 2rem;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  position: relative;
`;
const ModalTitle = styled.h2`
  color: ${() => useTheme().colors.olive.darker};
  margin-bottom: 1.5rem;
  text-align: center;
  font-size: 1.5rem;
`;
const HotelSection = styled.div`
  margin-bottom: 2rem;
`;
const SectionTitle = styled.h3`
  color: ${() => useTheme().colors.olive.darker};
  margin-bottom: 1rem;
  font-size: 1.2rem;
  border-bottom: 2px solid ${() => useTheme().colors.peach.primary};
  padding-bottom: 0.5rem;
`;
const HotelCard = styled.div`
  background: hsl(30 100% 94%);
  border-radius: 8px;
  padding: 1rem;
  margin-bottom: 1rem;
  border-left: 4px solid ${() => useTheme().colors.peach.primary};
`;
const HotelName = styled.h4`
  color: ${() => useTheme().colors.olive.darker};
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
`;
const HotelDetails = styled.div`
  color: ${() => useTheme().colors.olive.darker};
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;
const HotelLink = styled.a`
  color: ${() => useTheme().colors.peach.primary};
  text-decoration: none;
  font-weight: 600;
  display: inline-flex;
  align-items: center;
  gap: 0.25rem;
  margin-top: 0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;
const DistanceInfo = styled.div`
  background: ${() => useTheme().colors.peach.lightest};
  border-radius: 6px;
  padding: 1rem;
  margin-top: 1rem;
  text-align: center;
  color: ${() => useTheme().colors.olive.darker};
  font-size: 0.9rem;
`;

function YourStayView({ role }: { role: string | null }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [accommodationOpen, setAccommodationOpen] = useState(false);
  const googleLocation = 'https://www.google.com/maps/dir//Schenstr%C3%B6ms+v%C3%A4g+1,+735+60+Ramn%C3%A4s,+Sverige/@59.7805224,16.0999931,12z/data=!3m1!4b1!4m8!4m7!1m0!1m5!1m1!1s0x465e778e4c4395f7:0x5eb9543796e54bc5!2m2!1d16.1823928!2d59.7805482?entry=ttu&g_ep=EgoyMDI1MDczMC4wIKXMDSoASAFQAw%3D%3D';
  const dateBooker = 'https://calendar.google.com/calendar/render?action=TEMPLATE&text=Wedding%20Weekend&dates=20260724/20260726&details=Join%20us%20for%20our%20wedding%20weekend!&location=Schenstr%C3%B6ms%20v%C3%A4g%201,%20735%2060%20Ramn%C3%A4s,%20Sverige';
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
      {accommodationOpen && (
        <>
          <ModalOverlay onClick={() => setAccommodationOpen(false)}>
            <AccommodationModal onClick={(e) => e.stopPropagation()}>
              <ModalTitle>{t("AccomodationOptions")}</ModalTitle>

              {role && !role.startsWith('hotel') && (
                <HotelSection>
                  <SectionTitle>{t("Exclusive")}</SectionTitle>

                  <HotelCard>
                    <HotelName>Schenströmska Herrgården</HotelName>
                    <HotelDetails>📍 Ramnäs, Västerås</HotelDetails>
                    <HotelDetails>💰 {t("800SEKPerNight")}</HotelDetails>
                    <HotelDetails>✨ {t("LimitedAvailability")}</HotelDetails>
                  </HotelCard>
                </HotelSection>
              )}

              <HotelSection>
                <SectionTitle>{t("HotelsInRamnäs")}</SectionTitle>

                <HotelCard>
                  <HotelName>Nadden Hotel</HotelName>
                  <HotelDetails>📍 Ramnäs, Västerås</HotelDetails>
                  <HotelDetails>🏨 {t("BoutiqueHotel")}</HotelDetails>
                  <HotelDetails>📞 +46 220 133 70</HotelDetails>
                  <HotelLink href="https://naddenhotell.se/" target="_blank" rel="noopener noreferrer">
                    {t("VisitWebsite")} <ExternalLink size={16} />
                  </HotelLink>
                </HotelCard>
              </HotelSection>

              <HotelSection>
                <SectionTitle>{t("HotelsInVästerås")}</SectionTitle>

                <HotelCard>
                  <HotelName>Elite Stadshotellet Västerås</HotelName>
                  <HotelDetails>📍 Stora Gatan 7, Västerås</HotelDetails>
                  <HotelDetails>📞 +46 21 10 28 00</HotelDetails>
                  <HotelLink href="https://www.elite.se/hotell/vasteras/elite-stadshotellet-vasteras/?utm_source=google&utm_medium=cpc&utm_campaign=%5BPB%5D%20%5BS%5D%20%5BPerformance%5D%20%5BB%5D%20Elite%20-%20Hotell%20%2B%20Ort&utm_term=Elite%20Stadshotellet%20V%C3%A4ster%C3%A5s&gad_source=1&gad_campaignid=18480603064&gbraid=0AAAAADkFkH9CtCwB-y6mEYBRnO6WpPgC5&gclid=Cj0KCQjw8p7GBhCjARIsAEhghZ3sI0l31nMV-j-iXMnI1byzxmFeGaNw_KxZ7nnSigCMQ6eMlcAvZ2EaAiMXEALw_wcB" target="_blank" rel="noopener noreferrer">
                    {t("VisitWebsite")} <ExternalLink size={16} />
                  </HotelLink>
                </HotelCard>

                <HotelCard>
                  <HotelName>Scandic Västerås City</HotelName>
                  <HotelDetails>📍 Pilgatan 33, Västerås</HotelDetails>
                  <HotelDetails>📞 +46 21 495 58 00</HotelDetails>
                  <HotelLink href="https://www.scandichotels.com/en/hotels/scandic-vasteras" target="_blank" rel="noopener noreferrer">
                    {t("VisitWebsite")} <ExternalLink size={16} />
                  </HotelLink>
                </HotelCard>

                <HotelCard>
                  <HotelName>Best Western Plus Hotel Plaza</HotelName>
                  <HotelDetails>📍 Kopparbergsvägen 10, Västerås</HotelDetails>
                  <HotelDetails>📞 +46 21 10 10 10</HotelDetails>
                  <HotelLink href="https://plazavasteras.se/" target="_blank" rel="noopener noreferrer">
                    {t("VisitWebsite")} <ExternalLink size={16} />
                  </HotelLink>
                </HotelCard>
              </HotelSection>

              <DistanceInfo>
                💡 <strong>{t("Tip")}</strong> {t("WeRecommend")}
              </DistanceInfo>
            </AccommodationModal>
          </ModalOverlay>
          <CloseButton onClick={() => setAccommodationOpen(false)}>
            <X />
          </CloseButton>
        </>
      )}
      <MainContentCard elevated={true}>
        <InfoGrid>
          <Card onClick={(() => openTab(dateBooker))}>
            <IconWrapper>
              <Calendar size={32} />
            </IconWrapper>
            <CardTitle>{t("Dates")}</CardTitle>
            <CardText>{t("FridayToSunday")}</CardText>
            <CardText><Emphasis>{t("July24thTo26th")}</Emphasis></CardText>
          </Card>
          <Card onClick={(() => openTab(googleLocation))}>
            <IconWrapper>
              <MapPin size={32} />
            </IconWrapper>
            <CardTitle>{t("Location")}</CardTitle>
            <CardText>Schenströmska Herrgården</CardText>
            <CardText><Emphasis>Ramnäs</Emphasis></CardText>
          </Card>
          <Card onClick={() => setAccommodationOpen(true)}>
            <IconWrapper>
              <Bed size={32} />
            </IconWrapper>
            <CardTitle>{t("Accommodation")}</CardTitle>
            <CardText>{t("NearbyHotels")}</CardText>
            <CardText><Emphasis>{t("ViewOptions")}</Emphasis></CardText>
          </Card>
          <Card onClick={(() => openTab(emailLink))}>
            <IconWrapper>
              <MessageCircleQuestion size={32} />
            </IconWrapper>
            <CardTitle>{t("ForOtherQuestions")}</CardTitle>
            <CardText>{t("CheckQAndA")}</CardText>
            <CardText>{t("OrContactUsOn")}<Emphasis> euawedding@gmail.com</Emphasis></CardText>
          </Card>
          <Card>
            <IconWrapper>
              <Shirt size={32} />
            </IconWrapper>
            <CardTitle>{t("Dresscode")}</CardTitle>
            <TextContainer>
              <CardTextSpecial>{t("Fredag")} <EmphasisSpecial>{t("FridaySunsetColors")}</EmphasisSpecial></CardTextSpecial>
              <CardTextSpecial>{t("Lördag")} <EmphasisSpecial>{t("SaturdaySuitAndDress")}</EmphasisSpecial></CardTextSpecial>
              <CardTextSpecial>{t("Söndag")} <EmphasisSpecial>{t("SundayCasual")}</EmphasisSpecial></CardTextSpecial>
            </TextContainer>
          </Card>
          <Card onClick={() => setOpen(true)}>
            <IconWrapper>
              <Map size={32} />
            </IconWrapper>
            <CardTitle>{t("Map")}</CardTitle>
            <ImageCard onClick={() => setOpen(true)}>
              <CornerIcon>
                <ArrowUpRight color="orange" />
              </CornerIcon>
            </ImageCard>
          </Card>
        </InfoGrid>
      </MainContentCard>
    </RootContainer>
  );
}

export default YourStayView;