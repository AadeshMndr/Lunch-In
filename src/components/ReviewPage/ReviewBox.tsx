"use client";

import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { Star, ArrowLeft } from "lucide-react";
import { nanoid } from "nanoid";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { ReviewSchema, Review } from "@/models/Review";
import ErronousP from "../UI/ErronousP";
import Button from "../UI/Button";
import MealSelection from "./MealSelection";
import { personNamer } from "@/lib/utils";
import { queryClient } from "@/lib/tanstack";

interface Props {
  setAddReview: Dispatch<SetStateAction<boolean>>;
}

interface InputField {
  name?: string;
  message: string;
}

const ReviewBox: React.FC<Props> = ({ setAddReview }) => {
  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    formState: { errors },
  } = useForm<InputField>();

  const [mealIds, setMealIds] = useState<string[]>([]);

  const [rating, setRating] = useState<number>(0);

  const router = useRouter();

  const closeModal = () => {
    setAddReview(false);
  };

  useEffect(() => {
    setFocus("message");
  }, [setFocus]);

  const { mutate, isPending } = useMutation<any, any, Review, Review[]>({
    mutationFn: async (review) => {
      const response = await fetch("/api/review", {
        method: "POST",
        body: JSON.stringify(review),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log("Couldn't POST the review to the DB!");
        toast.error("Couldn't add the review!");
        return;
      }

      toast.success("Review added successfully!");

      //go to the reviews page here
      router.push("/");

      return;
    },
    onMutate: async (review) => {
      await queryClient.cancelQueries({ queryKey: ["reviews"] });

      const cacheData = queryClient.getQueryData<Review[]>(["reviews"]) || [];

      queryClient.setQueryData(["reviews"], [...cacheData, review]);

      return cacheData;
    },
    onError: async (error, variables, context) => {
      queryClient.setQueryData(["reviews"], context);
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ["reviews"] });
    },
  });

  const submitHandler: SubmitHandler<InputField> = ({ message, name }) => {
    if (rating === 0) {
      setError("root", { message: "Please leave a rating" });
      return;
    }

    const parsedData = ReviewSchema.safeParse({
      name: personNamer(name),
      message,
      selectedMealIds: mealIds,
      rating,
      id: nanoid(),
    });

    if (!parsedData.success) {
      console.log("Unable to send this review! Due to Zod validation error!");
      return;
    }

    mutate(parsedData.data);
  };

  return (
    <div className="pc:w-[50%] mobile:w-[95%] rounded-md p-3 mx-auto shadow-lg my-4 text-orange-900 bg-gradient-to-br from-[#af6e3f] to-primaryBrown">
      <div className="flex flex-row items-center gap-x-2 mb-3" onClick={closeModal}>
        <ArrowLeft width={18} height={18} />
        <span>Go Back</span>
      </div>
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
        <span className="text-xl font-bold self-start">
          What dish would you recommend others?
        </span>
        <MealSelection mealIds={mealIds} setMealIds={setMealIds} />
        <span className="text-xl font-bold">Leave an overall rating</span>
        <div className="flex flex-row justify-evenly items-center gap-x-4">
          <Star
            width={30}
            height={30}
            fill={rating > 0 ? "#edb305" : "transparent"}
            onClick={() =>
              setRating((prevState) => (prevState === 1 ? prevState - 1 : 1))
            }
          />
          <Star
            width={30}
            height={30}
            fill={rating > 1 ? "#edb305" : "transparent"}
            onClick={() =>
              setRating((prevState) => (prevState === 2 ? prevState - 1 : 2))
            }
          />
          <Star
            width={30}
            height={30}
            fill={rating > 2 ? "#edb305" : "transparent"}
            onClick={() =>
              setRating((prevState) => (prevState === 3 ? prevState - 1 : 3))
            }
          />
          <Star
            width={30}
            height={30}
            fill={rating > 3 ? "#edb305" : "transparent"}
            onClick={() =>
              setRating((prevState) => (prevState === 4 ? prevState - 1 : 4))
            }
          />
          <Star
            width={30}
            height={30}
            fill={rating > 4 ? "#edb305" : "transparent"}
            onClick={() =>
              setRating((prevState) => (prevState === 5 ? prevState - 1 : 5))
            }
          />
        </div>
        {errors.root && <ErronousP message={errors.root.message} />}
        <Button
          type="submit"
          size={"medium"}
          colorScheme={"primaryOrange"}
          className="max-w-fit self-end"
          isLoading={isPending}
          disabled={isPending}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default ReviewBox;
