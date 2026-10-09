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
  margin-top: 10rem;
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
  font-weight: 500;
  text-transform: uppercase;
  font-family: 'Fraunces', Georgia, serif;
  font-size: 1.2rem;
  /* font-variation-settings: 'opsz' 120, 'SOFT' 30, 'WONK' 0; */
  line-height: 0.95;

  @media (max-width: 750px) {
    font-size: 0.7rem;
  }

  @media (max-width: 500px) {
    font-size: 1rem;
  }
`;

const WeddingIntroContainer = styled.section`
  display: grid;
  grid-template-columns: 1fr 1.02fr;
  grid-template-rows: 1fr 1fr;
  gap: 0.35rem;
  width: 100%;
  margin: 0 auto;
  padding: 0 0.35rem;
  box-sizing: border-box;
  aspect-ratio: 1.62 / 1;

  @media (max-width: 600px) {
    gap: 0.2rem;
    padding: 0 0.2rem;
  }
`;

const GridItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  min-height: 0;
  overflow: hidden;
`;

const BigImageGridItem = styled(GridItem)`
  grid-column: 2;
  grid-row: 1 / 3;
`;

const ImageFrame = styled.div`
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const Pic1Image = styled(ImageFrame)`
  background-image: url('/images/pic1.jpeg');
`;

const Pic2Image = styled(ImageFrame)`
  background-image: url('/images/pic2.jpeg');
`;

const Pic3Image = styled(ImageFrame) <{ $image: string }>`
  background-image: url(${({ $image }) => $image});
`;

const NameText = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: -1rem 0;
  font-family: 'Playfair Display', Georgia, serif;
  font-weight: 500;
  letter-spacing: -0.02em;
  font-size: 6rem;

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
  let imageLink = role === 'family'
    ? '/images/familybig.jpeg'
    : '/images/friendsbig.jpeg'
  return (
    <RootContainer>
      <HeaderContainer>
        <HeaderWrapper>
          <InfoWrapper>
            <HeaderText>We&apos;re Getting</HeaderText>
            <HeaderText>Married!</HeaderText>
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

            <HeaderText>STOCKHOLM, SWEDEN</HeaderText>
          </InfoWrapper>
        </HeaderWrapper>
      </HeaderContainer>

      <WeddingIntroContainer>
        <GridItem>
          <Pic1Image />
        </GridItem>

        <GridItem>
          <Pic2Image />
        </GridItem>

        <BigImageGridItem>
          <Pic3Image $image={imageLink} />
        </BigImageGridItem>
      </WeddingIntroContainer>
    </RootContainer>
  );
}

export default HomeView;