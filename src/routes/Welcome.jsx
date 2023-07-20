import { Flex } from "../components";

export function Welcome() {
  return (
    <Flex center className="flex-col gap-8">
      <h2 className=" text-2xl text leading-3 font-bold text-on-background">
        Welcome!
      </h2>
      <p className="text-heading-lg text-on-background">
        Create a new board to get started.
      </p>
    </Flex>
  );
}
