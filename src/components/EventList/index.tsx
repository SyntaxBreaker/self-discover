import { Flex } from "@chakra-ui/react";
import { IEvent } from "../../types/event";
import EventCard from "../EventCard";

interface EventListProps {
  events: IEvent[];
}

function EventList({ events }: EventListProps) {
  return (
    <Flex direction="column" gap={4}>
      {events.map((event) => (
        <EventCard event={event} key={event.id} />
      ))}
    </Flex>
  );
}

export default EventList;
