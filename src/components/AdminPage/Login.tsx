"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react";

import Button from "../UI/Button";

interface FieldValues {
  username: string;
  password: string;
}

interface Props {}

const LoginForm: React.FC<Props> = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FieldValues>();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [visible, setVisible] = useState<boolean>(false);

  const router = useRouter();

  const submitHandler: SubmitHandler<FieldValues> = async ({
    username,
    password,
  }) => {
    setIsLoading(true);

    const response = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });

    if (response === undefined) {
      console.log("Authorization Failed due to client-side error");
      toast.error("Authorization Failed due to client-side error");

      setIsLoading(false);
      return;
    }

    if (!response.ok) {
      console.log("Authorization failed  due to invalid Credentials!");
      toast.error("Invalid Credentials !");
      setError("root", {
        message: "The username or the password you entered is incorrect !",
      });

      setIsLoading(false);
      return;
    }

    const url = new URL(decodeURI(response.url || ""));

    toast.success("Admin Access Granted !");

    if (url.searchParams.size >= 1) {
      const urlToBeRedirectedTo = new URL(
        url.searchParams.get("callbackUrl") || "http://localhost:3000/"
      );

      router.push(urlToBeRedirectedTo.pathname);

      setIsLoading(false);

      return;
    }

    setIsLoading(false);

    router.push("/");
  };

  const toggleVisibility = () => {
    setVisible((prevState) => !prevState);
  };

  return (
    <form
      onSubmit={handleSubmit(submitHandler)}
      className="flex flex-col justify-evenly shadow-lg m-5 p-5 bg-black rounded-lg text-primaryBrown [&>div>input]:rounded-md [&>div>input]:w-full"
    >
      <div className="m-2">
        <label htmlFor="username" className="text-lg">
          username:{" "}
        </label>
        <input
          {...register("username", {
            required: "The username is required !",
          })}
          type="text"
          id="username"
          className="focus:outline-none bg-primaryBrown text-black font-semibold mt-1 p-1"
        />
        {errors.username && (
          <p className="text-red-500 mt-2">{errors.username?.message}</p>
        )}
      </div>
      <div className="m-2">
        <label htmlFor="password" className="text-lg">
          password:{" "}
        </label>
        <div className="relative">
          <input
            {...register("password", {
              required: "The password is required !",
            })}
            type={visible ? "text" : "password"}
            id="password"
            className="w-full pr-8 rounded-md focus:outline-none bg-primaryBrown text-black font-semibold mt-1 p-1"
          />
          {visible ? (
            <EyeOff
              width={20}
              height={20}
              onClick={toggleVisibility}
              className="absolute top-2.5 right-2 text-black"
            />
          ) : (
            <Eye
              width={20}
              height={20}
              onClick={toggleVisibility}
              className="absolute top-2.5 right-2 text-black"
            />
          )}
        </div>
        {errors.password && (
          <p className="text-red-500 mt-2">{errors.password.message}</p>
        )}
      </div>
      <Button className="self-end" size={"medium"} disabled={isLoading}>
        <div className="flex gap-2 items-center">
          {isLoading && (
            <Loader2 width={20} height={20} className="animate-spin" />
          )}{" "}
          login
        </div>
      </Button>
      {errors.root && (
        <p className="text-red-500 mt-2">{errors.root.message}</p>
      )}
    </form>
  );
};

export default LoginForm;
