import styled from 'styled-components';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { introImage, backSpanish, getSpanishImage, middleSpanish, timelineSpanish, validCodes } from '../../helpers/constants';


const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(180deg, #fdefda 0%, #f9ddc1 100%);
  padding: 2rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;
const Title = styled.h1`
  font-family: ${({ theme }) => theme.fonts.serif};
  color: ${({ theme }) => theme.colors.primary};
  font-size: 2.5rem;
  margin-bottom: 0.5rem;

  @media (max-width: 768px) {
    font-size: 1.75rem;
  }
`;
const Subtitle = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  color: ${({ theme }) => theme.colors.foreground};
  font-size: 1.125rem;
  opacity: 0.8;
`;
const CardsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  max-width: 600px;
  width: 100%;
  margin-bottom: 3rem;
`;
const Card = styled.div<{ $narrow?: boolean }>`
  width: ${({ $narrow }) => ($narrow ? '70%' : '100%')};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(181, 82, 57, 0.15);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 48px rgba(181, 82, 57, 0.25);
  }

  @media (max-width: 768px) {
    width: ${({ $narrow }) => ($narrow ? '85%' : '100%')};
  }
`;
const CardImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;
const EnterButton = styled.button`
  font-family: ${({ theme }) => theme.fonts.sans};
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  border: none;
  padding: 1rem 3rem;
  font-size: 1.125rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 16px rgba(181, 82, 57, 0.3);

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    transform: translateY(-2px);
    box-shadow: 0 6px 24px rgba(181, 82, 57, 0.4);
  }

  &:active {
    transform: translateY(0);
  }
`;
const Footer = styled.footer`
  margin-top: auto;
  padding-top: 2rem;
  text-align: center;
`;

const SpanishInvitationView = () => {
  const navigate = useNavigate();
  const { code } = useParams<{ code: string }>();
  const invitationCode = code || '';

  if (!validCodes.includes(invitationCode)) {
    return <Navigate to="/" />;
  }

  const invitationCards = [
    { src: introImage, alt: 'Elvira & Erik - Tu invitación' },
    { src: getSpanishImage(invitationCode), alt: 'Detalles de tu invitación' },
    { src: middleSpanish, alt: 'Detalles de tu invitación' },
    { src: backSpanish, alt: 'Mapa del lugar' },
  ];

  return (
    <PageContainer>
      <Header>
        <Title>Tu carta de invitación</Title>
        <Subtitle>Lee los detalles de tu invitación</Subtitle>
      </Header>

      <CardsContainer>
        {invitationCards.map((card, index) => (
          <Card key={index}>
            <CardImage src={card.src} alt={card.alt} />
          </Card>
        ))}

        <Card $narrow>
          <CardImage src={timelineSpanish} alt="Timeline de la boda" />
        </Card>
      </CardsContainer>

      <Footer>
        <EnterButton onClick={() => navigate('/')}>
          Entrar al web de la boda
        </EnterButton>
      </Footer>
    </PageContainer>
  );
};

export default SpanishInvitationView;