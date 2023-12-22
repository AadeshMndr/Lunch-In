"use client";

import { useForm, SubmitHandler } from "react-hook-form";

import ErronousP from "../UI/ErronousP";
import Button from "../UI/Button";
import MealSelection from "./MealSelection";

interface Props {}

interface InputField {
  name?: string;
  message: string;
}

const ReviewBox: React.FC<Props> = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<InputField>();

  const submitHandler: SubmitHandler<InputField> = ({ message, name }) => {
    console.log("The message is: ", message, name);
  };

  return (
    <div className="pc:w-[50%] mobile:w-[95%] rounded-md p-3 mx-auto shadow-lg my-4 text-orange-900 bg-gradient-to-br from-primaryBrown300 to-transparent">
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="flex flex-col justify-around gap-y-4 items-center"
      >
        <label htmlFor="customerName" className="text-xl font-bold self-start">
          Enter your name:{" "}
        </label>
        <input
          {...register("name")}
          type="text"
          placeholder="(optional)"
          id="customerName"
          className="bg-primaryBrown focus:ring-2 ring-orange-900 p-2 rounded-md w-full focus:outline-none placeholder:text-primaryOrange"
        />
        <label htmlFor="userReview" className="text-xl font-bold self-start">
          How was your meal?
        </label>
        <textarea
          rows={3}
          id="userReview"
          className="bg-primaryBrown focus:ring-2 ring-orange-900 p-3 rounded-md w-full focus:outline-none"
          {...register("message", {
            required: "You cannot leave an empty reply!",
          })}
        />
        {errors.message && <ErronousP message={errors.message.message} />}
        <MealSelection />
        <Button
          type="submit"
          size={"medium"}
          colorScheme={"inversePrimaryOrange"}
          className="max-w-fit self-end"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ReviewBox;
