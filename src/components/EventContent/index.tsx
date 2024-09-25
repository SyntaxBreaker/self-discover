import { Box, Flex, Heading } from "@chakra-ui/react";
import EventHeader from "../EventHeader";
import EventInformationCard from "../EventInformationCard";
import DOMPurify from "dompurify";
import DeletionConfirmation from "../DeletionConfirmation";
import { IEvent } from "../../types/event";

interface EventContentProps {
  event: IEvent;
  onOpen: () => void;
  eventDetails: (
    | {
        id: number;
        icon: () => JSX.Element;
        text: string;
      }
    | {
        id: number;
        icon: () => JSX.Element;
        text: JSX.Element;
      }
  )[];
  isOpen: boolean;
  onClose: () => void;
  handleRemoveEvent: () => Promise<void>;
}

function EventContent({
  event,
  onOpen,
  eventDetails,
  isOpen,
  onClose,
  handleRemoveEvent,
}: EventContentProps) {
  return (
    <Box>
      <EventHeader event={event} onOpen={onOpen} />
      <Box marginTop={8}>
        <Heading as="h1" size="xl" color="gray.700">
          {event.title}
        </Heading>
      </Box>
      <Flex marginTop={8} gap={4} flexWrap="wrap">
        {eventDetails.map((eventDetail) => (
          <EventInformationCard
            key={eventDetail.id}
            icon={eventDetail.icon}
            text={eventDetail.text}
          />
        ))}
      </Flex>
      <Box
        letterSpacing="0.8px"
        marginTop={8}
        className="react-markdown"
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(event.description),
        }}
      />
      <DeletionConfirmation
        isOpen={isOpen}
        onClose={onClose}
        handleRemove={handleRemoveEvent}
      />
    </Box>
  );
}

export default EventContent;
