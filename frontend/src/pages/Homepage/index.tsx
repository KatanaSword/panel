import { AngleRightSVG } from "@/assets/images";
import { Footer, Header, Text } from "@/components/ui";
import { Button } from "@/components/ui/button";

const HomepagePage = () => {
  return (
    <div className="flex w-full items-center justify-center bg-black-B900">
      <div className="w-[1280px]">
        <Header />
        <section className="mt-[50px] flex flex-col items-center justify-center gap-[20px] px-[75px]">
          <div className="flex flex-row items-center gap-1 rounded-[50px] border-2 border-walnut_brown-W700 bg-gradient">
            <Text
              className="rounded-[50px] bg-white px-2 text-black-B900"
              size=""
              as="span"
            >
              New
            </Text>
            <div className="flex flex-row items-center gap-1">
              <Text className="text-white" size="">
                What is your name bro
              </Text>
              <AngleRightSVG
                className="pr-2"
                height="15px"
                width="15px"
                fillColor="white"
              />
            </div>
          </div>
          <div className="w-auto">
            <Text
              className="text-center text-[55px] font-black leading-[60.00px] tracking-[-0.50px] text-white"
              as="h1"
            >
              Build Trust. Drive Sales.
            </Text>
            <Text
              className="bg-hero_tagline_gradient bg-clip-text text-[55px] font-black leading-[60.00px] tracking-[-0.50px] text-transparent"
              as="h1"
            >
              One Testimonial at a Time
            </Text>
          </div>
          <div className="w-[450px]">
            <Text
              className="text-center text-base leading-[25.00px] tracking-[-0.50px] text-white"
              size=""
            >
              Effortlessly collect, curate, and showcase customer success
              stories to build credibility and drive conversions.
            </Text>
          </div>
          <Button
            className="my-8 rounded-[50px] bg-orange-O600 text-base font-semibold"
            size="lg"
          >
            Start for free today
          </Button>
          <div className="mt-[50px] flex w-full justify-center">
            <div className="shadow-video_box_shadow h-[450px] w-[80%] rounded-xl bg-white"></div>
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
};

export default HomepagePage;
