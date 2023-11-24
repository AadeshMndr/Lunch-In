"use client";

import { ChangeEventHandler, useState } from "react";
import Image from "next/legacy/image";
import { useForm, SubmitHandler, SubmitErrorHandler, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Meal, keyArray, getProperNameOfKeys, PriceKey } from "@/models/Meal";
import { mealFormInputFieldSchema, MealFormInput } from "@/models/MealForm";
import { getUnrepeatedArray, readAsDataURLAsync } from "@/lib/utils";
import BranchableInput from "../UI/BranchableInput";
import Button from "../UI/Button";
import ErronousP from "../UI/ErronousP";

interface Props {
  meals: Meal[];
}

const MealForm: React.FC<Props> = ({ meals }) => {
  const [choosenKeys, setChoosenKeys] = useState<PriceKey[]>([]);

  const [preview, setPreview] = useState<
    string | ArrayBuffer | null | undefined
  >(null);

  const {
    register,
    watch,
    handleSubmit,
    setError,
    resetField,
    formState: { errors, isSubmitting },
    clearErrors,
  } = useForm<MealFormInput>({
    resolver: zodResolver(mealFormInputFieldSchema),
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

  const submitHandler: SubmitHandler<MealFormInput> = (meal) => {
    if(Object.keys(errors).length > 0){
      console.log("The form still has errors !", errors);

      return;
    }

    console.log(meal);
  };

  const setupPreview: ChangeEventHandler<HTMLInputElement> = async (event) => {
    if (event.target.files) {
      if (event.target.files.length !== 0) {
        const type = event.target.files[0].type.split("/")[0];

        if (type !== "image") {
          setPreview(null);

          setError("image", { message: "Only image files are accepted!" });

          return;
        }

        try {
          const imageUrl = await readAsDataURLAsync(event.target.files[0]);

          setPreview(imageUrl);

          clearErrors("image");
        } catch (err) {
          console.log(err);
          setError("image", { message: "Invalid Image File" });
        }
      } else {
        setPreview(null);

        setError("image", { message: "Upload an image file ." });
      }
    }
  };

  const tester: SubmitErrorHandler<MealFormInput> = (obj) => {
    console.log("Error");
  };


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
                />
              </div>
            ))}
          </div>
        )}
      </div>
      {errors.price && !("half" in errors.price) && !("full" in errors.price) && <ErronousP message={errors.price.message} />}
      {errors.price && ("half" in errors.price) && <ErronousP message={(errors.price.half as FieldError).message} />}
      {errors.price && ("full" in errors.price) && <ErronousP message={(errors.price.full as FieldError).message} />}
      <div className="flex flex-row gap-3 items-center text-orange-950 mt-5">
        <label htmlFor="image" className="text-lg font-semibold">
          Image:{" "}
        </label>
        <input
          {...register("image")}
          id="image"
          accept="image/*"
          type="file"
          onChange={setupPreview}
          className="w-full rounded-md p-2 focus:outline-none bg-orange-200 leading-6 text-orange-950 font-semibold"
        />
      </div>
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
      {errors.image && (
        <ErronousP
          message={
            typeof errors.image.message === "string"
              ? errors.image.message
              : "Invalid image file !"
          }
        />
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

export default MealForm;
