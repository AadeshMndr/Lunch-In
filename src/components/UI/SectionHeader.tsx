import { HTMLAttributes } from "react";
import { twMerge } from "tailwind-merge";

const name: HTMLAttributes<HTMLDivElement>["className"] = ""

import Title from "./Title";

interface Props {
  text: string;
  classNameForOuterDiv?: HTMLAttributes<HTMLDivElement>["className"];
  classNameForInnerDiv?: HTMLAttributes<HTMLDivElement>["className"];
  classNameForTitle?: HTMLAttributes<HTMLHeadingElement>["className"];
}

const SectionHeader: React.FC<Props> = ({ text, classNameForInnerDiv="", classNameForOuterDiv="", classNameForTitle="" }) => {
  return (
    <div className={twMerge("w-full mt-5 flex justify-between gap-1", classNameForOuterDiv)}>
      <div className={twMerge("flex-1 h-[2px] bg-black translate-y-4", classNameForInnerDiv)}></div>
      <Title size={"medium"} className={twMerge("bg-transparent w-max mx-auto", classNameForTitle)}>
        { text }
      </Title>
      <div className={twMerge("flex-1 h-[2px] bg-black translate-y-4", classNameForInnerDiv)}></div>
    </div>
  );
};

export default SectionHeader;
