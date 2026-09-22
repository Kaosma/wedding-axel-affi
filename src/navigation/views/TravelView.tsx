import styled from "styled-components";
import MainContentCard from "../../components/cards/MainContentCard";
import { Car, Train } from 'lucide-react';
import { useTheme } from "../../app/AppStyling";
import { rgba } from "polished";


const RootContainer = styled.div`
  color: black;
  background-color: ${() => rgba(useTheme().colors.red.secondary, 0.95)};
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
  color: ${() => useTheme().colors.red.primary};
  margin: 0;
  font-family: 'Georgia', serif;
`;
const SectionTitle = styled.div`
  font-size: 1.1rem;
  font-family: "Georgia", serif;
  color: ${() => useTheme().colors.red.primary};
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
  background: white;
  border-radius: 0.75rem;
  padding: 1em;
`;
const IconHeading = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: ${() => useTheme().colors.red.primary};
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
  border: 1px solid ${() => useTheme().colors.red.primary};
  margin-bottom: 1rem;
`;
const CardHeading = styled.h3`
  font-weight: 800;
  font-size: 1rem;
  margin-bottom: 0.25rem;
  display: flex;
  justify-content: flex-start;
  color: ${() => useTheme().colors.red.primary};
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
  background: white;
  padding: 1rem;
  border-radius: 0.75rem;
  font-size: 0.95rem;
  text-align: flex;
  margin-top: 2rem;
  color: ${() => useTheme().colors.red.primary};

  strong {
    font-weight: 800;
  }
`;

function TravelView() {

  return (
    <RootContainer>
      <MainContentCard backgroundColor="hsl(30 100% 94%)">
        <Title>How to Get to the Castle</Title>
        <SectionTitle>Häringe Slott is located approximately 35 km south of Stockholm, at 137 91 Västerhaninge. The castle is reached via road 73 and is about 25 minutes from Stockholm by car.</SectionTitle>
        <Row>
          <ColumnText>
            <IconHeading>
              <Car size={20} />
              By Car
            </IconHeading>
            <Text>
              From Stockholm, take road 73 towards Nynäshamn. Exit at Tungelsta/Landfjärden, then follow the signs towards Häringe Slott. The journey takes approximately 25–30 minutes, depending on traffic.
            </Text>
          </ColumnText>
          <ColumnText>
            <IconHeading>
              <Train size={20} />
              By Public Transport
            </IconHeading>
            <Text>
              Take the commuter train from Stockholm to Västerhaninge station. From there, take bus 847 towards Ösmo and get off at Häringe grindar. The castle is approximately 800 metres from the bus stop, which is about a 10–15 minute walk. Please check the current train and bus times before travelling, as connections may vary depending on the day and time.
            </Text>
          </ColumnText>
          <Column>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2052.5600476785926!2d18.011667077630726!3d59.039333974475134!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x465f6358ee2309ab%3A0x7adc3944c34aa233!2sH%C3%A4ringe%20slott!5e0!3m2!1ssv!2sse!4v1790068592135!5m2!1ssv!2sse"
              width="100%"
              height="200"
              style={{ border: 0, borderRadius: '0.75rem' }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </Column>
        </Row>

        <Card>
          <CardHeading>Carpooling</CardHeading>
          <SmallText>
            If you are driving to the wedding and have an extra seat available, please let us know. There may be other guests who would be happy to travel with you. If you need a lift to Häringe Slott, please also let us know and we will try to help coordinate a ride.
          </SmallText>
        </Card>

        <Card>
          <CardHeading>Taxi or Uber</CardHeading>
          <SmallText>
            You can take a taxi directly from Stockholm or Västerhaninge to Häringe Slott. When booking, use the full destination:
            <br />
            <br />
            Stockholm Taxi: 08-15 00 00
          </SmallText>
        </Card>

        <Footer>
          Any questions about transport or lodging? Email us at <strong>euawedding@gmail.com</strong>
        </Footer>
      </MainContentCard>
    </RootContainer>
  );
}

export default TravelView;


