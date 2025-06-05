import {
  Button,
  Container,
  Group,
  Image,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { Link } from "@tanstack/react-router";

export function ReadBookLanding() {
  return (
    <Container size="lg">
      <Group align="center" justify="apart" wrap="wrap-reverse">
        <Stack maw={500}>
          <Title order={1} size="3rem" fw={800}>
            Welcome to ReadBook
            <img
              src="./favicon.ico"
              alt="Butterfly"
              className="inline-block ml-2"
            />
          </Title>
          <Text size="lg">
            📚 The world's largest open-source open-data library.
            <br />
            🤩 35+ million books free to download.
          </Text>
          {/*@ts-expect-error this is fine*/}
          <Link to="/search" tabIndex={-1} ref={(ele) => ele?.scrollIntoView()}>
            <Button size="md" radius="xl" color="indigo">
              Start Reading
            </Button>
          </Link>
        </Stack>

        <Image
          src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0"
          alt="Butterfly"
          w={300}
          h="auto"
          className="h-auto"
          radius="md"
          fit="contain"
        />
      </Group>
    </Container>
  );
}
