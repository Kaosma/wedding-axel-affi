import type { ReactNode } from 'react';
import styled from 'styled-components';
import { useTheme } from '../../app/AppStyling';
import LanguageSelector from '../select/LanguageSelector';

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

const TopBar = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0.75rem 1rem 0;
  flex-shrink: 0;
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
  const theme = useTheme();
  return (
    <Shell>
      <TopBar>
        <LanguageSelector color={theme.colors.olive.darker} />
      </TopBar>
      <Body>{children}</Body>
    </Shell>
  );
}

export default LocaleCreamShell;
