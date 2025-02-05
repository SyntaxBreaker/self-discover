import { Flex, Icon, Text } from "@chakra-ui/react";

interface EventInformationCardProps {
  icon: () => JSX.Element;
  text: string | JSX.Element;
}

function EventInformationCard({ icon, text }: EventInformationCardProps) {
  return (
    <Flex
      flexDirection="column"
      gap={4}
      padding={4}
      backgroundColor="white"
      borderRadius="md"
      boxShadow="xs"
      flexBasis={{ base: "100%", md: "calc(33.3% - 11px)" }}
    >
      <Icon as={icon} />
      <Text>{text}</Text>
    </Flex>
  );
}

export default EventInformationCard;
