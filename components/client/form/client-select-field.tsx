import React, { ReactNode, SelectHTMLAttributes } from "react";
import type { RefCallBack } from "react-hook-form";

interface IClientSelectFieldProps {
  reference: RefCallBack;
  children: ReactNode;
}

const ClientSelectField = (
  props: SelectHTMLAttributes<HTMLSelectElement> & IClientSelectFieldProps
) => {
  const { reference, className, children, ...restProps } = props;
  return (
    <select
      ref={reference}
      className={`border-[1px] border-slate-400/20 rounded-md px-6 py-4 focus:outline-slate-600/20 sm:text-xl ${
        className ?? ""
      }`}
      {...restProps}
    >
      {children}
    </select>
  );
};

export default ClientSelectField;
