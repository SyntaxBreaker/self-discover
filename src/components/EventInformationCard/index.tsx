import { Flex, Icon, Text } from "@chakra-ui/react";

interface IProps {
  icon: () => JSX.Element;
  text: string | JSX.Element;
}

function EventInformationCard({ icon, text }: IProps) {
  return (
    <Flex
      flexDirection="column"
      gap={4}
      padding={4}
      backgroundColor="white"
      borderRadius="md"
      boxShadow="xs"
      width={{ base: "100%", md: "32%" }}
    >
      <Icon as={icon} />
      <Text>{text}</Text>
    </Flex>
  );
}

export default EventInformationCard;
