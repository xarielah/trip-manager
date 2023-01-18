import { Activity, ActivityType, Trip } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
import Button from "../../../../components/classic/button";
import NewActivityForm from "../../../../components/client/form/new-activity-form";
import ActivitiesTab, {
  ActivityPayload,
} from "../../../../components/client/trip/activity/activities-tab";
import DaysLeft from "../../../../components/client/trip/days-left";
import TripDetailPill from "../../../../components/client/trip/trip-detail-pill";
import { capitalize } from "../../../../lib/utils/capitalize";
import { getDaysLeft } from "../../../../lib/utils/get-days-left";
import { parseHumanDate } from "../../../../lib/utils/moment-date-parser";
import { axiosClient } from "../../../../service/axios.service";
import { TOKEN_COOKIE_NAME } from "../../../../service/cookie.service";

type TripPayload = Trip & {
  activities: Activity[];
};

interface ITripByIdPageProps {
  trip: TripPayload;
  activityTypes: ActivityType[];
}

export async function getServerSideProps(ctx: any) {
  const id = ctx.query.id[0];
  const token = ctx.req.cookies[TOKEN_COOKIE_NAME];

  let data: TripPayload | null;
  let typesData: ActivityType[] | null;

  try {
    const response = await axiosClient.get(`/trip/${id}?relation=true`, {
      headers: {
        Authorization: token,
      },
    });

    const activityTypesResponse = await axiosClient.get("/activitytype", {
      headers: {
        Authorization: token,
      },
    });

    data = response.data;
    typesData = activityTypesResponse.data;
  } catch (error) {
    data = null;
    typesData = null;
  }

  return {
    props: {
      trip: data,
      activityTypes: typesData,
    },
  };
}

const TripByIdPage = ({ trip, activityTypes }: ITripByIdPageProps) => {
  const [showNewActivityForm, setShowNewActivityForm] =
    useState<boolean>(false);
  const router = useRouter();

  if (!trip) {
    router.push("/");
  } else if (showNewActivityForm)
    return (
      <div className="absolute top-0 left-0 bottom-0 w-screen min-h-screen flex flex-col justify-center items-center bg-teal-900">
        <NewActivityForm
          tripId={trip.id}
          onClose={() => setShowNewActivityForm(false)}
          types={activityTypes}
        />
      </div>
    );
  else
    return (
      <section className="mt-10 max-w-7xl mx-auto">
        <div className="lg:flex lg:justify-between lg:flex-row-reverse lg:px-8">
          <DaysLeft startDate={trip.startDate} />
          <div className="text-center">
            <h1 className="text-6xl font-bold my-6 text-teal-100">
              {capitalize(trip.name)} to {capitalize(trip.country)}
            </h1>
            <h2 className="text-2xl text-gray-400">
              {parseHumanDate(trip.startDate)} - {parseHumanDate(trip.endDate)}
            </h2>
          </div>
        </div>
        <ActivitiesTab activities={trip.activities as ActivityPayload[]} />

        <div className="w-full flex justify-center items-center my-5 min-h-[5em]">
          <Button
            value={
              showNewActivityForm ? "Discard Changes" : "Add a new activity!"
            }
            onClick={() => setShowNewActivityForm((prev) => !prev)}
          />
        </div>
        {/* {showNewActivityForm ? (
          <div className="absolute top-0 left-0 bottom-0 w-screen min-h-screen bg-teal-900">
            <NewActivityForm
              tripId={trip.id}
              onClose={() => setShowNewActivityForm(false)}
              types={activityTypes}
            />
          </div>
        ) : (
          ""
        )} */}
      </section>
    );
};

export default TripByIdPage;
