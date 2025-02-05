import { useEffect, useState } from "react";
import { Alert, AlertIcon, Heading } from "@chakra-ui/react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { IEvent, IFormData } from "../../types/event";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import EventForm from "../../components/EventForm";
import { supabase } from "../../utils/supabase";
import { addDays } from "date-fns";
import validateEventURL from "../../utils/eventURLValidator";
import {
  EVENT_DESCRIPTION_REQUIRED,
  EVENT_INVALID_URL,
} from "../../utils/constants";

function EditEvent() {
  const [error, setError] = useState<string | null>(null);

  const { event, error: loadingError } = useLoaderData() as {
    event: IEvent;
    error: string;
  };
  const { user } = useAuth() as IAuthContext;
  const navigate = useNavigate();
  const { Id } = useParams();

  useEffect(() => {
    if (!event || user.id !== event.author_id) {
      navigate("/");
    }
  }, []);

  const handleSubmit = async (formData: IFormData, e: React.SyntheticEvent) => {
    try {
      e.preventDefault();

      const { title, description, price, startDate, endDate, websiteUrl } =
        formData;

      const eventURLValidationResult = validateEventURL(websiteUrl);
      if (!eventURLValidationResult.isValid) {
        throw new Error(eventURLValidationResult.message);
      } else if (description.match(/^(<p><br><\/p>)*$/)) {
        throw new Error(EVENT_DESCRIPTION_REQUIRED);
      }

      const { error } = await supabase
        .from("events")
        .update({
          title: title,
          description: description,
          price: price,
          startDate: addDays(startDate, 1).toISOString().slice(0, 10),
          endDate: addDays(endDate, 1).toISOString().slice(0, 10),
          websiteUrl: websiteUrl,
        })
        .eq("id", Id);

      if (error) {
        throw new Error(error.message);
      } else {
        navigate(-1);
      }
    } catch (err) {
      if (typeof err === "string") {
        setError(err);
      } else if (err instanceof Error) {
        setError(err.message);
      }
    }
  };

  return (
    <ResponsiveContainer>
      <Heading as="h1" size="lg" textAlign="center" color="gray.700">
        Edit the event
      </Heading>
      {error &&
        error !== EVENT_DESCRIPTION_REQUIRED &&
        error !== EVENT_INVALID_URL && (
          <Alert status="error" borderTopRadius={8} marginTop={8}>
            <AlertIcon /> {error}
          </Alert>
        )}
      {loadingError && (
        <Alert status="error" borderTopRadius={8} marginTop={8}>
          <AlertIcon /> {loadingError}
        </Alert>
      )}
      <EventForm event={event} error={error} handleSubmit={handleSubmit} />
    </ResponsiveContainer>
  );
}

export default EditEvent;
