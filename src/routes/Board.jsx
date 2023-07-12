import { Flex } from "../components/Flex";
import { CallToAction } from "../components/CallToAction";

export function Board() {
  return (
    <Flex as="main" className="border border-l-primary w-full">
      <CallToAction />
    </Flex>
  );
}