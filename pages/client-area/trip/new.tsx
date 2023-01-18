import { yupResolver } from "@hookform/resolvers/yup";
import { Trip } from "@prisma/client";
import moment from "moment";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { SchemaOf } from "yup";
import FormErrorField from "../../../components/auth/form-error-field";
import Button from "../../../components/classic/button";
import ClientInputField from "../../../components/client/form/client-input-form";
import SuccessMessage from "../../../components/client/form/success-message";
import { axiosClient } from "../../../service/axios.service";
import { getCookie, TOKEN_COOKIE_NAME } from "../../../service/cookie.service";

type NewTrip = {
  name: string;
  country: string;
  startDate: Date | undefined | string;
  endDate: Date | undefined | string;
};

//! Do a date validation.
// The date validation below is not including date validation
//! + Do it on the backend as well

const schema: SchemaOf<NewTrip> = yup
  .object({
    name: yup.string().required("Name is required").max(64),
    country: yup.string().required("Country is required").max(16),
    startDate: yup.string().required("Start date is required"),
    endDate: yup.string().required("End date is required"),
  })
  .required();

const NewTrip = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const [tripId, setTripId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewTrip>({ resolver: yupResolver(schema) });

  const { ref: startDateRef, ...restStartDateRef } = register("startDate");
  const { ref: countryRef, ...restCountryRef } = register("country");
  const { ref: endDateRef, ...restEndDateRef } = register("endDate");
  const { ref: nameRef, ...restNameRef } = register("name");

  const onsubmit = async (data: NewTrip) => {
    setIsLoading(true);
    try {
      const response = await axiosClient
        .post("/trip", data)
        .finally(() => setIsLoading(false));

      setTripId(response.data.id);
      setSuccess(`Trip "${(response.data as Trip).name}" was created.`);
    } catch (error) {}
  };

  if (success) return <SuccessMessage message={success} tripId={tripId} />;
  else
    return (
      <>
        <h1 className="main-form-header">New Trip</h1>
        <form
          noValidate
          onSubmit={handleSubmit(onsubmit)}
          className="max-w-sm md:max-w-2xl mx-auto"
        >
          <div className="flex flex-col space-y-12">
            <div className="w-full">
              <ClientInputField
                className="w-full"
                {...restNameRef}
                placeholder={"Name"}
                reference={nameRef}
              />
              {errors.name?.message && (
                <FormErrorField message={errors.name.message} />
              )}
            </div>
            <div className="w-full">
              <ClientInputField
                className="w-full"
                {...restCountryRef}
                placeholder={"Country"}
                reference={countryRef}
              />
              {errors.country?.message && (
                <FormErrorField message={errors.country.message} />
              )}
            </div>
            <div className="flex space-y-10 md:space-y-0 md:space-x-6 md:flex-row flex-col">
              <div className="flex flex-col w-full">
                <label htmlFor="startDate" className="font-bold text-xl">
                  From
                </label>
                <ClientInputField
                  id="startDate"
                  {...restStartDateRef}
                  type={"date"}
                  placeholder={"Start Date"}
                  reference={startDateRef}
                />
                {errors.startDate?.message && (
                  <FormErrorField message={errors.startDate.message} />
                )}
              </div>
              <div className="flex flex-col w-full">
                <label htmlFor="endDate" className="font-bold text-xl">
                  Until
                </label>
                <ClientInputField
                  id="endDate"
                  {...restEndDateRef}
                  type={"date"}
                  placeholder={"End Date"}
                  reference={endDateRef}
                />
                {errors.endDate?.message && (
                  <FormErrorField message={errors.endDate.message} />
                )}
              </div>
            </div>
            <Button
              isLoading={isLoading}
              type={"submit"}
              className={"text-center"}
              value={"Create a new trip"}
            />
          </div>
        </form>
      </>
    );
};

export default NewTrip;
