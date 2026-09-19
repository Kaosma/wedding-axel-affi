import styled from 'styled-components';
import { Clock, MapPin } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useTheme } from '../../app/AppStyling';

const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(252, 160, 79, 0.2);
  border: 1px solid #e0650d;
  padding: 1.5rem;
  border-radius: 0.75rem;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0);

  &:hover {
    transform: translateY(-3px) scale(1.02);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    padding: 1rem;
  }
`;
const IconContainer = styled.div`
  display: flex;
  gap: 1em;
`;
const IconWrapper = styled.div`
  background: #e0650d;
  color: white;
  padding: 0.75rem;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;

  @media (max-width: 768px) {
    padding: 0.5rem;
  }
`;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
const TimeRow = styled.div`
  display: flex;
  align-items: center;
  color: #e0650d;
  font-weight: bold;
  font-size: 1.5rem;
  gap: 0.5rem;
  min-width: 8em;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;
const Title = styled.h3`
  font-size: 1.125rem;
  font-weight: 600;
  color: ${() => useTheme().colors.olive.darker};
  margin: 0.5rem 0 0.25rem;
  display: flex;
  justify-content: flex-start;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;
const Subtitle = styled.div`
  font-size: 1rem;
  color: ${() => useTheme().colors.olive.darker};
  margin: 0;
  text-align: left;
  max-width: 30rem;

  @media (max-width: 768px) {
    max-width: 100%;
    font-size: 0.95rem;
  }
`;
const Location = styled.div`
  font-size: 0.95rem;
  color: #e0650d;
  margin-top: 0.5rem;
  display: flex;
  align-items: center;
  gap: 0.25rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

type ScheduleCardProps = {
  icon: LucideIcon;
  time: string;
  title: string;
  description: string;
  location: string;
};

function ScheduleCard({ icon: Icon, time, title, description, location }: ScheduleCardProps) {
  return (
    <Card>
      <IconContainer>
        <IconWrapper>
          <Icon size={20} />
        </IconWrapper>
        <TimeRow>
          <Clock size={22} />
          {time}
        </TimeRow>
      </IconContainer>
      <Info>
        <Title>{title}</Title>
        <Subtitle>{description}</Subtitle>
        <Location>
          <MapPin size={16} />
          {location}
        </Location>
      </Info>
    </Card>
  );
}

export default ScheduleCard;