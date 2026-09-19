import styled from "styled-components";
import MainContentCard from "../../components/cards/MainContentCard";
import { Car, Train } from 'lucide-react';
import { useTheme } from "../../app/AppStyling";
import { rgba } from "polished";
import { useTranslation } from "react-i18next";

const RootContainer = styled.div`
  color: black;
  background-color: ${() => rgba(useTheme().colors.terracotta.secondary, 0.95)};
  background-size: cover;
  background-position: center;
  height: fit-content;
  width: 100%;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 3em 0;
`;
const Title = styled.h2`
  text-align: center;
  font-size: 2rem;
  color: ${() => useTheme().colors.olive.darker};
  margin: 0;
  font-family: 'Georgia', serif;
`;
const SectionTitle = styled.div`
  font-size: 1.1rem;
  font-family: "Georgia", serif;
  color: ${() => useTheme().colors.olive.darker};
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1em 0;
`;
const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  margin-bottom: 2rem;
`;
const Column = styled.div`
  flex: 1;
  min-width: 300px;
`;
const ColumnText = styled(Column)`
  background: ${() => useTheme().colors.peach.lightest};
  border-radius: 0.75rem;
  padding: 1em;
`;
const IconHeading = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: #fd8553;
  font-weight: 800;
  font-size: 1.1rem;
  margin-bottom: 0.25rem;
`;
const Text = styled.p`
  color: #334155;
  font-size: 1rem;
  margin: 0;
  display: flex;
  text-align: start;
`;
const Card = styled.div`
  background: transparent;
  padding: 0.5em 1.5em 1.5em 1.5em;
  border-radius: 0.75rem;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);
  border: 1px solid ${() => useTheme().colors.peach.darker};
  margin-bottom: 1rem;
`;
const CardHeading = styled.h3`
  font-weight: 800;
  font-size: 1rem;
  margin-bottom: 0.25rem;
  display: flex;
  justify-content: flex-start;
  color: ${() => useTheme().colors.olive.darker};
`;
const SmallText = styled.p`
  margin: 0;
  font-size: 0.95rem;
  color: #475569;
  display: flex;
  justify-content: flex-start;
  text-align: start;
`;
const Footer = styled.div`
  background: rgba(253, 133, 83, 0.6);
  padding: 1rem;
  border-radius: 0.75rem;
  font-size: 0.95rem;
  text-align: flex;
  margin-top: 2rem;
  color: #334155;

  strong {
    font-weight: 800;
  }
`;

function TravelView() {
  const { t } = useTranslation();
  return (
    <RootContainer>
      <MainContentCard backgroundColor="hsl(30 100% 94%)">
        <Title>{t('HowToGetThere')}</Title>
        <SectionTitle>Schenströms Väg 1, 730 60 Ramnäs</SectionTitle>
        <Row>
          <ColumnText>
            <IconHeading>
              <Car size={20} />
              {t('ByCar')}
            </IconHeading>
            <Text>
              {t('FromStockholm')}
            </Text>
          </ColumnText>
          <ColumnText>
            <IconHeading>
              <Train size={20} />
              {t('ByPublicTransport')}
            </IconHeading>
            <Text>
              {t('TakeTheTrain')}
            </Text>
          </ColumnText>
          <Column>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2008.1287750043382!2d16.179817877660813!3d59.780548174835985!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465e778e4c4395f7%3A0x5eb9543796e54bc5!2sSchenstr%C3%B6mska%20Herrg%C3%A5rden!5e0!3m2!1ssv!2sse!4v1758623905484!5m2!1ssv!2sse"
              width="100%"
              height="200"
              style={{ border: 0, borderRadius: '0.75rem' }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </Column>
        </Row>

        <Card>
          <CardHeading>{t('Carpooling')}</CardHeading>
          <SmallText>
            {t('ThereAreManyOfUs')}
          </SmallText>
        </Card>

        <Card>
          <CardHeading>Taxi</CardHeading>
          <SmallText>
            {t('PreferTaxi')}
            <br />
            Västerås Taxi: 021-18 50 00
            <br />
            Sweden Taxi: 021-12 22 22
          </SmallText>
        </Card>

        <Footer>
          {t('AnyQuestions')} {t('EmailUsAt')} <strong>euawedding@gmail.com</strong>
        </Footer>
      </MainContentCard>
    </RootContainer>
  );
}

export default TravelView;


