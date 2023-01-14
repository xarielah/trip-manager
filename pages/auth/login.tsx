import { useForm, Controller } from "react-hook-form";
import InputField from "../../components/auth/input-field";
import Button from "../../components/classic/button";
import AuthPageLayout from "../../components/layouts/auth-layouts";
import { IAuthFormInput } from "../../lib/types/auth-form-input.type";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormErrorField from "../../components/auth/form-error-field";
import { axiosClient } from "../../service/axios.service";
import { useState } from "react";
import FormRequestError from "../../components/auth/form-request-error";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setUser } from "../../app/slices/authSlice";

const schema = yup
  .object({
    username: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const LoginPage = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<IAuthFormInput>({ resolver: yupResolver(schema) });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [loadingState, setLoadingState] = useState<boolean>(false);

  const { ref: usernameRef, ...usernameRest } = register("username");
  const { ref: passwordRef, ...passwordRest } = register("password");

  const router = useRouter();
  const dispatch = useDispatch();

  const onsubmit = async (data: IAuthFormInput): Promise<void> => {
    setLoadingState(true);
    setErrorMessage("");
    reset();

    try {
      const response = await axiosClient
        .post("/auth/login", data)
        .finally(() => {
          setLoadingState(false);
        });

      dispatch(setUser(response.data));
      router.push("/client-area");
    } catch (error) {
      // const errorCode = (error as any)?.response?.status;
      setErrorMessage((error as any).response?.data?.message);
    }
  };

  return (
    <AuthPageLayout>
      <form noValidate onSubmit={handleSubmit(onsubmit)}>
        <div className="flex flex-col space-y-10 items-center">
          <div className="flex flex-col space-y-6 items-center">
            <h1 className="font-bold text-4xl sm:text-5xl">Login</h1>
            <p className="md:text-xl text-center">
              You can login and start your trip with us!
            </p>
          </div>
          {errorMessage ? (
            <FormRequestError errorMessage={errorMessage} />
          ) : (
            " "
          )}
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
          </div>
          <div>
            <Button
              type={"submit"}
              className={"text-xl"}
              isLoading={loadingState}
              value={"Login now!"}
            />
          </div>
        </div>
      </form>
    </AuthPageLayout>
  );
};

export default LoginPage;
