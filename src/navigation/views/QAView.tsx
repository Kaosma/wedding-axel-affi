import styled from "styled-components";
import { useTheme } from "../../app/AppStyling";
import MainContentCard from "../../components/cards/MainContentCard";
import { Heart } from "lucide-react";
import { QuestionAccordion } from "../../components/select/Accordion";
import { rgba } from "polished";
import { faqs } from "../../helpers/constants";
import { useTranslation } from "react-i18next";

const RootContainer = styled.div`
  color: black;
  background-color: ${() => rgba(useTheme().colors.terracotta.secondary, 0.95)};
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
  color: ${() => useTheme().colors.olive.darker};
  font-family: 'Georgia', serif;
  margin: 0em;
`;
const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${() => useTheme().colors.olive.darker};
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
  color: ${() => useTheme().colors.olive.darker};
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SectionDescription = styled.div`
  font-size: 1rem;
  font-family: "Georgia", serif;
  color: ${() => useTheme().colors.olive.darker};
`;
const ContactSection = styled.div`
  text-align: center;
`;
const ContactText = styled.p`
  color: ${() => useTheme().colors.olive.darker};
  margin-bottom: 0.5rem;
  font-size: 0.9rem;
`;

function QNAView() {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <RootContainer>
      <MainContentCard backgroundColor="hsl(30 100% 94%)">

        <TitleWrapper>
          <TitleRow>
            <Heart size={24} color={theme.colors.olive.primary} />
            <Title>{t('QuestionsAndAnswers')}</Title>
            <Heart size={24} color={theme.colors.olive.primary} />
          </TitleRow>
          <Subtitle>{t('CommonQuestions')}</Subtitle>
        </TitleWrapper>

        <SectionCard>
          <SectionCardHeader>
            <SectionTitle>{t('FrequentlyAskedQuestions')}</SectionTitle>
            <SectionDescription>
              {t('EverythingYouNeedToKnow')}
            </SectionDescription>
          </SectionCardHeader>
          {faqs.map((faq, index) => (
            <QuestionAccordion faqObject={faq} itemNumber={`item${index}`} key={index} />
          ))}
        </SectionCard>

        <ContactSection>
          <Heart
            size={32}
            color={theme.colors.olive.primary}
            style={{ marginBottom: "1rem" }}
          />
          <SectionTitle style={{ fontSize: "1.3rem", marginBottom: "0.5rem" }}>
            {t('StillHaveQuestions')}
          </SectionTitle>
          <SectionDescription style={{ marginBottom: "1rem" }}>
            {t('WeAreHereToHelp')}
          </SectionDescription>
          <ContactText>{t('Email')}: euawedding@gmail.com</ContactText>
          <ContactText>{t('Phone')}: +46 737728175</ContactText>
        </ContactSection>
      </MainContentCard>
    </RootContainer>
  );
}

export default QNAView;