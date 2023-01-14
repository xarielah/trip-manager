interface IFormRequestError {
  errorMessage: string;
}

const FormRequestError = ({ errorMessage }: IFormRequestError) => {
  return (
    <div className="text-red-600 border-2 border-red-600 px-10 py-4 rounded-md">
      <span>{errorMessage}</span>
    </div>
  );
};

export default FormRequestError;
