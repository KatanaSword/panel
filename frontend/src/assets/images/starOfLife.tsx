import { SVGProps } from "@/type";

export const StarOfLifeSVG: React.FC<SVGProps> = ({
  className,
  fillColor = "#000000",
  height = "30px",
  width = "30px",
  ...restProps
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512 512"
      className={className}
      fill={fillColor}
      height={height}
      width={width}
      {...restProps}
    >
      <path d="M208 32c0-17.7 14.3-32 32-32l32 0c17.7 0 32 14.3 32 32l0 140.9 122-70.4c15.3-8.8 34.9-3.6 43.7 11.7l16 27.7c8.8 15.3 3.6 34.9-11.7 43.7L352 256l122 70.4c15.3 8.8 20.6 28.4 11.7 43.7l-16 27.7c-8.8 15.3-28.4 20.6-43.7 11.7L304 339.1 304 480c0 17.7-14.3 32-32 32l-32 0c-17.7 0-32-14.3-32-32l0-140.9L86 409.6c-15.3 8.8-34.9 3.6-43.7-11.7l-16-27.7c-8.8-15.3-3.6-34.9 11.7-43.7L160 256 38 185.6c-15.3-8.8-20.5-28.4-11.7-43.7l16-27.7C51.1 98.8 70.7 93.6 86 102.4l122 70.4L208 32z" />
    </svg>
  );
};
