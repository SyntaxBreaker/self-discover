import { Button, Stack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";
import { IEvent } from "../../types/event";

interface EventHeaderProps {
  event: IEvent;
  onOpen: () => void;
}

function EventHeader({ event, onOpen }: EventHeaderProps) {
  const { user } = useAuth() as IAuthContext;

  return (
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
            colorScheme="blue"
            as={Link}
            to={`/events/edit/${event.id}`}
          >
            Edit
          </Button>
          <Button
            size="sm"
            colorScheme="red"
            variant="outline"
            onClick={onOpen}
          >
            Remove
          </Button>
        </Stack>
      )}
    </Stack>
  );
}

export default EventHeader;
