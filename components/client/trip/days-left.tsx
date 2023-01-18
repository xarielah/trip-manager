import { getDaysLeft } from "../../../lib/utils/get-days-left";

interface IDaysLeftProps {
  startDate: string | Date | number;
}

const DaysLeft = (props: IDaysLeftProps) => {
  const daysLeft = getDaysLeft(props.startDate);

  const formatColor = (number: number): string => {
    if (number > 7) {
      return "text-gray-800";
    } else if (number < 7 && number > 3) {
      return "text-orange-600";
    } else {
      return "text-pink-600";
    }
  };

  return (
    <div className="flex flex-col space-y-3 justify-center items-center text-8xl font-bold">
      {!daysLeft || daysLeft <= 0 ? (
        ""
      ) : (
        <div
          className={`${formatColor(
            daysLeft
          )} bg-white px-8 pt-2 pb-4 rounded-full shadow`}
        >
          {daysLeft}
        </div>
      )}
      <h1
        className={`text-3xl text-gray-800 px-3 py-1 shadow bg-white ${
          !daysLeft || daysLeft < 0 ? "text-blue-600 italic" : ""
        }`}
      >
        {!daysLeft || daysLeft < 0 ? "Date Passed" : "Days Left"}
      </h1>
    </div>
  );
};

export default DaysLeft;
