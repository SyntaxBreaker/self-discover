import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import ReactQuill from "react-quill";
import { quillToolbarConfig } from "../../utils/quillConfig";
import { PostgrestError } from "@supabase/supabase-js";
import { IEvent, IFormData } from "../../types/event";
import IDate from "../../types/date";

interface IProps {
  event?: IEvent;
  error: PostgrestError | null;
  handleSubmit: (
    formData: IFormData,
    event: React.SyntheticEvent
  ) => Promise<void>;
}

function EventForm({ event, error, handleSubmit }: IProps) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: 0,
    websiteUrl: "",
  });
  const [date, setDate] = useState<IDate>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  useEffect(() => {
    if (event) {
      const { title, description, price, websiteUrl, startDate, endDate } =
        event;

      setFormData({
        title: title,
        description: description,
        price: price,
        websiteUrl: websiteUrl,
      });

      setDate((prev) => ({
        ...prev,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      }));
    }
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSelect = (ranges: any) => {
    const { selection } = ranges;

    setDate((prev) => ({
      ...prev,
      startDate: selection.startDate,
      endDate: selection.endDate,
    }));
  };

  return (
    <Flex
      as="form"
      onSubmit={(e: React.SyntheticEvent) =>
        handleSubmit({ ...formData, ...date }, e)
      }
      direction="column"
      gap={4}
      bgColor="white"
      padding={8}
      borderBottomRadius={8}
      borderRadius={error ? 0 : 8}
      marginTop={error ? 0 : 8}
    >
      <FormControl position="static">
        <FormLabel>Event title</FormLabel>
        <Input
          type="text"
          value={formData.title}
          name="title"
          onChange={handleChange}
          required
          position="static"
        />
      </FormControl>
      <FormControl position="static">
        <FormLabel>Event description</FormLabel>
        <ReactQuill
          theme="snow"
          value={formData.description}
          onChange={(newContent) =>
            setFormData((prev) => ({ ...prev, description: newContent }))
          }
          modules={quillToolbarConfig}
        />
      </FormControl>
      <FormControl position="static">
        <FormLabel>Event URL</FormLabel>
        <Input
          type="url"
          value={formData.websiteUrl}
          name="websiteUrl"
          onChange={handleChange}
          required
          position="static"
        />
      </FormControl>
      <FormControl>
        <FormLabel>Event date</FormLabel>
        <DateRangePicker
          ranges={[date]}
          onChange={handleSelect}
          minDate={new Date()}
        />
      </FormControl>
      <FormControl position="static">
        <FormLabel>Ticket price</FormLabel>
        <InputGroup>
          <InputLeftAddon children="$" />
          <Input
            type="number"
            value={formData.price}
            name="price"
            onChange={handleChange}
            required
            position="static"
          />
        </InputGroup>
      </FormControl>
      <Button
        width="100%"
        type="submit"
        position="static"
        colorScheme="facebook"
      >
        Submit
      </Button>
    </Flex>
  );
}

export default EventForm;
