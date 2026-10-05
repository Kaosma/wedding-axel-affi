import styled from 'styled-components';
import { rgba } from 'polished';
import { useTheme } from '../../app/AppStyling';

const RootContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: fit-content;
  padding: 3em 0;
  background: ${() =>
    rgba(useTheme().colors.red.secondary, 0.95)};
  color: black;
  text-align: center;
`;

const HeaderContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  min-height: 100vh;
  gap: 6em;

  @media (max-width: 350px) {
    gap: 3em;
  }
`;

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  gap: 6rem;
  margin-top: 15rem;
  color: ${() => useTheme().colors.red.primary};

  @media (max-width: 500px) {
    flex-direction: column;
    gap: 2rem;
    margin-top: 8rem;
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 20rem;
  color: ${() => useTheme().colors.red.primary};

  @media (max-width: 500px) {
    width: 100%;
  }
`;

const HeaderText = styled.div`
  font-size: 1.3rem;
  font-weight: 500;
  text-transform: uppercase;

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
  margin-bottom: 2em;
  color: black;

  @media (max-width: 350px) {
    justify-content: center;
    gap: 1em;
    flex-wrap: wrap;
  }
`;

const ContentFooter = styled.div`
  @media (max-width: 500px) {
    display: none;
  }
`;

const MainContentFooter = styled.div``;

const WeddingIntroContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  width: 100%;
  margin: 0 auto;
  aspect-ratio: 1 / 1;
`;

const GridItem = styled.div<{ bgcolor?: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  background-color: ${({ bgcolor }) =>
    bgcolor || 'transparent'};
  text-align: center;
`;

const LogoItem = styled.div`
  width: 80%;
  height: 80%;
  background-image: url('/images/pic1.png');
  background-position: center;
  background-size: 50%;
  background-repeat: no-repeat;
`;

const Pic1Image = styled.div`
  width: 80%;
  height: 80%;
  background-image: url('/images/pic2.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transform-origin: center;
`;

const Pic2Image = styled.div`
  width: 80%;
  height: 80%;
  background-image: url('/images/pic3.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transform-origin: center;
`;

const Pic3Image = styled.div`
  width: 80%;
  height: 80%;
  background-image: url('/images/pic4.png');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  transform-origin: center;
`;

const NameText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: -1rem 0;
  font-family: 'linnea-light', 'PP Cirka', sans-serif;
  font-size: 6rem;
  font-weight: 600;

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

function HomeView({
  role,
}: {
  role: string | null;
}) {
  return (
    <RootContainer>
      <HeaderContainer>
        <HeaderWrapper>
          <InfoWrapper>
            <HeaderText>
              We&apos;re Getting
            </HeaderText>

            <HeaderText>
              Married!
            </HeaderText>
          </InfoWrapper>

          <InfoWrapper>
            <NameText>AFSOON</NameText>
            <NameText>&amp;</NameText>
            <NameText>AXEL</NameText>
          </InfoWrapper>

          <InfoWrapper>
            <HeaderText>
              {role === 'family' ? '3' : '2'}-4 JULY 2027
            </HeaderText>

            <HeaderText>
              STOCKHOLM, SWEDEN
            </HeaderText>
          </InfoWrapper>
        </HeaderWrapper>

        <ButtonsWrapper>
          <ContentFooter>
            We&apos;re getting married ❤︎
          </ContentFooter>

          <MainContentFooter>
            We&apos;re getting married ❤︎
          </MainContentFooter>

          <ContentFooter>
            We&apos;re getting married ❤︎
          </ContentFooter>
        </ButtonsWrapper>
      </HeaderContainer>

      <WeddingIntroContainer>
        <GridItem>
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