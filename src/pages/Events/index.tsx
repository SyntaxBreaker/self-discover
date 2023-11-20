import { Link, useLoaderData } from "react-router-dom";
import { IEvent } from "../../types/event";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import { Button, Flex, Heading } from "@chakra-ui/react";
import Error from "../../components/Error";
import EventList from "../../components/EventList";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";

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
      ) : (
        <Flex flexDirection="column" gap={8}>
          <Flex justifyContent="space-between" alignItems="center">
            <Heading as="h1" size="lg" textAlign="center" color="gray.700">
              All Events
            </Heading>
            {user && <Button size="md" colorScheme="facebook" as={Link} to={`create`}>
              Create
            </Button>}
          </Flex>
          <EventList events={events} />
        </Flex>
      )}
    </ResponsiveContainer>
  );
}

export default Events;
