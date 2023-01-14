import { axiosClient } from "../../service/axios.service";

const LogOut = () => {
  return (
    <section className="min-h-screen flex items-center justify-center text-6xl font-bold px-8 text-center">
      Logging off...
    </section>
  );
};

LogOut.getInitialProps = async (ctx: any): Promise<any> => {
  const response = await axiosClient.post("/auth/logout");
  console.log(response);
  return {
    props: {},
  };
};

export default LogOut;
