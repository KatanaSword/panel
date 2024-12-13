type ErrorMessageProps = {
  className?: string;
  errors: string | string[];
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ className, errors }) => {
  return <div className={`${className}`}>{errors}</div>;
};

export { ErrorMessage };
