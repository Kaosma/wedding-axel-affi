import { Link } from "react-router-dom";
import styled from "styled-components";
import { danceLogo, homeImg, logoTerracottaImg, pic1Img, pic2Img } from "../../helpers/constants";
import { useTheme } from "../../app/AppStyling";
import { useTranslation } from "react-i18next";

const IconWrapper = styled.div`
  background-image: url(${logoTerracottaImg});
  background-size: cover;
  background-position: center;
  width: 230px;
  height: 310px;
  z-index: 1;
  margin: 2em;
  @media (max-width: 768px) {
    width: 184px;
    height: 248px;
  }
  @media (max-width: 650px) {
    width: 138px;
    height: 186px;
  }
  @media (max-width: 600px) {
    width: 115px;
    height: 155px;
  }
  @media (max-width: 550px) {
    width: 69px;
    height: 93px;
  }
  @media (max-width: 400px) {
    width: 50px;
    height: 67.5px;
  }
  @media (max-width: 350px) {
    width: 40px;
    height: 50px;
    margin: 0.5em;
  }
  @media (max-width: 300px) {
    width: 30px;
    height: 40px;
    margin: 0.25em;
  }
`;
const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${() => useTheme().colors.terracotta.secondary};
  color: white;
  text-align: center;
`;
const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100vh;
  gap: 6em;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: url(${homeImg});
    background-size: cover;
    background-position: center;
    filter: grayscale(100%);
    z-index: 0;
  }

  @media (max-width: 350px) {
    gap: 3em;
  }
`;
const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
`;
const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
  width: 100%;
  z-index: 1;
  @media (max-width: 350px) {
    flex-wrap: wrap;
    gap: 0.5em;
  }
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1;
`;
const SubTitle = styled.div`
  font-family: "linnea-variable", "PP Cirka", sans-serif;
  display: flex;
  font-weight: 700;
  font-size: 1.5rem;
  width: 100%;
  justify-content: center;
  margin-right: 20em;
  padding: 4em 5em 2em 5em;
  @media (max-width: 1000px) {
    margin-right: 18em;
    font-size: 1.3rem;
  }
  @media (max-width: 900px) {
    margin-right: 16em;
    font-size: 1.2rem;
  }
  @media (max-width: 800px) {
    margin-right: 14em;
    padding: 4em 4em 1.5em 4em;
  }
  @media (max-width: 700px) {
    margin-right: 12em;
    padding: 3em 3em 1em 3em;
  }
  @media (max-width: 600px) {
    margin-right: 8em;
    padding: 2em 2em 1em 2em;
  }
  @media (max-width: 550px) {
    margin-right: 4em;
    padding: 1.5em 1.5em 1em 1.5em;
  }
  @media (max-width: 450px) {
    margin-right: 2em;
    padding: 1em 1em 0.5em 1em;
  }
  @media (max-width: 350px) {
    font-size: 1rem;
    margin-right: 0;
    padding: 0.5em 0.5em 0.25em 0.5em;
  }
`;
const HeaderText = styled.div`
  font-size: 1.1rem;
  text-transform: uppercase;
  font-weight: 500;
  color: #ffd2c0;
  z-index: 1;
  @media (max-width: 650px) {
    font-size: 0.7rem;
  }
  @media (max-width: 350px) {
    font-size: 0.5rem;
  }
`;
const SubText = styled.div`
  font-size: 3.5rem;
  font-weight: 400;
  margin-bottom: 1rem;
  color: #ffefe9;
  z-index: 1;
  font-size: 1rem;
  display: flex;
  text-align: left;
  padding: 0 15em 1.5em 15em;
  @media (max-width: 950px) {
    padding: 0 12em 1.5em 12em;
  }
  @media (max-width: 850px) {
    padding: 0 10em 1.5em 10em;
  }
  @media (max-width: 750px) {
    padding: 0 8em 1em 8em;
  }
  @media (max-width: 650px) {
    padding: 0 6em 1em 6em;
  }
  @media (max-width: 600px) {
    padding: 0 5em 1em 5em;
  }
  @media (max-width: 550px) {
    padding: 0 2em 1em 2em;
  }
  @media (max-width: 350px) {
    padding: 0 1em 0.5em 1em;
    font-size: 0.85rem;
  }
`;
const ButtonsWrapper = styled.div`
  display: flex;
  gap: 4em;
  z-index: 1;
  @media (max-width: 350px) {
    gap: 1em;
    flex-wrap: wrap;
    justify-content: center;
  }
`;
const NavigationButton = styled(Link)`
  color: #ffd2c0;
  border-radius: 0.5rem;
  font-weight: 500;
  border: none;
  cursor: pointer;
  font-size: 1.5rem;
  text-decoration: underline;
  transition: transform 0.2s ease, box-shadow 0.2s ease, color 0.2s ease;

  &:focus,
  &:active,
  &:visited {
    color: #ffd2c0;
  }
  &:hover {
    color: #ef8057;
  }

  @media (max-width: 700px) {
    margin: 10px;
  }
  @media (max-width: 500px) {
    font-size: 1.1rem;
  }
  @media (max-width: 350px) {
    font-size: 0.9rem;
    margin: 5px;
  }
`;
const WeddingIntroContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  width: 100%;
  margin: 0 auto;
  aspect-ratio: 1 / 1;
`;
const GridItem = styled.div<{ bgcolor?: string }>`
  background-color: ${({ bgcolor }) => bgcolor || "transparent"};
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;
`;
const LogoItem = styled.div`
  background-image: url(${danceLogo});
  background-size: 50%;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Pic1Image = styled.div`
  background-image: url(${pic1Img});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  transform-origin: center;
`;
const Pic2Image = styled.div`
  background-image: url(${pic2Img});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  transform-origin: center;
`;
const NameText = styled.div`
  font-size: 7rem;
  font-weight: 600;
  color: #ffd2c0;
  z-index: 1;
  font-family: "linnea-light", "PP Cirka", sans-serif;
  margin: -0.7em;
  @media (max-width: 750px) {
    font-size: 6rem;
  }
  @media (max-width: 650px) {
    font-size: 6rem;
  }
  @media (max-width: 600px) {
    font-size: 5rem;
  }
  @media (max-width: 500px) {
    font-size: 4rem;
  }
  @media (max-width: 350px) {
    font-size: 2.5rem;
    margin: -0.3em;
  }
`;

function HomeView() {
  const { t } = useTranslation();
  return (
    <RootContainer>
      <HeaderContainer>
        <HeaderWrapper>
          <InfoWrapper>
            <HeaderText>{t("WeddingWeekend")}</HeaderText>
            <HeaderText>{t("July24thTo26th")} 2026</HeaderText>
          </InfoWrapper>
          <IconWrapper />
          <InfoWrapper>
            <HeaderText>SCHENSTRÖMSKA</HeaderText>
            <HeaderText>HERRGÅRDEN, RAMNÄS</HeaderText>
          </InfoWrapper>
        </HeaderWrapper>
        <NameText>ELVIRA & ERIK</NameText>
        <ButtonsWrapper>
          <NavigationButton to="/rsvp">{t("RSVPHere")}</NavigationButton>
          <NavigationButton to="/schedule">{t("schedule")}</NavigationButton>
          <NavigationButton to="/qa">{t("qa")}</NavigationButton>
        </ButtonsWrapper>
      </HeaderContainer>
      <InfoContainer>
        <SubTitle>
          {t("welcome")}!
        </SubTitle>
        <SubText>
          {t("BeyondAllReason")}
        </SubText>
        <SubText>
          {t("OfCourseTheMainEvent")}
        </SubText>
      </InfoContainer>
      <WeddingIntroContainer>
        <GridItem bgcolor="#f4d1c6">
          <LogoItem />
        </GridItem>
        <GridItem>
          <Pic2Image />
        </GridItem>
        <GridItem>
          <Pic1Image />
        </GridItem>
        <GridItem bgcolor="#3b2d29">
          <IconWrapper />
        </GridItem>
      </WeddingIntroContainer>
    </RootContainer>
  );
}

export default HomeView;