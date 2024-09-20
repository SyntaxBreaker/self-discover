import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";

interface FAQAccordionProps {
  faqList: IFaqItem[];
}

function FAQAccordion({ faqList }: FAQAccordionProps) {
  return (
    <Accordion
      allowMultiple
      marginTop={8}
      border="1px solid #E2E8F0"
      borderRadius="md"
    >
      {faqList.map((faq) => (
        <AccordionItem
          paddingY={2}
          key={faq.id}
          border="none"
          borderBottom="1px solid #E2E8F0"
        >
          <Heading as="h2" size="4xl">
            <AccordionButton>
              <Box as="span" flex="1" textAlign="left">
                {faq.question}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </Heading>
          <AccordionPanel pb={4}>
            <Text fontSize="sm" color="gray.600">
              {faq.answer}
            </Text>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

export default FAQAccordion;
