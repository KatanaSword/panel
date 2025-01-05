import { HeaderProps } from "@/type";
import { Text } from "./text";
import { SignupSVG, SunSVG } from "@/assets/images";

const Header: React.FC<HeaderProps> = ({ className }) => {
  return (
    <header className={`flex justify-center bg-black px-8 py-4 ${className}`}>
      <div className="flex justify-between">
        <div className="flex w-[1280px] justify-between">
          <div>
            <Text className="text-white">Panel</Text>
            <div className="hidden sm:block">
              <Text></Text>
              <Text></Text>
              <Text></Text>
              <Text></Text>
            </div>
          </div>
          <div className="flex gap-8">
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <Text>About</Text>
            <SignupSVG height="22px" width="22px" fillColor="white" />
            <SunSVG height="22px" width="22px" fillColor="white" />
          </div>
        </div>
      </div>
    </header>
  );
};

export { Header };
