import React, { InputHTMLAttributes, useState } from "react";
import type { RefCallBack } from "react-hook-form";

interface IClientInputFieldProps {
  reference: RefCallBack;
}

const ClientInputField = (
  props: InputHTMLAttributes<HTMLInputElement> & IClientInputFieldProps
) => {
  const { reference, type, className, ...restProps } = props;
  return (
    <input
      ref={reference}
      className={`border-[1px] border-slate-400/20 rounded-md px-6 py-4 focus:outline-slate-600/20 sm:text-xl ${
        className ?? ""
      }`}
      {...restProps}
      type={type ?? "text"}
    />
  );
};

export default ClientInputField;
