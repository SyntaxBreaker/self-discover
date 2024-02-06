import { Alert, AlertIcon, Heading } from "@chakra-ui/react";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import EventForm from "../../components/EventForm";
import { useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase";
import { IFormData } from "../../types/event";
import { addDays } from "date-fns";
import validateEventURL from "../../utils/eventURLValidator";
import {
  EVENT_DESCRIPTION_REQUIRED,
  EVENT_INVALID_URL,
} from "../../utils/constants";

function CreateEvent() {
  const [error, setError] = useState<string | null>(null);

  const { user } = useAuth() as IAuthContext;
  const navigate = useNavigate();

  const handleSubmit = async (
    formData: IFormData,
    event: React.SyntheticEvent
  ) => {
    try {
      event.preventDefault();

      const { title, description, price, startDate, endDate, websiteUrl } =
        formData;

      const eventURLValidationResult = validateEventURL(websiteUrl);
      if (!eventURLValidationResult.isValid) {
        throw new Error(eventURLValidationResult.message);
      } else if (description.length === 0) {
        throw new Error(EVENT_DESCRIPTION_REQUIRED);
      }

      const { error } = await supabase.from("events").insert({
        title: title,
        description: description,
        price: price,
        startDate: addDays(startDate, 1).toISOString().slice(0, 10),
        endDate: addDays(endDate, 1).toISOString().slice(0, 10),
        websiteUrl: websiteUrl,
        author_id: user.id,
        nickname: user.user_metadata.username ?? user.email?.split("@")[0],
      });

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
        Create a new event
      </Heading>
      {error &&
        error !== EVENT_DESCRIPTION_REQUIRED &&
        error !== EVENT_INVALID_URL && (
          <Alert status="error" padding={4} borderTopRadius={8} marginTop={8}>
            <AlertIcon />
            {error}
          </Alert>
        )}
      <EventForm error={error} handleSubmit={handleSubmit} />
    </ResponsiveContainer>
  );
}

export default CreateEvent;
