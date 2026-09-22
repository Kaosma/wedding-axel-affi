import styled from 'styled-components';
import { useTheme } from '../../app/AppStyling';

const PrimaryButton = styled.button<{
  disabled?: boolean;
  rounded?: boolean;
  width?: number;
  margin?: boolean;
  height?: number;
  gap?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ gap }) => (gap ? `${gap}em` : '0em')};
  background-color: ${() => useTheme().colors.red.secondary};
  color: ${() => useTheme().colors.mix.lightest};
  width: ${({ width }) => (width ? `${width}em` : '11em')};
  height: ${({ height }) => (height ? `${height}em` : '3em')};
  font-weight: bold;
  line-height: 3em;
  margin: ${({ margin }) => (margin ? '1em' : '0')};
  border-radius: ${({ rounded }) => (rounded ? '2em' : '0.5em')};
  cursor: pointer;
  border: none;
  pointer-events: ${({ disabled }) => (disabled ? 'none' : 'auto')};
  opacity: ${({ disabled }) => (disabled ? '0.65' : '1')};
  filter: ${({ disabled }) => (disabled ? 'alpha(opacity=65)' : 'none')};
  border: 1px solid transparent;
  :hover {
    border: 1px solid ${() => useTheme().colors.red.primary};
  }
  &:focus-visible {
    outline: none;
  }

  &:focus {
    outline: none;
  }
`;

export default PrimaryButton;