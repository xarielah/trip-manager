import { Trip } from "@prisma/client";
import axios from "axios";
import { axiosClient } from "../../../service/axios.service";

interface ITripsPage {
  trips: Trip[];
}

export async function getServerSideProps(ctx: any) {
  const response = await axiosClient.get("/trip/all/");

  return {
    props: {},
  };
}

const TripsPage = ({ trips }: ITripsPage) => {
  return <>trips page</>;
};

export default TripsPage;
