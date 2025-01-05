import { ImageProps } from "@/type";

const Image: React.FC<ImageProps> = ({
  className,
  src = "",
  alt = "",
  height,
  width,
  ...restProps
}) => {
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      height={height}
      width={width}
      {...restProps}
      loading={"lazy"}
    ></img>
  );
};

export { Image };
