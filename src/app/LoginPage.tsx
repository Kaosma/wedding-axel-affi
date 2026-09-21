import { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import './App.css';
import { loginLogo, passcodes } from '../helpers/constants';
import { useTheme } from './AppStyling';
import { Eye, EyeOff } from 'lucide-react';

const IconWrapper = styled.div`
  background-image: url(${loginLogo});
  background-size: cover;
  background-position: center;
  width: 207px;
  height: 278px;
  margin: 1em 0 4em 0;

  @media (max-width: 480px) {
    width: 160px;
    height: 215px;
    margin: 0.5em 0 2.5em 0;
  }
`;
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.03);
  }
  100% {
    transform: scale(1);
  }
`;

const Background = styled.div`
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding: 1em 1.5rem 3rem 1.5rem;
  background: linear-gradient(180deg, #fff7ec 0%, #f9ddc1 100%);

  @media (max-width: 480px) {
    justify-content: flex-start;
    padding: 1rem 1rem 2rem 1rem;
  }
`;
const Card = styled.div`
  border-radius: 28px;
  background: transparent;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: min(100%, 28rem);
  padding: 0 0.5rem;
`;
const Heading = styled.h1`
  margin: 0 0 1.25rem;
  font-size: 2.5rem;
  font-family: 'Linnea-bold', serif;
  color: #af523a;
  white-space: nowrap;
  text-transform: uppercase;
  animation: ${pulse} 3s ease-in-out infinite;

  @media (max-width: 600px) {
    font-size: clamp(2rem, 7vw, 2.2rem);
    white-space: normal;
    line-height: 1.1;
  }
  @media (max-width: 480px) {
    font-size: clamp(1.75rem, 7vw, 2.2rem);
    white-space: normal;
    line-height: 1.1;
  }
`;
const Intro = styled.p`
  margin: 0 auto clamp(2rem, 4vw, 2.5rem);
  line-height: 1.6;
  color: green;
  font-size: 1.05rem;
  max-width: 25rem;

  @media (max-width: 480px) {
    font-size: 0.95rem;
    margin-bottom: 1.75rem;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 1rem;
`;
const InputField = styled.input`
  width: 100%;
  padding: 1rem 1.25rem;
  padding-right: 3.5rem;
  border-radius: 20px;
  border: 1.5px solid rgba(210, 137, 99, 0.5);
  background: transparent;
  color: #8a4f37;
  font-size: 1rem;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;

  &::placeholder {
    color: rgba(138, 79, 55, 0.6);
  }

  &:focus {
    outline: none;
    border-color: green;
    box-shadow: 0 0 0 6px rgba(217, 108, 74, 0.16);
  }

  @media (max-width: 480px) {
    font-size: 0.95rem;
    padding: 0.9rem 1rem;
    padding-right: 3rem;
  }
`;
const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem 1.25rem;
  border: none;
  border-radius: 20px;
  background: green;
  color: white;
  font-size: 1.15rem;
  font-weight: 400;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease, filter 0.2s ease;

  &:focus-visible {
    outline: none;
  }

  &:focus {
    outline: none;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 16px 30px rgba(217, 108, 74, 0.2);
    filter: brightness(1.02);
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 12px 20px rgba(217, 108, 74, 0.14);
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.9rem 1rem;
  }
`;
const PasswordFieldWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const ToggleVisibilityButton = styled.button`
  position: absolute;
  right: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: transparent;
  cursor: pointer;
  color: rgba(138, 79, 55, 0.7);
  transition: color 0.2s ease, transform 0.2s ease;

  &:focus {
    outline: none;
  }

  &:hover {
    color: rgba(138, 79, 55, 0.95);
    transform: translateY(-1px);
  }

  &:focus-visible {
    outline: none;
    color: green;
  }

  @media (max-width: 480px) {
    right: 0.75rem;
  }
`;
const ErrorMessage = styled.p`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${() => useTheme().colors.error.dark};
  font-size: 0.95rem;
  text-align: left;
  margin-top: -0.1rem;

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;

function LoginPage({ loginCallback }: { loginCallback: (role: string) => void }) {
  const [passcode, setPasscode] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);


  const handlePasscodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasscode(e.target.value);
    if (errorMessage) {
      setErrorMessage('');
    }
  };

  const handleLoginAttempt = () => {
    const role = passcodes[passcode.toLowerCase().trim()];
    if (role) {
      const expirationTime = new Date().getTime() + 10 * 60 * 1000; // 10 minutes
      localStorage.setItem('auth_expiry', expirationTime.toString());
      localStorage.setItem('auth_role', role);
      loginCallback(role);
    } else {
      setErrorMessage('The passcode you entered is not correct. Please try again.');
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleLoginAttempt();
  };

  const togglePasscodeVisibility = () => {
    setShowPasscode((prev) => !prev);
  };

  return (
    <Background>
      <Card>
        <IconWrapper />
        <Heading>Welcome to our wedding</Heading>
        <Intro>
          To cherish our special day, please enter your passcode from the invitation below.
        </Intro>

        <Form onSubmit={handleSubmit}>
          <div>
            <PasswordFieldWrapper>
              <InputField
                id="passcode-input"
                type={showPasscode ? 'text' : 'password'}
                value={passcode}
                onChange={handlePasscodeChange}
                placeholder="Enter your passcode"
                autoComplete="off"
              />
              <ToggleVisibilityButton
                type="button"
                onClick={togglePasscodeVisibility}
                aria-label={showPasscode ? 'Hide passcode' : 'Show passcode'}
              >
                {showPasscode ? <Eye size={22} strokeWidth={1.75} /> : <EyeOff size={22} strokeWidth={1.75} />}
              </ToggleVisibilityButton>
            </PasswordFieldWrapper>
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
          </div>
          <SubmitButton type="submit">Enter</SubmitButton>
        </Form>
      </Card>
    </Background>
  );
}

export default LoginPage;