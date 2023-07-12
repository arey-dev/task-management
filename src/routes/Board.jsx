import { Flex } from "../components/Flex";
import { Logo } from "../components/Logo";
import { AppBar } from "../components/AppBar";
import { Link } from "../components/ui/Link";
import { CallToAction } from "../components/CallToAction";

export function Board() {
  const boardCount = 3;

  return (
    <>
      <Flex className="h-24">
        <Logo />
        <AppBar />
      </Flex>
      <Flex className="h-[calc(100vh-6rem)]">
        <nav className="w-[18.75rem] pt-4 border-x border-light-lines bg-light-surface">
          <h2 className="text-heading-sm text-on-background ml-8 mb-[1.125rem]">
            All BOARDS ({boardCount})
          </h2>
          <ul className="overflow-hidden py-2">
            <li className="relative right-6">
              <Link
                to="/board/platform-launch"
                title="Platform Launch"
                status={{ isActive: true, isPending: null }}
              />
            </li>
            <li className="relative right-6">
              <Link to="/board/platform-launch" title="Marketing Plan" />
            </li>
            <li className="relative right-6">
              <Link to="board/platform-launch" title="Roadmap" />
            </li>
            <li className="relative right-6">
              <Link
                to="board/platform-launch"
                title="+ Create New Board"
                className="text-primary"
              />
            </li>
          </ul>
        </nav>
        <Flex as="main" className="border border-l-primary w-full">
          <CallToAction />
        </Flex>
      </Flex>
    </>
  );
}
