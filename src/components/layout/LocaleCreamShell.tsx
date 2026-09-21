import type { ReactNode } from 'react';
import styled from 'styled-components';

export const SONG_PUBLIC_PAGE_BG = 'hsl(30 100% 94%)';

const Shell = styled.div`
  color: black;
  background-color: ${SONG_PUBLIC_PAGE_BG};
  min-height: 100vh;
  min-height: 100dvh;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`;
const Body = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem 1rem 3rem;
  width: 100%;
  box-sizing: border-box;
`;

type LocaleCreamShellProps = {
  children: ReactNode;
};

function LocaleCreamShell({ children }: LocaleCreamShellProps) {
  return (
    <Shell>
      <Body>{children}</Body>
    </Shell>
  );
}

export default LocaleCreamShell;
