import { Flex } from "./Flex";
import dark from "../assets/icon-dark-theme.svg";
import light from "../assets/icon-light-theme.svg";

export function ThemeSwitch() {
  return (
    <Flex
      center
      className="w-100 h-12 bg-light-background rounded-lg gap-6 mx-6"
    >
      <img src={light} alt="light theme icon" />
      <label className="relative inline-flex items-center cursor-pointer">
        <input type="checkbox" value="" className="sr-only peer" />
        <div className="w-11 h-6 bg-primary peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-on-primary after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
        <span className="sr-only">Theme Switch</span>
      </label>
      <img src={dark} alt="dark theme icon" />
    </Flex>
  );
}
