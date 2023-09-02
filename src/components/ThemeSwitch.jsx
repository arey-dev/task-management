import { Flex } from "./Flex";
import { useDarkMode } from "../hooks";
import dark from "../assets/icon-dark-theme.svg";
import light from "../assets/icon-light-theme.svg";

export function ThemeSwitch() {
  const [isDarkMode, setIsDarkMode] = useDarkMode();

  const handleToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <Flex
      center
      className="w-[calc(100%-1.5rem)] h-12 rounded-lg gap-6 bg-light-secondary dark:bg-dark-background"
    >
      <img src={light} alt="light theme icon" />
      <label className="relative inline-flex items-center cursor-pointer">
        <input
          onChange={handleToggle}
          type="checkbox"
          value=""
          className="sr-only peer"
        />
        <div className="w-11 h-6 bg-primary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-on-primary after:rounded-full after:h-5 after:w-5 after:transition-all hover:brightness-150"></div>
        <span className="sr-only">Theme Switch</span>
      </label>
      <img src={dark} alt="dark theme icon" />
    </Flex>
  );
}
