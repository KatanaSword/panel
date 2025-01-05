import { ErrorMessageProps } from "@/type";

const ErrorMessage: React.FC<ErrorMessageProps> = ({ className, errors }) => {
  return errors?.length > 0 && <div className={`${className}`}>{errors}</div>;
};

export { ErrorMessage };
