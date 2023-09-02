import { Flex } from "./Flex";
import { Button } from "./ui";
import { Link, useParams } from "react-router-dom";

export function CallToAction() {
  const { boardId } = useParams();

  return (
    <Flex center className="flex-col gap-8">
      <h2 className="text-heading-lg text-on-background">
        This board is empty. Create a new column to get started
      </h2>
      <Link to={`/board/${boardId}/add-column`}>
        <Button size="large">+ Add New Column</Button>
      </Link>
    </Flex>
  );
}
