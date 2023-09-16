import { Flex } from "../Flex";

export function Spinner() {
  return (
    <Flex center>
      <div
        className="h-10 w-10 animate-spin rounded-full border-4 border-solid border-t-transparent text-primary align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      >
        <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
          Loading...
        </span>
      </div>
    </Flex>
  );
}
