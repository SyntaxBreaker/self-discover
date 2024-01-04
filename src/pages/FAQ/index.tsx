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
import ResponsiveContainer from "../../components/ResponsiveContainer";

interface IFaqList {
  id: number;
  question: string;
  answer: string;
}

const faqList: IFaqList[] = [
  {
    id: 0,
    question: "What is the purpose of this web application?",
    answer:
      "The purpose of this application is to support users in their self-development process by providing them with tools and resources that allow them to gain new knowledge, meet supportive people, and develop positive habits.",
  },
  {
    id: 1,
    question: "How can I publish an article?",
    answer:
      'To publish an article, log in to your account and click the "Create Article" button. Fill out the required fields, including the title, content, and relevant tags, and then click "Submit"',
  },
  {
    id: 2,
    question: "What types of articles are allowed?",
    answer:
      "We welcome articles about self-development, personal growth, motivation, and similar topics. However, we do not allow content that promotes hate speech, discrimination, etc.",
  },
  {
    id: 3,
    question: "Can I edit or delete my published articles?",
    answer:
      "Yes, you can edit or delete your articles. Log in to your account, go to the article you want to edit or delete, and click the edit or remove button.",
  },
  {
    id: 4,
    question: "Can I include links in my article?",
    answer:
      "Yes, you can include relevant links in your articles, but they should be about the topic and provide additional value to readers. Avoid excessive self-promotion or spammy links.",
  },
  {
    id: 5,
    question: "Is there a way to filter articles by specific tags?",
    answer:
      "Absolutely! Navigate to the Tag List section and select the tag you are interested in. It will show you a list of all articles specifically related to that tag.",
  },
  {
    id: 6,
    question: "Is there a mobile app for this platform?",
    answer:
      "Currently, we offer a responsive website that is optimized for mobile devices. You can access our platform through your web browser on both mobile and desktop devices.",
  },
];

function FAQ() {
  return (
    <ResponsiveContainer>
      <Heading as="h1" size="lg" textAlign="center" color="gray.700">
        Frequently Asked Questions
      </Heading>
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
    </ResponsiveContainer>
  );
}

export default FAQ;
