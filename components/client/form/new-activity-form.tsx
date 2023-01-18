import { yupResolver } from "@hookform/resolvers/yup";
import type { ActivityType } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { axiosClient } from "../../../service/axios.service";
import FormErrorField from "../../auth/form-error-field";
import Button from "../../classic/button";
import ClientInputField from "./client-input-form";
import ClientSelectField from "./client-select-field";
import SuccessActivityCreated from "./success-activity-created";

interface INewActivityFormProps {
  tripId: string;
  types: ActivityType[];
  onClose: () => void;
}

type NewActivityFields = {
  name: string;
  comment: string;
  typeId: string;
  targetDate?: string;
};

const schema = yup.object({
  name: yup.string().required().max(64),
  comment: yup.string().required().max(256),
  targetDate: yup.string().optional(),
  typeId: yup.string(),
});

const NewActivityForm = (props: INewActivityFormProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);

  //! Remember props.onClose to close the modal

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NewActivityFields>({
    resolver: yupResolver(schema),
  });

  const { ref: nameRef, ...restName } = register("name");
  const { ref: commentRef, ...restComment } = register("comment");
  const { ref: targetDateRef, ...restTargetDate } = register("targetDate");
  const { ref: typeIdRef, ...restTypeId } = register("typeId");

  const onsubmit = async (data: NewActivityFields) => {
    setIsLoading(true);

    try {
      const activityData = {
        ...data,
        tripId: props.tripId,
      };

      await axiosClient
        .post("/activity", activityData)
        .finally(() => setIsLoading(false));
      window.location.reload();
      setSuccess(true);
    } catch (error) {}
  };

  if (success) return <SuccessActivityCreated />;
  return (
    <>
      <div className="absolute top-14 flex items-center justify-center left-0 px-8 w-full">
        <div className="w-full max-w-4xl flex flex-row-reverse">
          <Button
            onClick={props.onClose}
            value="&#10005;"
            className="bg-red-500 hover:bg-red-800"
          />
        </div>
      </div>
      <section className="w-full">
        <h1 className="text-center text-teal-200 text-4xl font-bold my-14">
          Add New Activity
        </h1>
        <form
          noValidate
          onSubmit={handleSubmit(onsubmit)}
          className="max-w-4xl mx-auto px-8"
        >
          <div className="flex flex-col space-y-8">
            <div className="flex w-full flex-col space-y-2">
              <ClientSelectField
                className="text-gray-900 font-bold"
                reference={typeIdRef}
                {...restTypeId}
                placeholder={"Activity Name"}
              >
                {props.types.length > 0 ? (
                  props.types.map((type, index) => (
                    <option key={index} value={type.id}>
                      {type.name}
                    </option>
                  ))
                ) : (
                  <option value="">-- None --</option>
                )}
              </ClientSelectField>
              {errors.name?.message && (
                <FormErrorField message={errors.name.message} />
              )}
            </div>
            <div className="flex w-full flex-col space-y-2">
              <ClientInputField
                reference={nameRef}
                {...restName}
                placeholder={"Activity Name"}
              />
              {errors.name?.message && (
                <FormErrorField message={errors.name.message} />
              )}
            </div>
            <div className="flex w-full flex-col space-y-2">
              <textarea
                className="text-gray-800 font-bold border-[1px] border-slate-400/20 rounded-md px-6 py-4 focus:outline-slate-600/20 sm:text-xl"
                ref={commentRef}
                {...restComment}
                placeholder={"Small Description"}
              />
              {errors.comment?.message && (
                <FormErrorField message={errors.comment.message} />
              )}
            </div>
            <div className="flex w-full flex-col space-y-2">
              <span className="font-bold text-gray-300/90 text-sm">
                * You may add a certain target date in your trip for that
                activity.
              </span>
              <ClientInputField
                reference={targetDateRef}
                {...restTargetDate}
                type={"date"}
              />

              {errors.targetDate?.message && (
                <FormErrorField message={errors.targetDate.message} />
              )}
            </div>
            <Button
              type={"submit"}
              value={"Create New Activity"}
              isLoading={isLoading}
            />
          </div>
        </form>
      </section>
    </>
  );
};

export default NewActivityForm;
