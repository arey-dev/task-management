import { Flex } from "./Flex";
import { Button } from "./ui";

export function CallToAction() {
  return (
    <Flex center className="flex-col gap-8">
      <h2 className="text-heading-lg text-on-background">
        This board is empty. Create a new column to get started
      </h2>
      <Button size="large">+ Add New Column</Button>
    </Flex>
  );
}
