import { FooterProps } from "@/type";
import { Text } from "./text";
import { Line } from "./line";

const Footer: React.FC<FooterProps> = ({ className = "bg-black" }) => {
  return (
    <>
      <footer
        className={`flex w-full items-center justify-center gap-2 px-[75px] py-[50px] md:px-5 ${className}`}
      >
        <div className="flex w-[1280px] flex-col items-center justify-center gap-[150px] self-center md:gap-10">
          <div className="flex w-full flex-row items-start justify-between md:flex-col md:gap-10">
            <div className="flex w-auto flex-col items-start justify-start gap-4">
              <Text
                className="w-auto text-[32px] tracking-[-0.50px] text-gray-50 md:text-3xl sm:text-[28px]"
                size=""
              >
                Panel
              </Text>
              <Text
                className="max-w-[350px] text-base leading-[35.00px] tracking-[-0.50px] text-gray-50 md:max-w-full"
                size=""
              >
                See what our users are saying! 🌟 Add real, impactful
                testimonials with our sleek and customizable panel site
                template. Highlight customer reviews, build trust, and make your
                brand shine. Perfect for any website looking to showcase success
                stories in style. Start building trust today! 💬✨
              </Text>
            </div>
            <div className="flex w-[209px] flex-col items-start justify-start gap-5">
              <Text className="w-auto text-xl tracking-[-0.50px] text-gray-50">
                Link
              </Text>
              <div className="flex w-auto flex-col items-start justify-start gap-6">
                <Text className="w-auto text-sm tracking-[-0.50px] text-gray-50 hover:text-yellow-100">
                  placeholder
                </Text>
                <Text className="w-auto text-sm tracking-[-0.50px] text-gray-50 hover:text-yellow-100">
                  placeholder
                </Text>
                <Text className="w-auto text-sm tracking-[-0.50px] text-gray-50 hover:text-yellow-100">
                  placeholder
                </Text>
                <Text className="w-auto text-sm tracking-[-0.50px] text-gray-50 hover:text-yellow-100">
                  placeholder
                </Text>
              </div>
            </div>
            <div className="flex w-[209px] flex-col items-start justify-start gap-5">
              <Text className="w-auto text-xl tracking-[-0.50px] text-gray-50">
                Follow us
              </Text>
              <div className="flex w-auto flex-col items-start justify-start gap-6">
                <Text className="w-auto text-sm tracking-[-0.50px] text-gray-50 hover:text-yellow-100">
                  placeholder
                </Text>
                <Text className="w-auto text-sm tracking-[-0.50px] text-gray-50 hover:text-yellow-100">
                  placeholder
                </Text>
                <Text className="w-auto text-sm tracking-[-0.50px] text-gray-50 hover:text-yellow-100">
                  placeholder
                </Text>
                <Text className="w-auto text-sm tracking-[-0.50px] text-gray-50 hover:text-yellow-100">
                  placeholder
                </Text>
              </div>
            </div>
            <div className="flex w-[209px] flex-col items-start justify-start gap-5">
              <Text className="w-auto text-xl tracking-[-0.50px] text-gray-50">
                Legal
              </Text>
              <div className="flex w-auto flex-col items-start justify-start gap-6">
                <Text className="w-auto text-sm tracking-[-0.50px] text-gray-50 hover:text-yellow-100">
                  placeholder
                </Text>
                <Text className="w-auto text-sm tracking-[-0.50px] text-gray-50 hover:text-yellow-100">
                  placeholder
                </Text>
                <Text className="w-auto text-sm tracking-[-0.50px] text-gray-50 hover:text-yellow-100">
                  placeholder
                </Text>
                <Text className="w-auto text-sm tracking-[-0.50px] text-gray-50 hover:text-yellow-100">
                  placeholder
                </Text>
              </div>
            </div>
          </div>
          <Line />
          <div className="flex w-full flex-row items-start justify-start md:gap-10 sm:flex-col">
            <Text className="w-auto text-nowrap text-base tracking-[-0.50px] text-gray-50">
              © 2025 Panel™. All Rights Reserved.
            </Text>
          </div>
        </div>
      </footer>
    </>
  );
};

export { Footer };
