import styled from "styled-components";
import MainContentCard from "../../components/cards/MainContentCard";
import { useTheme } from "../../app/AppStyling";
import { ivarImage, saraImage } from "../../helpers/constants";
import { rgba } from "polished";
import { useTranslation } from "react-i18next";

const RootContainer = styled.div`
  color: black;
  background-color: ${() => rgba(useTheme().colors.terracotta.secondary, 0.95)};
  background-size: cover;
  background-position: center;
  height: fit-content;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 3rem 0;
  min-height: 65em;
`;
const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: ${() => useTheme().colors.olive.darker};
  margin-bottom: 2rem;
  font-family: 'Georgia', serif;
  margin-top: 0em;
`;
const Subtitle = styled.h3`
  text-align: center;
  font-size: 1.5rem;
  color: ${() => useTheme().colors.olive.darker};
  margin-bottom: 1.5rem;
  font-family: 'Georgia', serif;
  margin-top: 2rem;
`;
const ContentText = styled.p`
  text-align: left;
  font-size: 1.1rem;
  color: ${() => useTheme().colors.olive.darker};
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
const ToastmasterName = styled.h4`
  color: ${() => useTheme().colors.olive.darker};
  margin-bottom: 0.5rem;
  font-family: 'Georgia', serif;
  font-size: 1.8rem;
  font-weight: 300;
`;
const ContactInfo = styled.div`
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 0.5rem;
  padding: 1rem;
  margin: 1rem 0;
  border-left: 3px solid ${() => useTheme().colors.olive.primary};
`;
const TipsList = styled.ul`
  text-align: left;
  font-size: 1.1rem;
  color: ${() => useTheme().colors.olive.darker};
  margin-bottom: 1.5rem;
  font-family: 'Georgia', serif;
  line-height: 1.6;
  padding-left: 1.5rem;
`;
const TipsListItem = styled.li`
  margin-bottom: 0.5rem;
`;
const ImageWrapper = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  overflow: hidden;        // <— prevents zoom spill-out
`;
const ToastmasterImage = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  transform: scale(1.9);
  overflow: hidden;
  margin-bottom: 1rem;
  border: 3px solid rgba(255, 255, 255, 0.3);
`;
const ToastmasterContent = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1.5rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
`;
const ToastmasterInfo = styled.div`
  flex: 1;
`;

function AboutView() {
  const { t } = useTranslation();
  return (
    <RootContainer>
      <MainContentCard backgroundColor="hsl(30 100% 94%)">
        <Title>{t("AboutToastmastersTitle")}</Title>

        <ContentText>{t("AboutIntroParagraph1")}</ContentText>

        <ContentText>{t("AboutIntroParagraph2")}</ContentText>

        <ToastmasterCard>
          <ToastmasterContent>
            <ImageWrapper>
              <ToastmasterImage src={ivarImage} alt={t("AboutIvarName")} />
            </ImageWrapper>
            <ToastmasterInfo>
              <ToastmasterName>{t("AboutIvarName")}</ToastmasterName>
              <ContentText>{t("AboutIvarParagraph1")}</ContentText>
              <ContentText>{t("AboutIvarParagraph2")}</ContentText>
              <ContentText>{t("AboutIvarParagraph3")}</ContentText>
            </ToastmasterInfo>
          </ToastmasterContent>
        </ToastmasterCard>

        <ToastmasterCard>
          <ToastmasterContent>
            <ImageWrapper>
              <ToastmasterImage src={saraImage} alt={t("AboutSaraName")} />
            </ImageWrapper>
            <ToastmasterInfo>
              <ToastmasterName>{t("AboutSaraName")}</ToastmasterName>
              <ContentText>{t("AboutSaraParagraph1")}</ContentText>
              <ContentText>{t("AboutSaraParagraph2")}</ContentText>
              <ContentText>{t("AboutSaraParagraph3")}</ContentText>
            </ToastmasterInfo>
          </ToastmasterContent>
        </ToastmasterCard>

        <Subtitle>{t("AboutSpeechTitle")}</Subtitle>

        <ContentText>{t("AboutSpeechParagraph")}</ContentText>

        <ContactInfo>
          <ContentText style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
            {t("AboutContactHeading")}
          </ContentText>
          <ContentText style={{ marginBottom: '0.5rem' }}>
            {t("AboutContactIvar")}
          </ContentText>
          <ContentText style={{ marginBottom: '0rem' }}>
            {t("AboutContactSara")}
          </ContentText>
        </ContactInfo>

        <Subtitle>{t("AboutTipsTitle")}</Subtitle>

        <ContentText>{t("AboutTipsIntro")}</ContentText>

        <TipsList>
          <TipsListItem>
            <strong>{t("AboutTipPersonalBold")}</strong> {t("AboutTipPersonalText")}
          </TipsListItem>
          <TipsListItem>
            <strong>{t("AboutTipConciseBold")}</strong> {t("AboutTipConciseText")}
          </TipsListItem>
          <TipsListItem>
            <strong>{t("AboutTipHeartBold")}</strong> {t("AboutTipHeartText")}
          </TipsListItem>
        </TipsList>

        <ContentText>{t("AboutTipsConclusion")}</ContentText>
      </MainContentCard>
    </RootContainer>
  );
}

export default AboutView;