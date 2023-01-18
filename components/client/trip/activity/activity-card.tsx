import { Activity } from "@prisma/client";
import { useState } from "react";
import { parseHumanDate } from "../../../../lib/utils/moment-date-parser";
import { axiosClient } from "../../../../service/axios.service";
import Button from "../../../classic/button";

interface IActivityCardProps {
  activity: Activity;
}

const ActivityCard = ({ activity }: IActivityCardProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const deleteActivity = async (id: string): Promise<void> => {
    setIsLoading(true);
    try {
      await axiosClient
        .delete(`/activity/${id}`)
        .finally(() => setIsLoading(false));
      window.location.reload();
    } catch (error) {}
  };

  return (
    <div className="bg-white p-8 text-gray-800 rounded-sm my-8 shadow flex flex-col space-y-6 sm:space-y-0 sm:flex-row justify-between items-center">
      <div className="flex flex-col">
        <h1 className="text-3xl">{activity.name}</h1>
        {activity.targetDate ? (
          <p className="font-bold text-teal-800">
            Planned to {parseHumanDate(activity.targetDate)}
          </p>
        ) : (
          ""
        )}
        <p className="text-gray-600">{activity.comment}</p>
      </div>
      <div className="flex space-x-4 w-max">
        <Button
          className="bg-blue-500 text-white hover:bg-blue-800 font-bold shadow-md shadow-blue-400/40 w-max"
          value="Edit"
        />
        <Button
          key={activity.name + "delete"}
          isLoading={isLoading}
          onClick={() => deleteActivity(activity.id)}
          className="bg-red-500 text-white hover:bg-red-800 font-bold shadow-md shadow-red-400/40 w-max"
          value="&#10005;"
        />
      </div>
    </div>
  );
};

export default ActivityCard;
