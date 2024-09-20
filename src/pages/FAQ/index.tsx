import { Heading } from "@chakra-ui/react";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import { useLoaderData } from "react-router-dom";
import Error from "../../components/Error";
import FAQAccordion from "../../components/FAQAccordion";

function FAQ() {
  const { faqList, error } = useLoaderData() as {
    faqList: IFaqItem[];
    error: string;
  };

  return (
    <ResponsiveContainer>
      {error ? (
        <Error errorMessage="Unable to load FAQ." />
      ) : (
        <>
          <Heading as="h1" size="lg" textAlign="center" color="gray.700">
            Frequently Asked Questions
          </Heading>
          <FAQAccordion faqList={faqList} />
        </>
      )}
    </ResponsiveContainer>
  );
}

export default FAQ;
