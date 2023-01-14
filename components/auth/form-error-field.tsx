interface IFormErrorField {
  message: string;
}

const FormErrorField = ({ message }: IFormErrorField) => {
  return (
    <div className="flex items-center">
      <div className="w-3 h-3 border-2 border-teal-700 shadow-teal-900 rounded-full mr-1"></div>
      <span className="font-bold text-teal-500 text-sm">
        {message.slice(0, 1).toUpperCase() + message.slice(1)}.
      </span>
    </div>
  );
};

export default FormErrorField;
