import { HeaderProps } from "@/type";
import { Text } from "./text";
import { SignupSVG, SunSVG } from "@/assets/images";

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header
      className={`flex w-full items-center justify-center bg-black px-[75px] py-[35px] md:px-5 ${className}`}
    >
      <div className="flex w-[1280px] flex-row items-center justify-between md:flex-col md:gap-10">
        <div className="flex items-center justify-between sm:w-[100%]">
          <Text className="text-xl tracking-[-0.50px] text-gray-50">Panel</Text>
          <div className="mx-1 hidden h-[1.5px] w-[20px] cursor-pointer bg-black sm:block">
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text></Text>
          </div>
        </div>
        <div className="flex w-[498px] flex-row items-center justify-between gap-9 sm:hidden sm:w-full sm:flex-1">
          <Text className="text-white">Placeholder</Text>
          <Text className="text-white">Placeholder</Text>
          <Text className="text-white">Placeholder</Text>
          <Text className="text-white">About</Text>
        </div>
        <div className="flex items-center justify-center gap-8 sm:hidden">
          <SignupSVG height="22px" width="22px" fillColor="white" />
          <SunSVG height="22px" width="22px" fillColor="white" />
        </div>
      </div>
    </header>
  );
};

export { Header };
