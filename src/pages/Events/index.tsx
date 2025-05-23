import { Link, useLoaderData } from "react-router-dom";
import { IEvent } from "../../types/event";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import { Button, Flex, Heading } from "@chakra-ui/react";
import Error from "../../components/Error";
import EventList from "../../components/EventList";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";
import EmptyEventList from "../../components/EmptyEventList";

function Events() {
  const { events, error } = useLoaderData() as {
    events: IEvent[];
    error: string;
  };

  const { user } = useAuth() as IAuthContext;

  return (
    <ResponsiveContainer>
      {error || !events ? (
        <Error errorMessage="There are no events." />
      ) : events.length === 0 ? (
        <EmptyEventList />
      ) : (
        <Flex flexDirection="column" gap={8}>
          <Flex justifyContent={user ? "space-between" : "center"} alignItems="center">
            <Heading as="h1" size="lg" color="gray.700">
              All Events
            </Heading>
            {user && (
              <Button size="md" colorScheme="blue" as={Link} to={`create`}>
                Create Event
              </Button>
            )}
          </Flex>
          <EventList events={events} />
        </Flex>
      )}
    </ResponsiveContainer>
  );
}

export default Events;
