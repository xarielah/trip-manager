import { Activity, Trip } from "@prisma/client";
import { useRouter } from "next/router";
import { useState } from "react";
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
}

export async function getServerSideProps(ctx: any) {
  const id = ctx.query.id[0];
  const token = ctx.req.cookies[TOKEN_COOKIE_NAME];

  let data: TripPayload | null;

  try {
    const response = await axiosClient.get(`/trip/${id}?relation=true`, {
      headers: {
        Authorization: token,
      },
    });
    data = response.data;
  } catch (error) {
    data = null;
  }

  return {
    props: {
      trip: data,
    },
  };
}

const TripByIdPage = ({ trip }: ITripByIdPageProps) => {
  // const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  if (!trip) {
    router.push("/");
  } else
    return (
      <section className="mt-10">
        <DaysLeft startDate={trip.startDate} />
        <div className="text-center">
          <h1 className="text-6xl font-bold my-6">
            {capitalize(trip.name)} to {capitalize(trip.country)}
          </h1>
          <h2 className="text-2xl text-gray-400">
            {parseHumanDate(trip.startDate)} - {parseHumanDate(trip.endDate)}
          </h2>
        </div>
        <ActivitiesTab activities={trip.activities as ActivityPayload[]} />
      </section>
    );
};

export default TripByIdPage;
