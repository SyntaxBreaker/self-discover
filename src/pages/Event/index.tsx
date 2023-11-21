import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { IEvent } from "../../types/event";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import Error from "../../components/Error";
import { Alert, Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";
import DOMPurify from "dompurify";
import { supabase } from "../../utils/supabase";
import { useEffect, useState } from "react";

function Event() {
  const { event, error } = useLoaderData() as {
    event: IEvent;
    error: string;
  };
  const [status, setStatus] = useState<null | {
    type: "success" | "error";
    message: string;
  }>(null);

  const { user } = useAuth() as IAuthContext;
  const navigate = useNavigate();

  let redirectTimeout: ReturnType<typeof setTimeout>;

  const removeEvent = async () => {
    const { error } = await supabase.from("events").delete().eq("id", event.id);

    if (error) {
      setStatus({
        type: "error",
        message: error.message,
      });
    } else {
      setStatus({
        type: "success",
        message: "The event was successfully removed",
      });

      redirectTimeout = setTimeout(() => {
        navigate(-1);
      }, 5000);
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(redirectTimeout);
    };
  }, []);

  return (
    <ResponsiveContainer>
      {status && (
        <Alert
          status={status.type}
          marginBottom={2}
          padding={4}
          borderRadius={8}
        >
          {status.message}
        </Alert>
      )}
      {error || !event ? (
        <Error errorMessage="This event doesn't exist" />
      ) : (
        <Box>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
          >
            <Stack direction="row" flexWrap="wrap" gap={1}>
              <Text fontWeight="bold">{event.nickname}</Text>
              <Text>&#183;</Text>
              <Text>
                {event.created_at.split("T")[0].split("-").reverse().join(".")}
              </Text>
            </Stack>
            {user && user.id === event.author_id && (
              <Stack direction="row">
                <Button
                  size="sm"
                  colorScheme="facebook"
                  as={Link}
                  to={`/events/edit/${event.id}`}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  colorScheme="red"
                  variant="outline"
                  onClick={removeEvent}
                >
                  Remove
                </Button>
              </Stack>
            )}
          </Stack>
          <Box marginTop={8}>
            <Heading as="h1" size="xl" color="gray.700">
              {event.title}
            </Heading>
          </Box>
          <Box
            letterSpacing="0.8px"
            marginTop={8}
            className="react-markdown"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(event.description),
            }}
          />
        </Box>
      )}
    </ResponsiveContainer>
  );
}

export default Event;
