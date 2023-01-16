import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import { axiosClient } from "../../../service/axios.service";
import Button from "../../classic/button";
interface ITripsPageProps {
  name: string;
  country: string;
  startDate: any;
  endDate: any;
  id: string;
}

const TripCard = (props: ITripsPageProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const onDelete = async (id = props.id) => {
    setIsLoading(true);
    try {
      await axiosClient
        .delete(`/trip/${id}`)
        .finally(() => setIsLoading(false));

      window.location.reload();
    } catch (error) {}
  };

  return (
    <div className="bg-white rounded-sm shadow p-6 flex lg:flex-col md:items-center justify-between lg:space-y-5">
      <div className="text-gray-800">
        <div>
          <span>
            <label className="font-bold">Name:</label> {props.name}
          </span>
        </div>
        <div>
          <span>
            <label className="font-bold">Country:</label> {props.country}
          </span>
        </div>
        <div>
          <span>
            <label className="font-bold">Start Date:</label>{" "}
            {moment(props.startDate).format("DD/MM/YYYY")}
          </span>
        </div>
        <div>
          <span>
            <label className="font-bold">End Date:</label>{" "}
            {moment(props.endDate).format("DD/MM/YYYY")}
          </span>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row lg:space-y-0 lg:space-x-3 ml-5 lg:ml-0 lg:justify-between justify-center items-center space-y-3">
        <Link href={`/client-area/trip/${props.id}`} className="w-full">
          <Button value="View" className="w-full" />
        </Link>
        <Button
          isLoading={isLoading}
          onClick={() => onDelete()}
          value="Delete"
          bgColor="bg-red-500"
          bgHover="bg-red-700"
          className="w-full"
        />
      </div>
    </div>
  );
};

export default TripCard;
