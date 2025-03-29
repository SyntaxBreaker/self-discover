import { Link, useLoaderData, useNavigate } from "react-router-dom";
import { IEvent } from "../../types/event";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import Error from "../../components/Error";
import { Alert, useDisclosure } from "@chakra-ui/react";
import { supabase } from "../../utils/supabase";
import { useEffect, useState } from "react";
import { MoneyIcon, MonthsIcon, WorldIcon } from "../../components/Icons";
import EventContent from "../../components/EventContent";

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
      icon: MonthsIcon,
      text: `${
        event.startDate.toString() === event.endDate.toString()
          ? event.startDate.toString()
          : `${event.startDate.toString()} - ${event.endDate.toString()}`
      }`,
    },
    {
      id: 1,
      icon: MoneyIcon,
      text: `${event.price === 0 ? "Free" : event.price}`,
    },
    {
      id: 2,
      icon: WorldIcon,
      text: (
        <Link
          to={event.websiteUrl}
          target="_blank"
          style={{ textDecoration: "underline" }}
        >
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
        <EventContent
          event={event}
          onOpen={onOpen}
          eventDetails={eventDetails}
          isOpen={isOpen}
          onClose={onClose}
          handleRemoveEvent={handleRemoveEvent}
        />
      )}
    </ResponsiveContainer>
  );
}

export default Event;
