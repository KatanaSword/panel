import { AngleRightSVG, ArrowRightSVG, StarOfLifeSVG } from "@/assets/images";
import { Footer, Header, Text, Line } from "@/components/ui";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FAQ, PricingPoint, Testimonials } from "@/type";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GridItem } from "@/components/ui/glowing-effect";
import { Box, Lock, Search, Settings, Sparkles } from "lucide-react";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";

const HomepagePage = () => {
  const faqs: FAQ[] = [
    {
      id: 1,
      question: "What is this website about?",
      answer:
        "Our website is dedicated to providing quality products and services while offering a seamless online experience. We aim to deliver reliable information, top-notch customer service, and a secure shopping environment.",
    },
    {
      id: 2,
      question: "How do I place an order?",
      answer:
        "You can place an order by browsing our catalog, selecting your desired items, and adding them to your cart. Once you’re ready, proceed to the checkout where you can review your order, choose your payment method, and confirm your purchase.",
    },
    {
      id: 3,
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment methods including major credit and debit cards, PayPal, and other secure online payment options. All transactions are processed via encrypted connections to ensure your information remains safe.",
    },
    {
      id: 4,
      question: "How long will it take to receive my order?",
      answer:
        "Orders are typically processed within 24–48 hours. Shipping times vary by location, but most orders arrive within 3–7 business days. You will receive a tracking number once your order has shipped, so you can monitor its progress.",
    },
    {
      id: 5,
      question: "How can I get help if I have any issues?",
      answer:
        "Our customer support team is available to assist you with any questions or concerns. You can reach out via email, phone, or our live chat feature on the website. We strive to respond promptly and resolve any issues quickly.",
    },
  ];

  const pricingPoint: PricingPoint[] = [
    {
      id: 1,
      point: "Unlimited Access",
    },
    {
      id: 2,
      point: "Priority Customer Support",
    },
    {
      id: 3,
      point: "Exclusive Discounts",
    },
    {
      id: 4,
      point: "Early Feature Access",
    },
    {
      id: 5,
      point: "Ad-Free Experience",
    },
  ];

  const testimonials: Testimonials[] = [
    {
      logo: "https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png",
      company: "loom",
      review:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla, nostrum? Similique ipsam, nam necessitatibus vero voluptate ab totam maiores in,",
      star: "",
      name: "Saurabh Tajane",
      occupation: "Head of Engineering",
    },
    {
      logo: "https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png",
      company: "loom",
      review:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla, nostrum? Similique ipsam, nam necessitatibus vero voluptate ab totam maiores in,",
      star: "",
      name: "Saurabh Tajane",
      occupation: "Head of Engineering",
    },
    {
      logo: "https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png",
      company: "loom",
      review:
        "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla, nostrum? Similique ipsam, nam necessitatibus vero voluptate ab totam maiores in,",
      star: "",
      name: "Saurabh Tajane",
      occupation: "Head of Engineering",
    },
  ];

  return (
    <div className="flex w-full flex-col items-center justify-center bg-black-B800">
      <Header />
      <main className="w-[1280px]">
        <section className="my-[100px] flex flex-col items-center justify-center gap-[20px] px-[75px]">
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
          <div className="my-[100px] flex w-full justify-center">
            <div className="h-[450px] w-[80%] rounded-xl bg-white shadow-video_box_shadow"></div>
          </div>
        </section>
        <section className="my-[100px] flex flex-col items-center justify-center gap-[20px] px-[75px]">
          <div className="flex items-center justify-center gap-2">
            <div className="rounded-full bg-orange-O400 p-2">
              <StarOfLifeSVG width="14px" height="14px" />
            </div>
            <Text className="text-base tracking-[-0.50px] text-orange-O400">
              How it works
            </Text>
          </div>
          <Text
            className="w-[500px] bg-h2_gradient bg-clip-text text-center text-4xl font-black tracking-[-0.50px] text-transparent"
            as="h2"
          >
            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
          </Text>
          <ul className="lg:gap-4 mt-[50px] grid max-h-[34rem] grid-cols-1 grid-rows-2 gap-4 md:grid-cols-12 md:grid-rows-3">
            <GridItem
              area="md:[grid-area:1/1/2/7] [grid-area:1/1/2/5]"
              icon={
                <Box className="h-8 w-8 text-orange-O300 dark:text-neutral-400" />
              }
              title="Do things the right way"
              description="Running out of copy so I'll write anything."
            />

            <GridItem
              area="md:[grid-area:1/7/2/13] [grid-area:2/1/3/5]"
              icon={
                <Settings className="h-8 w-8 text-orange-O300 dark:text-neutral-400" />
              }
              title="The best AI code editor ever."
              description="Yes, it's true. I'm not even kidding. Ask my mom if you don't believe me."
            />

            <GridItem
              area="md:[grid-area:2/1/3/7] [grid-area:1/5/3/8]"
              icon={
                <Lock className="h-8 w-8 text-orange-O300 dark:text-neutral-400" />
              }
              title="You should buy Aceternity UI Pro"
              description="It's the best money you'll ever spend"
            />

            <GridItem
              area="md:[grid-area:2/7/3/13] [grid-area:1/8/2/13]"
              icon={
                <Sparkles className="h-8 w-8 text-orange-O300 dark:text-neutral-400" />
              }
              title="This card is also built by Cursor"
              description="I'm not even kidding. Ask my mom if you don't believe me."
            />

            <GridItem
              area="md:[grid-area:3/1/4/13] [grid-area:2/8/3/13]"
              icon={
                <Search className="h-8 w-8 text-orange-O300 dark:text-neutral-400" />
              }
              title="Coming soon on Aceternity UI"
              description="I'm writing the code as I record this, no shit."
            />
          </ul>
        </section>
        <section className="my-[100px] flex flex-col items-center justify-center gap-[20px] px-[75px]">
          <div className="flex items-center justify-center gap-[30px]">
            <div className="flex w-[500px] flex-col justify-start gap-[20px]">
              <div className="flex items-center justify-start gap-2">
                <div className="w-[30px] rounded-full bg-orange-O400 p-2">
                  <StarOfLifeSVG width="14px" height="14px" />
                </div>
                <Text className="text-orange-O400">Customer Story</Text>
              </div>
              <Text
                className="w-auto bg-h2_gradient bg-clip-text text-4xl font-black tracking-[-0.50px] text-transparent"
                as="h2"
              >
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              </Text>
              <div className="mt-[30px] flex items-center justify-start gap-[6px]">
                <Text className="text-gray-G400">Read the story</Text>
                <div className="flex h-[20px] w-[20px] items-center rounded-full border border-gray-G400 bg-black-B800 p-1">
                  <ArrowRightSVG
                    width="14px"
                    height="14px"
                    fillColor="#acacac"
                  />
                </div>
              </div>
            </div>
            <div className="h-[300px] w-[400px] rounded-xl bg-white"></div>
          </div>
          <div className="flex w-full items-center justify-between gap-[20px]">
            <div className="dark:bg-black dark:bg-grid-white/[0.05] relative flex flex-col items-center justify-center overflow-hidden rounded-md antialiased">
              <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="slow"
              />
            </div>
          </div>
        </section>
        <section className="my-[100px] flex flex-col items-center justify-center gap-[20px] px-[75px]">
          <div className="flex items-center justify-center gap-2">
            <div className="rounded-full bg-orange-O400 p-2">
              <StarOfLifeSVG width="18px" height="18px" />
            </div>
            <Text className="text-base tracking-[-0.50px] text-orange-O400">
              FAQs
            </Text>
          </div>
          <Text
            className="bg-h2_gradient bg-clip-text text-4xl font-black tracking-[-0.50px] text-transparent"
            as="h2"
          >
            We've got the answers
          </Text>
          <Accordion type="single" collapsible className="mt-[40px] w-full">
            {faqs.map((faq) => (
              <AccordionItem value={`item-${faq.id}`} key={faq.id}>
                <AccordionTrigger className="text-base font-semibold text-white">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-gray-G400">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
        <section className="my-[100px] flex flex-col items-center justify-center gap-[20px] px-[75px]">
          <div className="flex items-center justify-center gap-2">
            <div className="rounded-full bg-orange-O400 p-2">
              <StarOfLifeSVG width="18px" height="18px" />
            </div>
            <Text className="text-base tracking-[-0.50px] text-orange-O400">
              PRICING
            </Text>
          </div>
          <Text
            className="bg-h2_gradient bg-clip-text text-4xl font-black tracking-[-0.50px] text-transparent"
            as="h2"
          >
            Profitable Pricing Plan
          </Text>
          <div className="flex w-full items-center justify-center">
            <Tabs
              defaultValue="monthly"
              className="flex w-full flex-col items-center justify-center"
            >
              <TabsList className="grid w-[200px] grid-cols-2 rounded-full border border-gray-G400 bg-black-B600">
                <TabsTrigger
                  value="monthly"
                  className="rounded-full data-[state=active]:bg-orange-O400 data-[state=active]:text-black-B900"
                >
                  Monthly
                </TabsTrigger>
                <TabsTrigger
                  value="yearly"
                  className="rounded-full data-[state=active]:bg-orange-O400 data-[state=active]:text-black-B900"
                >
                  Yearly
                </TabsTrigger>
              </TabsList>
              <Text className="mt-2 text-center text-white">
                Save <Text className="inline text-orange-O400">20% </Text>on
                yearly subscription
              </Text>
              <TabsContent
                value="monthly"
                className="mt-[55px] flex w-full justify-between"
              >
                <Card className="w-[350px] border-walnut_brown-W700 bg-black-B900">
                  <CardHeader>
                    <CardTitle className="mb-3 w-[64px] rounded-full bg-orange-O400 px-4 py-2 text-white">
                      Free
                    </CardTitle>
                    <CardDescription className="text-base text-gray-G400">
                      Make changes to your monthly here. Click save when you're
                      done.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="">
                    <Text className="mb-1 text-4xl font-bold text-white">
                      FREE
                    </Text>
                    <Line className="h-px w-full bg-gray-G400" />
                    <ul className="my-7 flex flex-col gap-[13px]">
                      {pricingPoint.map((points) => (
                        <li
                          key={points.id}
                          className="text-base text-gray-G400 before:mr-[10px] before:text-lg before:font-semibold before:text-gray-G400 before:content-['✓']"
                        >
                          {points.point}
                        </li>
                      ))}
                    </ul>
                    <Line className="h-px w-full bg-gray-G400" />
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full rounded-full bg-white py-6 text-base font-semibold text-black-B900">
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="w-[350px] border-walnut_brown-W700 bg-pro_pricing_gradient">
                  <CardHeader>
                    <CardTitle className="mb-3 w-[56px] rounded-full bg-white px-4 py-2 text-black-B900">
                      Pro
                    </CardTitle>
                    <CardDescription className="text-base text-black-B900">
                      Make changes to your monthly here. Click save when you're
                      done.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="">
                    <Text className="mb-1 text-4xl font-bold text-black-B900">
                      $260{" "}
                      <Text className="inline text-base text-black-B900">
                        /month
                      </Text>
                    </Text>
                    <ul className="my-[29px] flex flex-col gap-[13px]">
                      {pricingPoint.map((points) => (
                        <li
                          key={points.id}
                          className="text-back-B900 before:text-back-B900 text-base before:mr-[10px] before:text-lg before:font-semibold before:content-['✓']"
                        >
                          {points.point}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full rounded-full bg-orange-O400 py-6 text-base font-semibold text-white">
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="w-[350px] border-walnut_brown-W700 bg-black-B900">
                  <CardHeader>
                    <CardTitle className="mb-3 w-[90px] text-nowrap rounded-full bg-orange-O400 px-4 py-2 text-white">
                      Pro Plus
                    </CardTitle>
                    <CardDescription className="text-base text-gray-G400">
                      Make changes to your monthly here. Click save when you're
                      done.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="">
                    <Text className="mb-1 text-4xl font-bold text-white">
                      $360{" "}
                      <Text className="inline text-base text-gray-G400">
                        /month
                      </Text>
                    </Text>
                    <Line className="h-px w-full bg-gray-G400" />
                    <ul className="my-7 flex flex-col gap-[13px]">
                      {pricingPoint.map((points) => (
                        <li
                          key={points.id}
                          className="text-base text-gray-G400 before:mr-[10px] before:text-lg before:font-semibold before:text-gray-G400 before:content-['✓']"
                        >
                          {points.point}
                        </li>
                      ))}
                    </ul>
                    <Line className="h-px w-full bg-gray-G400" />
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full rounded-full bg-white py-6 text-base font-semibold text-black-B900">
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent
                value="yearly"
                className="flex w-full justify-between"
              >
                <Card className="w-[350px] border-walnut_brown-W700 bg-black-B900">
                  <CardHeader>
                    <CardTitle className="mb-3 w-[64px] rounded-full bg-orange-O400 px-4 py-2 text-white">
                      Free
                    </CardTitle>
                    <CardDescription className="text-base text-gray-G400">
                      Make changes to your monthly here. Click save when you're
                      done.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="">
                    <Text className="mb-1 text-4xl font-bold text-white">
                      FREE
                    </Text>
                    <Line className="h-px w-full bg-gray-G400" />
                    <ul className="my-7 flex flex-col gap-[13px]">
                      {pricingPoint.map((points) => (
                        <li
                          key={points.id}
                          className="text-base text-gray-G400 before:mr-[10px] before:text-lg before:font-semibold before:text-gray-G400 before:content-['✓']"
                        >
                          {points.point}
                        </li>
                      ))}
                    </ul>
                    <Line className="h-px w-full bg-gray-G400" />
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full rounded-full bg-white py-6 text-base font-semibold text-black-B900">
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="w-[350px] border-walnut_brown-W700 bg-pro_pricing_gradient">
                  <CardHeader>
                    <CardTitle className="mb-3 w-[56px] rounded-full bg-white px-4 py-2 text-black-B900">
                      Pro
                    </CardTitle>
                    <CardDescription className="text-base text-black-B900">
                      Make changes to your monthly here. Click save when you're
                      done.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="">
                    <Text className="mb-1 text-4xl font-bold text-black-B900">
                      $3120{" "}
                      <Text className="inline text-base text-black-B900">
                        /year
                      </Text>
                    </Text>
                    <ul className="my-[29px] flex flex-col gap-[13px]">
                      {pricingPoint.map((points) => (
                        <li
                          key={points.id}
                          className="text-back-B900 before:text-back-B900 text-base before:mr-[10px] before:text-lg before:font-semibold before:content-['✓']"
                        >
                          {points.point}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full rounded-full bg-orange-O400 py-6 text-base font-semibold text-white">
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
                <Card className="w-[350px] border-walnut_brown-W700 bg-black-B900">
                  <CardHeader>
                    <CardTitle className="mb-3 w-[90px] text-nowrap rounded-full bg-orange-O400 px-4 py-2 text-white">
                      Pro Plus
                    </CardTitle>
                    <CardDescription className="text-base text-gray-G400">
                      Make changes to your monthly here. Click save when you're
                      done.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="">
                    <Text className="mb-1 text-4xl font-bold text-white">
                      $4320{" "}
                      <Text className="inline text-base text-gray-G400">
                        /year
                      </Text>
                    </Text>
                    <Line className="h-px w-full bg-gray-G400" />
                    <ul className="my-7 flex flex-col gap-[13px]">
                      {pricingPoint.map((points) => (
                        <li
                          key={points.id}
                          className="text-base text-gray-G400 before:mr-[10px] before:text-lg before:font-semibold before:text-gray-G400 before:content-['✓']"
                        >
                          {points.point}
                        </li>
                      ))}
                    </ul>
                    <Line className="h-px w-full bg-gray-G400" />
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full rounded-full bg-white py-6 text-base font-semibold text-black-B900">
                      Get Started
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default HomepagePage;
