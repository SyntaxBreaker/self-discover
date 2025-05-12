import { Button, Flex, FormControl, Textarea } from "@chakra-ui/react";

interface ChatFormProps {
  message: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (event: React.SyntheticEvent) => Promise<void>;
}

function ChatForm({ message, setMessage, handleSubmit }: ChatFormProps) {
  return (
    <Flex
      as="form"
      onSubmit={handleSubmit}
      marginTop={4}
      direction="column"
      alignItems="center"
      position="sticky"
      bottom={0}
      backgroundColor="white"
      paddingY={2}
      gap={2}
    >
      <FormControl>
        <Textarea
          name="message"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Type your message here..."
          padding={2}
          size="sm"
          required
        />
      </FormControl>
      <Button type="submit" width="100%" colorScheme="blue">
        Send
      </Button>
    </Flex>
  );
}

export default ChatForm;
