import styled from "styled-components";
import { useTheme } from "../../app/AppStyling";
import MainContentCard from "../../components/cards/MainContentCard";
import { Heart } from "lucide-react";
import { QuestionAccordion } from "../../components/select/Accordion";
import { rgba } from "polished";
import { faqs } from "../../helpers/constants";


const RootContainer = styled.div`
  background-color: ${() => rgba(useTheme().colors.red.secondary, 0.95)};
  min-height: 100vh;
  height: fit-content;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 3rem 0;
  min-height: 65em;
`;
const TitleWrapper = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;
const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;
const Title = styled.h1`
  font-size: 2rem;
  font-family: "Georgia", serif;
  color: ${() => useTheme().colors.red.primary};
  font-family: 'Georgia', serif;
  margin: 0em;
`;
const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${() => useTheme().colors.red.primary};
  max-width: 40rem;
  margin: 0 auto;
  line-height: 1.6;
  font-family: "Georgia", serif;
`;
const SectionCard = styled.div`
  margin-bottom: 2rem;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const SectionCardHeader = styled.div`
  text-align: center;
`;
const SectionTitle = styled.div`
  font-size: 1.6rem;
  font-family: "Georgia", serif;
  color: ${() => useTheme().colors.red.primary};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SectionDescription = styled.div`
  font-size: 1rem;
  font-family: "Georgia", serif;
  color: #555;
`;
const ContactSection = styled.div`
  text-align: center;
`;
const ContactText = styled.p`
  color: ${() => useTheme().colors.red.primary};
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

function QNAView() {
  const theme = useTheme();

  return (
    <RootContainer>
      <MainContentCard backgroundColor="hsl(30 100% 94%)">

        <TitleWrapper>
          <TitleRow>
            <Heart size={24} color={useTheme().colors.red.primary} />
            <Title>Questions and Answers</Title>
            <Heart size={24} color={useTheme().colors.red.primary} />
          </TitleRow>
          <Subtitle>We've answered some of the most common questions about our special day. If you don't see your question here, please don't hesitate to reach out to us directly!</Subtitle>
        </TitleWrapper>

        <SectionCard>
          <SectionCardHeader>
            <SectionTitle>Frequently Asked Questions</SectionTitle>
            <SectionDescription>
              Everything you need to know for our weekend
            </SectionDescription>
          </SectionCardHeader>
          {faqs.map((faq, index) => (
            <QuestionAccordion faqObject={faq} itemNumber={`item${index}`} key={index} />
          ))}
        </SectionCard>

        <ContactSection>
          <Heart
            size={32}
            color={theme.colors.red.primary}
            style={{ marginBottom: "1rem" }}
          />
          <SectionTitle style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>
            Still Have Questions?
          </SectionTitle>
          <SectionDescription style={{ marginBottom: "1rem" }}>
            We're here to help! Don't hesitate to reach out if you need anything else.
          </SectionDescription>
          <ContactText>Email: euawedding@gmail.com</ContactText>
          <ContactText>Phone: +46 737728175</ContactText>
        </ContactSection>
      </MainContentCard>
    </RootContainer>
  );
}

export default QNAView;