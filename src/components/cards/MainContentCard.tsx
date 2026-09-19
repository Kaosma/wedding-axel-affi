import styled from "styled-components";

const CardContainer = styled.div<{ background?: string, $elevated?: boolean }>`
  background-color: ${({ background }) =>
    background || "rgba(248, 205, 158, 0.416)"};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: ${({ $elevated }) => $elevated ? '0 6px 15px rgba(0, 0, 0, 0.6)' : '0 4px 10px rgba(0, 0, 0, 0.2)'};
  border: ${({ $elevated }) => $elevated ? '1px solid rgba(0, 0, 0, 0.2)' : 'none'};
  max-width: 800px;
  margin: auto;
  backdrop-filter: blur(4px);
  height: 80%;
`;

type MainContentCardProps = {
  children: React.ReactNode;
  backgroundColor?: string;
  elevated?: boolean;
};

function MainContentCard({ children, backgroundColor, elevated = false }: MainContentCardProps) {
  return <CardContainer background={backgroundColor} $elevated={elevated}>{children}</CardContainer>;
}

export default MainContentCard;