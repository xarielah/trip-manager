import Link from "next/link";
import Button from "../../classic/button";

interface ISuccessMessageProps {
  message?: string;
  tripId?: string | null;
}

const SuccessMessage = (props: ISuccessMessageProps) => {
  if (!props.message || props.message === "") return <></>;
  else
    return (
      <section className="flex flex-col space-y-8 justify-center items-center">
        <svg className="svg" x="0px" y="0px" viewBox="0 0 135 110">
          <rect
            className="box"
            x="5"
            y="5"
            width="100"
            height="100"
            transform="rotate(90 55 55)"
          />
          <path className="check" d="M126.8,14L55.7,85.1L29.2,63.4" />
        </svg>
        <h1 className="text-4xl text-teal-200 font-bold text-center">
          {props.message}
        </h1>
        <Link href={`/client-area/trip/${props.tripId}`}>
          <Button value={"Go to trip"} />
        </Link>
      </section>
    );
};

export default SuccessMessage;
