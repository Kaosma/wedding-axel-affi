import styled, { keyframes } from 'styled-components';
import { CheckCircle, X } from 'lucide-react';
import { useTheme } from '../../app/AppStyling';

const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

const ToastContainer = styled.div<{ $isVisible: boolean; $isExiting: boolean }>`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10000;
  background: white;
  border-radius: 12px;
  padding: 1rem 1.5rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 280px;
  max-width: 90vw;
  animation: ${props => props.$isExiting ? slideOut : slideIn} 0.3s ease-out;
  opacity: ${props => props.$isVisible ? 1 : 0};
  pointer-events: ${props => props.$isVisible ? 'auto' : 'none'};

  @media (max-width: 768px) {
    top: 10px;
    left: 10px;
    right: 10px;
    transform: none;
    min-width: auto;
    max-width: none;
  }
`;

const IconWrapper = styled.div`
  color: ${() => useTheme().colors.success.iconDetails};
  flex-shrink: 0;
`;

const Content = styled.div`
  flex: 1;
  color: ${() => useTheme().colors.olive.darker};
  font-weight: 500;
  font-size: 0.95rem;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: ${() => useTheme().colors.olive.darker};
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.6;
  transition: opacity 0.2s ease;

  &:hover {
    opacity: 1;
  }
  &:focus-visible {
    outline: none;
  }
  &:focus {
    outline: none;
  }
`;

interface ToastProps {
  message: string;
  isVisible: boolean;
  isExiting: boolean;
  onClose: () => void;
}

function Toast({ message, isVisible, isExiting, onClose }: ToastProps) {
  return (
    <ToastContainer $isVisible={isVisible} $isExiting={isExiting}>
      <IconWrapper>
        <CheckCircle size={20} />
      </IconWrapper>
      <Content>{message}</Content>
      <CloseButton onClick={onClose}>
        <X size={16} />
      </CloseButton>
    </ToastContainer>
  );
}

export default Toast;
