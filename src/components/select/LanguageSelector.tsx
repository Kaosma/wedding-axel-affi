import i18n from "../../i18n";
import styled from "styled-components";

const LanguageHeader = styled.div<{ $textColor: string }>`
  display: flex;
  align-items: center;
  gap: 1em;
  background-color: transparent;
  justify-content: flex-end;
  width: 100%;

  color: ${({ $textColor }) => $textColor};
`;
const LanguageButton = styled.button`
  background-color: transparent;
  border: none;
  padding: 0 0.5em;
  cursor: pointer;
  color: inherit;
  outline: none;

  &:focus-visible {
    outline: none;
  }

  &:focus {
    outline: none;
  }

  &:hover {
    text-decoration: underline;
    text-underline-offset: 0.2em;
    text-decoration-thickness: 1px;
    text-decoration-style: solid;
    text-decoration-skip-ink: none;
    text-decoration-skip: none;
    text-decoration-skip-ink: none;
  }
`;

export default function LanguageSelector({ color }: { color: string }) {
  return (
    <LanguageHeader $textColor={color}>
      <LanguageButton onClick={() => i18n.changeLanguage("sv")}>🇸🇪 Svenska</LanguageButton>
      <LanguageButton onClick={() => i18n.changeLanguage("es")}>🇪🇸 Español</LanguageButton>
      <LanguageButton onClick={() => i18n.changeLanguage("en")}>🇬🇧 English</LanguageButton>
    </LanguageHeader>
  );
}