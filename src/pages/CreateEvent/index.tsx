import { Alert, AlertIcon, Heading } from "@chakra-ui/react";
import ResponsiveContainer from "../../components/ResponsiveContainer";
import EventForm from "../../components/EventForm";
import { useState } from "react";
import { PostgrestError } from "@supabase/supabase-js";
import { useAuth } from "../../context/AuthProvider";
import { IAuthContext } from "../../types/auth";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase";
import { IFormData } from "../../types/event";

function CreateEvent() {
  const [error, setError] = useState<PostgrestError | null>(null);

  const { user } = useAuth() as IAuthContext;
  const navigate = useNavigate();

  const handleSubmit = async (
    formData: IFormData,
    event: React.SyntheticEvent
  ) => {
    event.preventDefault();
    const { title, description, price, startDate, endDate } = formData;

    const { error } = await supabase.from("events").insert({
      title: title,
      description: description,
      price: price,
      startDate: startDate,
      endDate: endDate,
      author_id: user.id,
      nickname: user.user_metadata.username ?? user.email?.split("@")[0],
    });

    if (error) {
      setError(error);
    } else {
      navigate(-1);
    }
  };

  return (
    <ResponsiveContainer>
      <Heading as="h1" size="lg" textAlign="center" color="gray.700">
        Create a new event
      </Heading>
      {error && (
        <Alert status="error" padding={4} borderTopRadius={8} marginTop={8}>
          <AlertIcon />
          {error.message}
        </Alert>
      )}
      <EventForm error={error} handleSubmit={handleSubmit} />
    </ResponsiveContainer>
  );
}

export default CreateEvent;
