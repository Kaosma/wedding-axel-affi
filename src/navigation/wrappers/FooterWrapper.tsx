import styled from 'styled-components';
import { useTheme } from '../../app/AppStyling';
import { Instagram, ExternalLink } from 'lucide-react';
import Toast from '../../components/toast/Toast';
import { useToast } from '../../hooks/useToast';
import LanguageSelector from '../../components/select/LanguageSelector';
import { useTranslation } from 'react-i18next';

const FooterContainer = styled.div`
  background-color: ${() => useTheme().colors.terracotta.secondary};
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
const Heading = styled.h2`
  font-size: 2.5rem;
  text-transform: uppercase;
  font-weight: 700;
  color: white;
  margin-bottom: 0.5rem;
  font-family: "linnea-light", "PP Cirka", sans-serif;
  @media (max-width: 500px) {
    font-size: 2rem;
  }
`;
const Underline = styled.div`
  width: 60px;
  height: 4px;
  background-color: white;
  margin: 0 auto 2rem;
  border-radius: 999px;
`;
const SubText = styled.p`
  color: #ffd2c0;
  font-size: 1.125rem;
  margin-bottom: 2rem;
`;
const HashtagButton = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: white;
  color: #fd8553;
  font-weight: 600;
  font-size: 1.25rem;
  padding: 1rem 2rem;
  border-radius: 9999px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 1rem;
  width: fit-content;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
`;
const GradientButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: linear-gradient(90deg, #833ab4, #fd1d1d, #fcb045);
  color: white;
  font-weight: 600;
  font-size: 1.1rem;
  padding: 1rem 2rem;
  border-radius: 9999px;
  text-decoration: none;
  transition: transform 0.2s ease;
  width: fit-content;

  &:hover {
    transform: scale(1.03);
    color: white;
    text-decoration: underline;
  }
  svg {
    stroke: white;
  }
`;
const BottomSection = styled.div`
  padding: 1.5rem 0rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${() => useTheme().colors.peach.lightest};
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
const LanguageWrapper = styled.div`
  display: flex;
  margin-top: 2rem;
`;
function FooterWrapper() {
  const { toast, showToast, hideToast } = useToast();
  const { t } = useTranslation();
  const copyHashtag = async () => {
    try {
      await navigator.clipboard.writeText('#euawedding');
      showToast(t('hashtag'));
    } catch (err) {
      console.error('Failed to copy hashtag: ', err);
      showToast(t('hashtagError'));
    }
  };

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
        <TopSection>
          <Heading>{t('journey')}</Heading>
          <Underline />
          <SubText>{t('share')}</SubText>
          <HashtagButton onClick={copyHashtag}>
            <Instagram size={20} strokeWidth={2} />
            #euawedding
          </HashtagButton>
          <br />
          <GradientButton
            href="https://www.instagram.com/euawedding/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram">
            <Instagram size={20} strokeWidth={2} />
            {t('instagram')}
            <ExternalLink size={18} strokeWidth={2} />
          </GradientButton>
        </TopSection>
        <LanguageWrapper>
          <LanguageSelector color={useTheme().colors.mix.light} />
        </LanguageWrapper>
        <BottomSection>
          <Branding>© Wedding Templates 2026</Branding>
          <Divider>|</Divider>
          <BrandingText>{t('createdPrivately')}</BrandingText>
        </BottomSection>
      </FooterContainer>
    </>
  );
}

export default FooterWrapper;