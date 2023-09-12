import {
  Button,
  Card,
  Flex,
  FormControl,
  Heading,
  Image,
  Stack,
  Textarea,
  Text,
} from "@chakra-ui/react";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";
import { supabase } from "../../utils/supabase";
import IChat from "../../types/chat";
import { useLoaderData } from "react-router-dom";
import { PostgrestError } from "@supabase/supabase-js";
import MessageContainer from "../../components/MessageContainer";
import chattingImage from "../../assets/images/chatting.svg";

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
          if (payload.eventType === "INSERT") {
            setChats((prevData) => [...prevData, payload.new as IChat]);
          } else if (payload.eventType === "DELETE") {
            const filteredData = chats.filter(
              (chat) => chat.id !== payload.old.id
            );
            setChats(filteredData);
          } else if (payload.eventType === "UPDATE") {
            const updatedChats = [...chats];
            const index = updatedChats.findIndex(
              (item) => item.id === payload.old.id
            );
            if (index !== -1) {
              updatedChats[index] = payload.new as IChat;
              setChats(updatedChats);
            }
          } else {
            return;
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
        <Heading size="lg" textAlign="center">
          Welcome to our chat!
        </Heading>
        <Flex
          marginTop={4}
          direction="column"
          gap={4}
          overflowY="auto"
          ref={ref}
          paddingX={2}
        >
          {chats.length > 0 ? (
            chats.map((chat) => <MessageContainer chat={chat} key={chat.id} />)
          ) : (
            <Stack alignItems="center">
              <Image boxSize="250px" src={chattingImage} alt="" />
              <Text textAlign="center" color="gray.600">
                Welcome to the general chat! It is a place for everyone to
                discuss anything and everything. Please be respectful of other
                members.
              </Text>
            </Stack>
          )}
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
            <Button type="submit" width="100%" colorScheme="facebook">
              Send
            </Button>
          </Flex>
        )}
      </Card>
    </ResponsiveContainer>
  );
}

export default Chat;
