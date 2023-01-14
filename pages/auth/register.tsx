import { useForm } from "react-hook-form";
import FormErrorField from "../../components/auth/form-error-field";
import InputField from "../../components/auth/input-field";
import Button from "../../components/classic/button";
import AuthPageLayout from "../../components/layouts/auth-layouts";
import { IAuthFormInput } from "../../lib/types/auth-form-input.type";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormRequestError from "../../components/auth/form-request-error";
import { useState } from "react";
import { axiosClient } from "../../service/axios.service";

const schema = yup
  .object({
    username: yup.string().required().max(32),
    password: yup.string().required(),
    email: yup.string().required().email(),
  })
  .required();

const RegisterPage = () => {
  const {
    handleSubmit,
    register,
    resetField,
    reset,
    formState: { errors },
  } = useForm<IAuthFormInput>({ resolver: yupResolver(schema) });

  const onsubmit = async (data: IAuthFormInput) => {
    setLoadingState(true);
    setErrorMessage("");

    try {
      const response = await axiosClient
        .post("/auth/register", data)
        .finally(() => {
          setLoadingState(false);
          resetField("password");
        });
      reset();

      const {} = response.data;
      console.log();
    } catch (error) {
      setErrorMessage((error as any).response?.data?.message);
    }
  };

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loadingState, setLoadingState] = useState<boolean>(false);

  const { ref: usernameRef, ...usernameRest } = register("username");
  const { ref: passwordRef, ...passwordRest } = register("password");
  const { ref: emailRef, ...emailRest } = register("email");

  return (
    <AuthPageLayout>
      <form noValidate onSubmit={handleSubmit(onsubmit)}>
        <div className="flex flex-col space-y-10 items-center">
          <div className="flex flex-col space-y-6 items-center">
            <h1 className="font-bold text-4xl sm:text-5xl">Register</h1>
            <p className="sm:text-xl text-center">
              You can register a new account, and start your trip with us!
            </p>
          </div>
          {errorMessage ? <FormRequestError errorMessage={errorMessage} /> : ""}
          <div className="flex space-y-8 flex-col">
            <div className="flex flex-col space-y-2">
              <InputField
                {...usernameRest}
                reference={usernameRef}
                placeholder={"Username"}
              />
              {errors.username?.message ? (
                <FormErrorField message={errors.username?.message} />
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col space-y-2">
              <InputField
                {...passwordRest}
                reference={passwordRef}
                type={"password"}
                placeholder={"Password"}
              />
              {errors.password?.message ? (
                <FormErrorField message={errors.password?.message} />
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col space-y-2">
              <InputField
                {...emailRest}
                reference={emailRef}
                placeholder={"Email"}
              />
              {errors.email?.message ? (
                <FormErrorField message={errors.email?.message} />
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="static">
            <Button
              isLoading={loadingState}
              type={"submit"}
              className={"text-xl"}
              value={"Register now!"}
            />
          </div>
        </div>
      </form>
    </AuthPageLayout>
  );
};

export default RegisterPage;
