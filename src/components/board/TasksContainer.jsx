/* eslint-disable react/prop-types */

import { Flex } from "../Flex";

export function TasksContainer({ children }) {
  return (
    <Flex className="w-[17.5rem] flex-col shrink-0 gap-5">{children}</Flex>
  );
}
