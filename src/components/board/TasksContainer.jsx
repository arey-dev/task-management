/* eslint-disable react/prop-types */

import { Flex } from "../Flex";

export function TasksContainer({ children }) {
  return (
    <Flex className="flex-col gap-5">{children}</Flex>
  );
}
