type TextProps = {
  children: string;
  className?: string;
  size?: string | number;
  as?: "span" | "p";
};

const sizeClassess = {};

const Text: React.FC<TextProps> = ({
  children,
  className,
  size,
  as = "p",
  ...restProps
}) => {
  const Component = as;
  return (
    <Component
      className={`${className} ${size && sizeClassess[size]}`}
      {...restProps}
    >
      {children}
    </Component>
  );
};

export { Text };
