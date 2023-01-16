import { Trip } from "@prisma/client";
import axios from "axios";
import { jwtVerify } from "jose";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "../../../components/classic/button";
import TripCard from "../../../components/client/trip/trip-card";
import TripPagination from "../../../components/client/trip/trip-pagination";
import { useWindow } from "../../../hooks";
import { jwtPayload } from "../../../lib/utils/jwt-payload";
import { axiosClient } from "../../../service/axios.service";
import { getCookie, TOKEN_COOKIE_NAME } from "../../../service/cookie.service";

interface ITripsPageProps {
  trips: Trip[];
}

export async function getServerSideProps(ctx: any) {
  let data: Trip[] = [];

  try {
    const token = ctx.req.cookies[TOKEN_COOKIE_NAME];
    const decodedPayload = await jwtPayload(token);

    const response = await axiosClient.get(
      `/trip/user/${decodedPayload.username}`,
      {
        headers: {
          Authorization: token,
        },
      }
    );

    data = response.data;
  } catch (error) {}

  return {
    props: {
      trips: data,
    },
  };
}

const TripsPage = ({ trips }: ITripsPageProps) => {
  const [pagedData, setPagedData] = useState<Trip[][]>([]);
  const [pageIndex, setPageIndex] = useState<number>(0); //! Always above 0, add 1 to reflect current page.

  const { width } = useWindow();

  useEffect(() => {
    const MAX_RESULTS: number = width >= 1050 ? 8 : 6;

    let array: Trip[] = [];
    let finalArray: Trip[][] = [];

    if (trips.length <= MAX_RESULTS) {
      setPagedData([trips]);
      setPageIndex(0);
    } else {
      for (let i = 0; i < trips.length; i++) {
        array.push(trips[i]);

        if (array.length === MAX_RESULTS) {
          finalArray.push(array);
          array = [];
        }

        if (i === trips.length - 1 && array.length > 0) {
          finalArray.push(array);
        }
      }
      setPagedData(finalArray);
    }

    return () => {
      setPagedData([]);
      setPageIndex(0);
    };
  }, [trips, width]);

  const nextPage = (): void => {
    if (pageIndex < pagedData.length - 1) {
      setPageIndex((index) => index + 1);
    }
  };

  const prevPage = (): void => {
    if (pageIndex > 0) {
      setPageIndex((index) => index - 1);
    }
  };

  const setPage = (pageNumber: number) => {
    if (pageNumber < pagedData.length && pageNumber >= 0) {
      setPageIndex(pageNumber);
    }
  };

  return (
    <>
      <h1 className="main-form-header">Your Trips</h1>
      <section className="flex flex-col space-y-10">
        {trips.length > 0 && pagedData.length > 0 ? (
          <div className="flex flex-col justify-center items-center space-y-10 md:space-y-0 md:grid md:grid-cols-2 lg:grid-cols-4 md:gap-10 md:grid-flow-row">
            {pagedData[pageIndex].map((trip) => (
              <TripCard
                id={trip.id}
                name={trip.name}
                country={trip.country}
                startDate={trip.startDate}
                endDate={trip.endDate}
                key={trip.name}
              />
            ))}
          </div>
        ) : (
          <div className="text-center mx-auto md:text-2xl w-full">
            No data to display
          </div>
        )}
        {trips.length > 0 ? (
          <div className="flex justify-center items-center">
            <TripPagination
              currentPageIndex={pageIndex}
              dataLength={pagedData.length}
              increment={nextPage}
              setPage={setPage}
              decrement={prevPage}
            />
          </div>
        ) : (
          <></>
        )}
      </section>
    </>
  );
};

export default TripsPage;
