import * as AccordionPrimitive from "@radix-ui/react-accordion";
import styled, { keyframes } from "styled-components";
import { ChevronDown } from "lucide-react";
import { useTranslation } from 'react-i18next';

const slideDown = keyframes`
  from { height: 0; opacity: 0; }
  to { height: var(--radix-accordion-content-height); opacity: 1; }
`;
const slideUp = keyframes`
  from { height: var(--radix-accordion-content-height); opacity: 1; }
  to { height: 0; opacity: 0; }
`;
const Accordion = styled(AccordionPrimitive.Root)`
  width: 100%;
  max-width: 600px; /* lock width */
`;
const AccordionItem = styled(AccordionPrimitive.Item)`
  border-bottom: 1px solid #e5e5e5;
  width: 100%;
`;
const AccordionTrigger = styled(AccordionPrimitive.Trigger)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 1rem;
  font-weight: 500;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #E17256;
  box-sizing: border-box;
  margin-top: 1em;
  text-align: left;

  outline: none;
  &:focus {
    outline: none;
    box-shadow: none;
  }

  svg {
    flex-shrink: 0;
    transition: transform 0.2s ease;
  }

  &[data-state="open"] svg {
    transform: rotate(180deg);
  }
`;
const AccordionContent = styled(AccordionPrimitive.Content)`
  overflow: hidden;
  font-size: 0.875rem;
  color: #555;
  text-align: left;
  padding: 0 1rem;
  box-sizing: border-box;

  &[data-state="open"] {
    animation: ${slideDown} 0.3s ease-out forwards;
  }
  &[data-state="closed"] {
    animation: ${slideUp} 0.3s ease-in forwards;
  }
`;

type QuestionAccordionProps = {
  faqObject: { questionKey: string; answerKey: string };
  itemNumber: string;
};

export function QuestionAccordion({ faqObject, itemNumber }: QuestionAccordionProps) {
  const { t } = useTranslation();
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value={itemNumber}>
        <AccordionTrigger>
          {t(faqObject.questionKey)}
          <ChevronDown size={16} />
        </AccordionTrigger>
        <AccordionContent>{t(faqObject.answerKey)}</AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}