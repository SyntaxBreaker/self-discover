import {
  Box,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { IEvent } from "../../types/event";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";

function EventCard({ event }: { event: IEvent }) {
  return (
    <Link to={`${event.id}`}>
      <Card size="sm" _hover={{ transform: "scale(1.01)" }}>
        <CardHeader>
          <Heading as="h2" size="sm" color="gray.700">
            {event.title}
          </Heading>
        </CardHeader>
        <CardBody>
          <Box
            letterSpacing="0.8px"
            className="react-markdown"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(event.description),
            }}
            style={{
              overflow: "hidden",
              display: "-webkit-box",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical",
              fontSize: "12px",
            }}
          />
        </CardBody>
        <CardFooter>
          <Flex gap={8}>
            <Flex direction="column" gap={1}>
              <Text fontSize="xs">Start time</Text>
              <Text fontSize="xs" fontWeight="bold">
                {event.startDate.toString()}
              </Text>
            </Flex>
            <Flex direction="column" gap={1}>
              <Text fontSize="xs">End time</Text>
              <Text fontSize="xs" fontWeight="bold">
                {event.endDate.toString()}
              </Text>
            </Flex>
            <Flex direction="column" gap={1}>
              <Text fontSize="xs">Ticket price</Text>
              <Text fontSize="xs" fontWeight="bold">
                {event.price > 0 ? `$${event.price}` : "Free"}
              </Text>
            </Flex>
          </Flex>
        </CardFooter>
      </Card>
    </Link>
  );
}

export default EventCard;
