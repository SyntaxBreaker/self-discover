import { Stack, Image, Text } from "@chakra-ui/react";
import chattingImage from "../../assets/images/chatting.svg";

function EmptyChat() {
  return (
    <Stack alignItems="center" gap={2}>
      <Image boxSize="320px" src={chattingImage} alt="" />
      <Text fontSize="sm" color="gray.600" maxWidth={480}>
        Welcome to the general chat! It is a place for everyone to discuss
        anything and everything. Please be respectful of other members.
      </Text>
    </Stack>
  );
}

export default EmptyChat;
