import styled from 'styled-components';
import { FormEvent, useState } from 'react';
import { useTheme } from '../../app/AppStyling';
import { Music } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { serverTimestamp } from 'firebase/database';
import { db, push, ref } from '../../firebase/firebase';
import TextInputField from '../../components/input/TextInputField';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import LocaleCreamShell from '../../components/layout/LocaleCreamShell';

const Content = styled.div`
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
`;

const TitleWrapper = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-family: 'Georgia', serif;
  color: ${() => useTheme().colors.olive.darker};
  margin: 0;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  color: ${() => useTheme().colors.olive.darker};
  max-width: 40rem;
  margin: 0 auto;
  line-height: 1.6;
  font-family: 'Georgia', serif;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`;

const StatusText = styled.p`
  font-family: 'Georgia', serif;
  font-size: 0.95rem;
  color: ${() => useTheme().colors.olive.darker};
  margin: 0.5rem 0 0;
  text-align: center;
  min-height: 1.5em;
`;

const ErrorText = styled(StatusText)`
  color: ${() => useTheme().colors.error.dark};
`;

const MIN_SONG_LENGTH = 3;

function MusicRequestView() {
  const theme = useTheme();
  const { t } = useTranslation();
  const [song, setSong] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const trimmedLength = song.trim().length;
  const canSubmit = trimmedLength >= MIN_SONG_LENGTH && !submitting;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const trimmed = song.trim();
    if (trimmed.length < MIN_SONG_LENGTH) {
      setError(t('musicRequestTooShort'));
      return;
    }
    setError('');
    setSuccess(false);
    setSubmitting(true);
    try {
      await push(ref(db, 'songRequests'), {
        song: trimmed,
        checked: false,
        createdAt: serverTimestamp(),
      });
      setSong('');
      setSuccess(true);
    } catch {
      setError(t('musicRequestError'));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <LocaleCreamShell>
      <Content>
        <TitleWrapper>
          <TitleRow>
            <Music size={24} color={theme.colors.olive.primary} />
            <Title>{t('musicRequestTitle')}</Title>
            <Music size={24} color={theme.colors.olive.primary} />
          </TitleRow>
          <Subtitle>{t('musicRequestSubtitle')}</Subtitle>
        </TitleWrapper>

        <Form onSubmit={handleSubmit}>
          <TextInputField
            label={t('musicRequestLabel')}
            filled
            value={song}
            width={22}
            onChangeCallback={(v) => {
              setSong(v);
              if (error) setError('');
              if (success) setSuccess(false);
            }}
            disabled={submitting}
          />
          <PrimaryButton type="submit" disabled={!canSubmit}>
            {submitting ? t('musicRequestSending') : t('musicRequestSubmit')}
          </PrimaryButton>
          {error ? <ErrorText>{error}</ErrorText> : null}
          {success && !error ? <StatusText>{t('musicRequestThanks')}</StatusText> : null}
        </Form>
      </Content>
    </LocaleCreamShell>
  );
}

export default MusicRequestView;
