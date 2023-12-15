"use client";

import { ChangeEventHandler, useState, useEffect } from "react";
import Image from "next/legacy/image";
import { useRouter } from "next/navigation";
import {
  useForm,
  SubmitHandler,
  SubmitErrorHandler,
  FieldError,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";
import { nanoid } from "nanoid";

import {
  Meal,
  keyArray,
  getProperNameOfKeys,
  PriceKey,
  MealSchema,
} from "@/models/Meal";
import {
  mealFormInputFieldSchema,
  MealFormInput,
  QuantitativePriceSchema,
} from "@/models/MealForm";
import {
  getUnrepeatedArray,
  readAsDataURLAsync,
  convertToNumberObject,
  imageFileValidator,
} from "@/lib/utils";
import BranchableInput from "../UI/BranchableInput";
import Button from "../UI/Button";
import ErronousP from "../UI/ErronousP";

interface Props {
  meals: Meal[];
  defaultValues: MealFormInput;
  originalID: string;
}

const EditForm: React.FC<Props> = ({ meals, defaultValues, originalID }) => {
  const [choosenKeys, setChoosenKeys] = useState<PriceKey[]>(
    typeof defaultValues.price === "string" ? [] :
    Object.keys(defaultValues.price) as PriceKey[]
  );

  const [changeImage, setChangeImage] = useState<boolean>(false);
  const [imageError, setImageError] = useState<undefined | { message: string }>(
    undefined
  );

  const [preview, setPreview] = useState<
    string | ArrayBuffer | null | undefined
  >(defaultValues.image);

  useEffect(() => {
    if (changeImage) {
      setPreview(null);
    } else {
      setImageError(undefined);
      setPreview(defaultValues.image);
    }
  }, [changeImage, defaultValues.image]);

  const router = useRouter();

  const {
    register,
    watch,
    handleSubmit,
    setError,
    resetField,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<Omit<MealFormInput, "image">>({
    resolver: zodResolver(mealFormInputFieldSchema),
    defaultValues,
  });

  const dealWithKeyCheckBox = (key: PriceKey) => {
    setChoosenKeys((prevState) => {
      if (prevState.includes(key)) {
        resetField(`price.${key}`);
        return prevState.filter((oldKey) => oldKey !== key);
      } else if (key === "nonVeg") {
        prevState
          .filter((tkey) => tkey !== "veg")
          .forEach((tkey) => {
            resetField(`price.${tkey}`);
          });
        return ["veg", "nonVeg"];
      } else if (key === "veg") {
        return [...prevState, key];
      } else {
        resetField("price.nonVeg");
        return [...prevState.filter((oldKey) => oldKey !== "nonVeg"), key];
      }
    });
  };

  const sectionsList = getUnrepeatedArray<string>(
    meals
      .filter(({ category }) =>
        watch("category") ? category === watch("category") : true
      )
      .map(({ section }) => section)
  );

  const setupPreview: ChangeEventHandler<HTMLInputElement> = async (event) => {
    if (event.target.files) {
      if (event.target.files.length !== 0) {
        const type = event.target.files[0].type.split("/")[0];

        if (type !== "image") {
          setPreview(null);

          setImageError({ message: "Only image files are accepted!" });

          return;
        }

        try {
          const imageUrl = await readAsDataURLAsync(event.target.files[0]);

          setImageError(undefined);
          setPreview(imageUrl);
        } catch (err) {
          console.log(err);
          setImageError({ message: "Invalid Image File" });
        }
      } else {
        setPreview(null);

        setImageError({ message: "Upload an image file ." });
      }
    }
  };

  const submitHandler: SubmitHandler<MealFormInput> = async (meal) => {
    if (preview === null) {
      setImageError({ message: "No Image file selected !" });
      return;
    }

    let image = preview;

    if (Object.keys(errors).length > 0) {
      const erronousKeys = Object.keys(errors);

      if (
        erronousKeys.length === 1 &&
        erronousKeys.includes("price") &&
        choosenKeys.every((key) => {
          const result = QuantitativePriceSchema.safeParse(
            watch(`price.${key}`)
          );

          return result.success;
        })
      ) {
        let watchedPrice = new Object();

        choosenKeys.forEach((key) => {
          (watchedPrice as any)[key] = watch(`price.${key}`);
        });

        meal.price = watchedPrice;
        
      } else {
        console.log("The form still has errors !", errors);

        toast.error("Meal Form couldn't be submitted !");
        return;
      }
    }

    let watchedPrice = new Object();

    choosenKeys.forEach((key) => {
        (watchedPrice as any)[key] = watch(`price.${key}`);
    });

    meal.price = watchedPrice;

    const parsedData = MealSchema.safeParse({
      ...meal,
      price: convertToNumberObject(meal.price),
      image,
      id: originalID,
    } as Meal);

    if (!parsedData.success) {
      console.log("Some Error occured !: ", parsedData.error);

      toast.error("Meal Form couldn't be submitted !");

      return;
    }

    mutate(parsedData.data);

    toast.success("Meal Submission Successfull !");

    //do optimistic updating over here.....later....
    router.push("/menu");
  };

  const tester: SubmitErrorHandler<MealFormInput> = (obj) => {
    toast.error("Meal Form couldn't be submitted !");
    console.log("Error");
  };

  const { mutate } = useMutation({
    mutationFn: async (data: Meal) => {
      const response = await fetch(`/api/meal/${data.id}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        console.log("Couldn't get a proper response from the server !");
        toast.error("Couldn't edit the dish!");
        return;
      }
    },
  });

  return (
    <form
      className="p-5 flex flex-col"
      onSubmit={handleSubmit(submitHandler, tester)}
    >
      <div className="flex flex-row gap-3 items-center text-orange-950 mt-5">
        <label htmlFor="name" className="text-lg font-semibold">
          Name:{" "}
        </label>
        <input
          {...register("name")}
          id="name"
          type="text"
          className="w-full rounded-md p-2 focus:outline-none bg-orange-200 leading-6 text-orange-950 font-semibold"
        />
      </div>
      {errors.name && <ErronousP message={errors.name.message} />}
      <div className="flex flex-row gap-3 items-center text-orange-950 mt-5">
        <span className="text-lg font-semibold">Category: </span>
        <div className="flex justify-evenly items-center">
          <div className="flex gap-1 mx-8 items-center">
            <input
              {...register("category")}
              id="food"
              type="radio"
              name="category"
              value={"food"}
              className="w-4 h-4 translate-y-[1px] accent-primaryOrange"
            />
            <label htmlFor="food">Food</label>
          </div>
          <div className="flex gap-1 mx-8 items-center">
            <input
              {...register("category")}
              id="drinks"
              type="radio"
              name="category"
              value={"drinks"}
              className="w-4 h-4 translate-y-[1px] accent-primaryOrange"
            />
            <label htmlFor="food">Drinks</label>
          </div>
        </div>
      </div>
      {errors.category && <ErronousP message={errors.category.message} />}
      <div className="flex flex-row gap-3 items-center text-orange-950 mt-5">
        <label htmlFor="section" className="text-lg font-semibold">
          Section:{" "}
        </label>
        <input
          {...register("section")}
          id="section"
          type="text"
          className="w-full rounded-md p-2 focus:outline-none bg-orange-200 leading-6 text-orange-950 font-semibold"
          list="sectionlist"
        />
        <datalist id="sectionlist">
          {sectionsList.map((section) => (
            <option key={section} value={section}>
              {section}
            </option>
          ))}
        </datalist>
      </div>
      {errors.section && <ErronousP message={errors.section.message} />}
      <div className="flex flex-col gap-1 text-orange-950 mt-5">
        <label htmlFor="price" className="text-lg font-semibold">
          Price:{" "}
        </label>
        <div className="flex justify-around items-center my-2">
          <div className="grid grid-cols-1 gap-1">
            <div className="flex gap-1 items-center">
              <input
                type="checkbox"
                value={"veg"}
                checked={choosenKeys.includes("veg")}
                onChange={() => dealWithKeyCheckBox("veg")}
              />
              <span>veg</span>
            </div>
            <div className="flex gap-1 items-center">
              <input
                type="checkbox"
                value={"nonVeg"}
                checked={choosenKeys.includes("nonVeg")}
                onChange={() => dealWithKeyCheckBox("nonVeg")}
              />
              <span>non-veg</span>
            </div>
          </div>
          <div className="grid pc:grid-cols-7 mobile:grid-cols-3 gap-1 border-l-2 border-orange-950 pl-5">
            {keyArray
              .filter((key) => !["veg", "nonVeg", "full", "half"].includes(key))
              .map((key) => (
                <div className="flex gap-1" key={`${key}-checkbox`}>
                  <input
                    type="checkbox"
                    value={key}
                    checked={choosenKeys.includes(key)}
                    onChange={() => dealWithKeyCheckBox(key)}
                  />
                  <span>{getProperNameOfKeys(key)}</span>
                </div>
              ))}
          </div>
        </div>

        {choosenKeys.length <= 1 ? (
          <BranchableInput
            type="number"
            id="price"
            register={register}
            resetField={resetField}
            watch={watch}
            setError={setError}
            clearError={clearErrors}
            isSubmitting={isSubmitting}
            defaultCondition={
              defaultValues && typeof defaultValues.price !== "string"
                ? "full" in defaultValues.price
                : false
            }
          />
        ) : (
          <div className="flex flex-col items-center gap-1">
            {choosenKeys.map((key) => (
              <div
                className="flex flex-row items-center gap-2 my-3"
                key={`input-${key}`}
              >
                <label
                  htmlFor={key}
                  className="font-semibold min-w-max"
                >{`${getProperNameOfKeys(key)}: `}</label>
                <BranchableInput
                  type="number"
                  id={key}
                  register={register}
                  resetField={resetField}
                  watch={watch}
                  setError={setError}
                  clearError={clearErrors}
                  isSubmitting={isSubmitting}
                  defaultCondition={
                    defaultValues &&
                    typeof defaultValues.price[
                      key as keyof typeof defaultValues.price
                    ] !== "string" &&
                    defaultValues.price[key as keyof typeof defaultValues.price]
                      ? "full" in defaultValues.price[key as keyof typeof defaultValues.price]
                      : false
                  }
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {errors.price &&
        !("half" in errors.price) &&
        !("full" in errors.price) && (
          <ErronousP message={errors.price.message} />
        )}
      {errors.price && "half" in errors.price && (
        <ErronousP message={(errors.price.half as FieldError).message} />
      )}
      {errors.price && "full" in errors.price && (
        <ErronousP message={(errors.price.full as FieldError).message} />
      )}
      <Button
        colorScheme={"inputField"}
        type="button"
        onClick={() => setChangeImage((prevState) => !prevState)}
        className="mt-4"
      >
        Edit image
      </Button>
      {changeImage && (
        <div className="flex flex-row gap-3 items-center text-orange-950 mt-5">
          <label htmlFor="image" className="text-lg font-semibold">
            Image:{" "}
          </label>
          <input
            //   {...register("image")}
            id="image"
            accept="image/*"
            type="file"
            onChange={setupPreview}
            className="w-full rounded-md p-2 focus:outline-none bg-orange-200 leading-6 text-orange-950 font-semibold"
          />
        </div>
      )}

      {typeof preview === "string" && (
        <div className="w-full mobile:h-32 pc:h-48 relative mt-5">
          <Image
            src={preview}
            alt="Preview Image"
            layout="fill"
            objectFit="contain"
          />
        </div>
      )}
      {imageError && (
        <ErronousP message={imageError.message || "Invalid image file !"} />
      )}
      <div className="flex flex-col gap-3 items-center text-orange-950 mt-5">
        <label
          htmlFor="description"
          className="self-start text-lg font-semibold"
        >
          Description:{" "}
        </label>
        <textarea
          {...register("description")}
          rows={3}
          id="description"
          className="w-full rounded-md p-2 focus:outline-none bg-orange-200 leading-6 text-orange-950 font-semibold"
        />
      </div>
      {errors.description && <ErronousP message={errors.description.message} />}
      {errors.root && <ErronousP message={errors.root.message} />}
      <Button colorScheme={"inversePrimaryOrange"} className="self-end mt-5">
        Submit
      </Button>
    </form>
  );
};

export default EditForm;
