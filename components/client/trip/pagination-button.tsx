import { ButtonHTMLAttributes } from "react";

interface IPaginationButtonProps {
  value: string | number;
  isCurrent?: boolean;
}

const PaginationButton = (
  props: ButtonHTMLAttributes<HTMLButtonElement> & IPaginationButtonProps
) => {
  const { isCurrent, value, ...restProps } = props;
  return (
    <button
      className={`font-bold text-xl px-4 py-2 ${
        isCurrent
          ? "bg-teal-800 text-white hover:bg-teal-900"
          : "hover:bg-teal-800 hover:text-white text-gray-900 bg-white"
      } ease-in-out duration-300 shadow-sm rounded-md`}
      {...restProps}
    >
      {value}
    </button>
  );
};

export default PaginationButton;
