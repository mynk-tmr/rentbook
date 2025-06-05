import { Badge, Button, Card, Group, Text } from "@mantine/core";
import type { QueryLibgenReturn } from "~/server/utils/libgen-next";

function defaultText(str: string) {
  return str || "N/A";
}

export function BookCard(props: QueryLibgenReturn) {
  return (
    <Card shadow="md" padding="lg" radius="md" withBorder>
      <article className="grid h-full place-content-between justify-stretch">
        <Text fw={700} size="md" className="overflow-x-hidden mb-2">
          {defaultText(props.title)}
        </Text>
        <Text c="dimmed">{defaultText(props.author)}</Text>

        <Group mt="xs" className="uppercase">
          <Badge color="blue" variant="light">
            {defaultText(props.year)}
          </Badge>
          <Badge color="teal" variant="light">
            {defaultText(props.extension)}
          </Badge>
          <Badge color="gray" variant="light">
            {defaultText(props.size)}
          </Badge>
        </Group>

        <Text size="sm" mt="sm" className="font-semibold">
          Publisher:{" "}
          <span className="text-sky-800">{defaultText(props.publisher)}</span>
          <br />
          Pages:{" "}
          <b className="text-shadow-stone-600">{defaultText(props.pages)}</b>
          <br />
          ISBN:{" "}
          <code className="bg-gray-100">
            {defaultText(props.isbn.replace(/[,;].*/, ""))}
          </code>
        </Text>
        <br />

        <div className="space-y-2">
          <Button
            fullWidth
            variant="gradient"
            gradient={{ from: "indigo", to: "cyan" }}
            component="a"
            href={props.dlink}
            target="_blank"
          >
            Download
          </Button>
          <Button
            fullWidth
            variant="outline"
            component="a"
            href={
              "https://search.worldcat.org/search?qt=worldcat_org_bks&q=" +
              props.title
            }
            target="_blank"
          >
            See in World Catalogue
          </Button>
        </div>
      </article>
    </Card>
  );
}
