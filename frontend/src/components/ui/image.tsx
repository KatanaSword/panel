type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  className?: string;
  src: string;
  alt: string;
  height?: string | number;
  width?: string | number;
};

const Image: React.FC<ImageProps> = ({
  className,
  src = "",
  alt = "",
  height,
  width,
  ...resetProps
}) => {
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      height={height}
      width={width}
      {...resetProps}
      loading={"lazy"}
    ></img>
  );
};

export { Image };
