import styled from "styled-components";
import MainContentCard from "../../components/cards/MainContentCard";
import { useTheme } from "../../app/AppStyling";
import { rgba } from "polished";

const RootContainer = styled.div`
  color: black;
  background-color: ${() => rgba(useTheme().colors.red.secondary, 0.95)};
  background-size: cover;
  background-position: center;
  height: fit-content;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 3rem 0;
  min-height: 65em;
  color: ${() => useTheme().colors.red.primary};
`;
const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  font-family: 'Georgia', serif;
  margin-top: 0em;
`;
const Subtitle = styled.h3`
  text-align: center;
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  font-family: 'Georgia', serif;
  margin-top: 2rem;
`;
const ContentText = styled.p`
  text-align: left;
  font-size: 1.1rem;
  margin: 0 0 1.5rem 1rem;
  font-family: 'Georgia', serif;
  line-height: 1.6;
`;
const ToastmasterCard = styled.div`
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;
const ContactInfo = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1rem 0;
  border-left: 1px solid;
`;
const ImageWrapper = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;        // <— prevents zoom spill-out
`;

function ToastmastersView() {
  return (
    <RootContainer>
      <MainContentCard backgroundColor="hsl(30 100% 94%)">
        <Title>Meet Our Toastmasters</Title>

        <ContentText>The powerful trio: Steffi, Aleks and Jaqueline will guide you through the wedding weekend. If you want to give a speech or have any questions these are the girls to reach out to.</ContentText>

        <ToastmasterCard>
          <ImageWrapper>
            {/* <ToastmasterImage src={saraImage} alt="Sara Skaränger Littmarck" /> */}
          </ImageWrapper>
        </ToastmasterCard>

        <Subtitle>Want to Give a Speech?</Subtitle>

        <ContentText>If you'd like to give a speech or toast during the wedding weekend, please reach out to our toastmasters. They'll help coordinate the timing and ensure everything flows beautifully throughout the celebration.</ContentText>

        <ContactInfo>
          <ContentText style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Contact Our Toastmasters:
          </ContentText>
          <ContentText style={{ marginBottom: '0.5rem' }}>
            Email: stefanie.sundblad@gmail.com
          </ContentText>
        </ContactInfo>
      </MainContentCard>
    </RootContainer>
  );
}

export default ToastmastersView;