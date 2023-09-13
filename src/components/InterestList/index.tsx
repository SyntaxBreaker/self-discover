import { Stack, Tag } from "@chakra-ui/react";

function InterestList({ interests }: { interests: string[] }) {
  return (
    <Stack direction="row" marginTop={4} flexWrap="wrap">
      {interests.map((interest: string) => (
        <Tag colorScheme="blue" padding={1} key={interest}>
          {interest}
        </Tag>
      ))}
    </Stack>
  );
}

export default InterestList;
