import React, {
  HTMLInputTypeAttribute,
  InputHTMLAttributes,
  useState,
} from "react";
import type { RefCallBack } from "react-hook-form";

interface IInputFieldProps {
  reference: RefCallBack;
}

const InputField = ({
  reference,
  type,
  ...restProps
}: InputHTMLAttributes<HTMLInputElement> & IInputFieldProps) => {
  const [showState, setShowState] = useState<boolean>(false);
  return (
    <div className="relative">
      {type === "password" ? (
        <span
          onClick={() => setShowState((prev) => !prev)}
          className={`shadow-sm absolute top-1/2 -translate-y-1/2 right-3 ease-in-out duration-300 ${
            showState ? "bg-slate-800" : "bg-pink-700"
          } text-white rounded-md px-2 text-[0.9em] cursor-pointer`}
        >
          {showState ? "Hide" : "Peek"}
        </span>
      ) : (
        ""
      )}
      <input
        ref={reference}
        className="border-[1px] border-slate-400/20 rounded-md px-6 py-4 focus:outline-slate-600/20 sm:text-xl"
        {...restProps}
        type={type === "password" ? (showState ? "text" : "password") : "text"}
      />
    </div>
  );
};

export default InputField;
