import { Flex } from "../components/Flex";
// import { CallToAction } from "../components/CallToAction";
import { Column } from "../components/board/Column";

export function Board() {
  return (
    <Flex as="main" className="border border-l-primary w-full p-6">
      <Column />
      {/* <CallToAction /> */}
    </Flex>
  );
}
