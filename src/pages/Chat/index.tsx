import {
  Avatar,
  Button,
  Card,
  Flex,
  FormControl,
  Heading,
  Stack,
  Text,
  Textarea,
} from "@chakra-ui/react";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";
import { supabase } from "../../utils/supabase";
import IChat from "../../types/chat";
import { useLoaderData } from "react-router-dom";
import { PostgrestError } from "@supabase/supabase-js";

function Chat() {
  const { chatCollection } = useLoaderData() as {
    chatCollection: IChat[];
    error: PostgrestError | null;
  };

  const [chats, setChats] = useState<IChat[]>(chatCollection);
  const [message, setMessage] = useState("");

  const ref = useRef<HTMLDivElement | null>(null);
  const { user } = useAuth() as IAuthContext;

  const scrollToLastElement = () => {
    ref.current?.lastElementChild?.scrollIntoView(true);
  };
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const { error } = await supabase.from("chats").insert({
      user_id: user.id,
      avatar_url: user.user_metadata.avatar_url ?? "https://bit.ly/broken-link",
      username: user.user_metadata.username ?? user.email?.split("@")[0],
      message: message,
    });

    if (!error) {
      setMessage("");
    }
  };

  useEffect(() => {
    const subscription = supabase
      .channel("any")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "chats" },
        (payload) => {
          if (payload.new) {
            setChats((prevData) => [...prevData, payload.new as IChat]);
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    chats && chats.length >= 0 && scrollToLastElement();
  }, [chats]);

  return (
    <ResponsiveContainer>
      <Card padding={4} maxHeight="800px">
        <Heading size="lg">Welcome to our chat!</Heading>
        <Flex
          marginTop={4}
          direction="column"
          gap={4}
          overflowY="auto"
          ref={ref}
          paddingX={2}
        >
          {chats?.map((chat) => (
            <Stack
              key={chat.id}
              direction={user?.id === chat.user_id ? "row-reverse" : "row"}
            >
              <Avatar src={chat.avatar_url} />
              <Stack
                direction="column"
                width="75%"
                padding={4}
                backgroundColor={
                  user?.id === chat.user_id ? "blue.200" : "gray.100"
                }
                borderRadius={4}
              >
                <Text>{chat.message}</Text>
                <Text alignSelf="self-end">
                  {chat.created_at.split("T")[0].split("-").reverse().join(".")}
                </Text>
              </Stack>
            </Stack>
          ))}
        </Flex>
        {user?.email && (
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
                required
              />
            </FormControl>
            <Button type="submit" width="100%" colorScheme="blue">
              Send
            </Button>
          </Flex>
        )}
      </Card>
    </ResponsiveContainer>
  );
}

export default Chat;
