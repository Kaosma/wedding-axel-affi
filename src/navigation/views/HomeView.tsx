import styled from "styled-components";
import { useTheme } from "../../app/AppStyling";

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${() => useTheme().colors.red.secondary};
  color: white;
  text-align: center;
`;
const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 100vh;
  gap: 6em;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0; bottom: 0;
    background-image: url("/images/affiaxel.avif");
    background-size: cover;
    background-position: center;
    z-index: 0;
  }

  @media (max-width: 350px) {
    gap: 3em;
  }
`;
const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6rem;
  z-index: 1;
  width: 100%;
  margin-top: 15rem;
  color: ${() => useTheme().colors.red.primary};
  @media (max-width: 500px) {
    flex-direction: column;
  }
`;
const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  z-index: 1;
  width: 20rem;
  color: ${() => useTheme().colors.red.primary};
`;
const HeaderText = styled.div`
  font-size: 1.3rem;
  text-transform: uppercase;
  font-weight: 500;
  z-index: 1;
  @media (max-width: 750px) {
    font-size: 0.7rem;
  }
  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;
const ButtonsWrapper = styled.div`
  display: flex;
  gap: 4em;
  z-index: 1;
  margin-bottom: 2em;
  @media (max-width: 350px) {
    gap: 1em;
    flex-wrap: wrap;
    justify-content: center;
  }
  color: black;
`;
const ContentFooter = styled.div`
  @media (max-width: 500px) {
    display: none;
  }
`;
const MainContentFooter = styled.div`
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
  background-image: url("/images/pic1.png");
  background-size: 50%;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const Pic1Image = styled.div`
  background-image: url("/images/pic2.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  transform-origin: center;
`;
const Pic2Image = styled.div`
  background-image: url("/images/pic3.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  transform-origin: center;
`;
const Pic3Image = styled.div`
  background-image: url("/images/pic4.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  width: 100%;
  height: 100%;
  transform-origin: center;
`;
const NameText = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 6rem;
  font-weight: 600;
  z-index: 1;
  margin: -1rem 0;
  font-family: "linnea-light", "PP Cirka", sans-serif;
  @media (max-width: 750px) {
    font-size: 5rem;
  }
  @media (max-width: 650px) {
    font-size: 4rem;
  }
  @media (max-width: 600px) {
    font-size: 3rem;
  }
  @media (max-width: 500px) {
    font-size: 4rem;
  }
`;

function HomeView({ role }: { role: string | null }) {

  return (
    <RootContainer>
      <HeaderContainer>
        <HeaderWrapper>
          <InfoWrapper>
            <HeaderText>We're Getting</HeaderText>
            <HeaderText>Married!</HeaderText>
          </InfoWrapper>
          <InfoWrapper>
            <NameText>AFSOON</NameText>
            <NameText>&</NameText>
            <NameText>AXEL</NameText>
          </InfoWrapper>
          <InfoWrapper>
            <HeaderText>{role && role === 'family' ? '3' : '2'}-4 JULY 2027</HeaderText>
            <HeaderText>STOCKHOLM, SWEDEN</HeaderText>
          </InfoWrapper>
        </HeaderWrapper>
        <ButtonsWrapper>
          <ContentFooter>We're getting married ❤︎⁠</ContentFooter>
          <MainContentFooter>We're getting married ❤︎⁠</MainContentFooter>
          <ContentFooter>We're getting married ❤︎⁠</ContentFooter>
        </ButtonsWrapper>
      </HeaderContainer>
      <WeddingIntroContainer>
        <GridItem >
          <Pic1Image />
        </GridItem>
        <GridItem bgcolor="#f4d1c6">
          <LogoItem />
        </GridItem>
        <GridItem>
          <Pic2Image />
        </GridItem>
        <GridItem>
          <Pic3Image />
        </GridItem>
      </WeddingIntroContainer>
    </RootContainer>
  );
}

export default HomeView;