import styled from 'styled-components';
import { useTheme } from '../../app/AppStyling';
import Toast from '../../components/toast/Toast';
import { useToast } from '../../hooks/useToast';

const FooterContainer = styled.div`
  background-color: ${() => useTheme().colors.red.secondary};
  color: black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const BottomSection = styled.div`
  padding: 1.5rem 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${() => useTheme().colors.mix.light};
`;
const Branding = styled.div`
`;
const Divider = styled.div`
  margin: 0rem 0.5rem;
`;
const BrandingText = styled.div`
  :hover {
    color: #1f3b60;
    cursor: pointer;
  }
`;
function FooterWrapper() {
  const { toast, hideToast } = useToast();

  return (
    <>
      {toast.isVisible && (
        <Toast
          message={toast.message}
          isVisible={toast.isVisible}
          isExiting={toast.isExiting}
          onClose={hideToast}
        />
      )}
      <FooterContainer>
        <BottomSection>
          <Branding>© Wedding Templates 2027</Branding>
          <Divider>|</Divider>
          <BrandingText>Created privately</BrandingText>
        </BottomSection>
      </FooterContainer>
    </>
  );
}

export default FooterWrapper;