import { HtmlHTMLAttributes } from "react";

interface ITripDetailPill<T> {
  label: string;
  value: T;
}

const TripDetailPill = (
  props: ITripDetailPill<any> & HtmlHTMLAttributes<HTMLDivElement>
) => {
  return (
    <div
      className={`bg-white p-3 rounded-xl w-full text-gray-900 flex flex-col justify-center h-full items-center ${
        props.className ?? ""
      }`}
    >
      <h1 className="font-bold text-2xl">{props.label}</h1>
      <p className="text-xl">{props.value}</p>
    </div>
  );
};

export default TripDetailPill;
