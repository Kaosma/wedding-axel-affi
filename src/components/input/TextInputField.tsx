import TextField from '@mui/material/TextField';
import { useState } from 'react';
import styled from 'styled-components';

const OuterContainer = styled.div<{ height?: number }>`
  height: ${({ height }) => (height ? `${height}px` : '90px')};
  display: flex;
  align-items: center;
  justify-content: center;
`;

interface TextInputFieldProps {
  label: string;
  filled: boolean;
  search?: boolean;
  multiline?: boolean;
  rows?: number;
  error?: boolean;
  helper?: string;
  value: string;
  width?: number;
  disabled?: boolean;
  containerHeight?: number;
  onChangeCallback: (textInput: string) => void;
}

function TextInputField({
  label,
  filled,
  search = false,
  multiline = false,
  rows = 1,
  error = false,
  value,
  helper = '',
  width = 18,
  disabled = false,
  containerHeight = 90,
  onChangeCallback,
}: TextInputFieldProps) {
  const [focused, setFocused] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  return (
    <OuterContainer height={containerHeight}>
      <TextField
        disabled={disabled}
        type={search ? 'search' : 'text'}
        id="textfield-basic"
        style={{ margin: '1em', width: `${width}em` }}
        label={label}
        error={error && !focused}
        variant={filled ? 'filled' : undefined}
        multiline={multiline}
        rows={rows}
        value={value}
        helperText={error && !focused ? helper : ''}
        onChange={(e) => onChangeCallback(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
      />
    </OuterContainer>
  );
}

export default TextInputField;