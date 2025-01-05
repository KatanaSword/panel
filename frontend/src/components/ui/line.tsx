import { LineProps } from "@/type";

const Line: React.FC<LineProps> = ({ className, ...restProps }) => {
  return <div className={className} {...restProps} />;
};

export { Line };
