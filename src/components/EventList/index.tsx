import { Flex } from "@chakra-ui/react";
import { IEvent } from "../../types/event";
import EventCard from "../EventCard";

function EventList({ events }: { events: IEvent[] }) {
  return (
    <Flex direction="column" gap={4}>
      {events.map((event) => (
        <EventCard event={event} key={event.id} />
      ))}
    </Flex>
  );
}

export default EventList;
