import { Button, Card, Flex, Heading, Box } from "@chakra-ui/react";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";
import { supabase } from "../../utils/supabase";
import IChat from "../../types/chat";
import { Link, useLoaderData } from "react-router-dom";
import { PostgrestError } from "@supabase/supabase-js";
import MessageContainer from "../../components/MessageContainer";
import ChatForm from "../../components/ChatForm";
import EmptyChat from "../../components/EmptyChat";

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
          setChats((prevData) => {
            if (payload.eventType === "INSERT") {
              return [...prevData, payload.new as IChat];
            } else if (payload.eventType === "DELETE") {
              return prevData.filter((chat) => chat.id !== payload.old.id);
            } else if (payload.eventType === "UPDATE") {
              return prevData.map((item) =>
                item.id === payload.old.id ? (payload.new as IChat) : item
              );
            } else {
              return prevData;
            }
          });
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
        <Heading as="h1" size="lg" textAlign="center" color="gray.700">
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
          {chats && chats.length > 0 ? (
            chats.map((chat) => <MessageContainer chat={chat} key={chat.id} />)
          ) : (
            <EmptyChat />
          )}
        </Flex>
        {user?.email ? (
          <ChatForm
            message={message}
            setMessage={setMessage}
            handleSubmit={handleSubmit}
          />
        ) : (
          <Link to="/signIn">
            <Box as={Button} colorScheme="facebook" marginTop={4} width="100%">
              Sign in
            </Box>
          </Link>
        )}
      </Card>
    </ResponsiveContainer>
  );
}

export default Chat;
