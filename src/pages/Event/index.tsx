import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { IEvent } from "../../types/event";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import Error from "../../components/Error";
import { Alert, Box, Flex, Heading, useDisclosure } from "@chakra-ui/react";
import DOMPurify from "dompurify";
import { supabase } from "../../utils/supabase";
import { useEffect, useState } from "react";
import {
  MaterialSymbolsAttachMoney,
  MaterialSymbolsCalendarMonth,
  PhGlobe,
} from "../../components/Icons";
import EventInformationCard from "../../components/EventInformationCard";
import DeletionConfirmation from "../../components/DeletionConfirmation";
import EventHeader from "../../components/EventHeader";

function Event() {
  const { event, error } = useLoaderData() as {
    event: IEvent;
    error: string;
  };
  const [status, setStatus] = useState<null | {
    type: "success" | "error";
    message: string;
  }>(null);

  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const eventDetails = [
    {
      id: 0,
      icon: MaterialSymbolsCalendarMonth,
      text: `${
        event.startDate.toString() === event.endDate.toString()
          ? event.startDate.toString()
          : `${event.startDate.toString()} - ${event.endDate.toString()}`
      }`,
    },
    {
      id: 1,
      icon: MaterialSymbolsAttachMoney,
      text: `${event.price === 0 ? "Free" : event.price}`,
    },
    {
      id: 2,
      icon: PhGlobe,
      text: (
        <Link to={event.websiteUrl} target="_blank">
          {event.websiteUrl.split("https://")[1]}
        </Link>
      ),
    },
  ];

  const handleRemoveEvent = async () => {
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
    }
  };

  useEffect(() => {
    let redirectTimeout: ReturnType<typeof setTimeout>;

    if (status?.type === "success") {
      redirectTimeout = setTimeout(() => {
        navigate(-1);
      }, 5000);
    }

    return () => {
      clearTimeout(redirectTimeout);
    };
  }, [status]);

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
      )}
    </ResponsiveContainer>
  );
}

export default Event;
