"use client";

import { InputHTMLAttributes, useState } from "react";
import { CircleSlash2, Circle } from "lucide-react";

interface Props {
  type: InputHTMLAttributes<HTMLInputElement>["type"];
  id: InputHTMLAttributes<HTMLInputElement>["id"],
}

const BranchableInput: React.FC<Props> = ({ type, id }) => {
  const [branchOut, setBranchOut] = useState<boolean>(false);

  const toggle = () => {
    setBranchOut((prevState) => !prevState);
  };

  const style = "w-full rounded-md p-2 focus:outline-none bg-orange-200 leading-6 text-orange-950 font-semibold";

  return (
    <div className="flex w-full justify-around items-center gap-2">
      {branchOut ? (
        <div className="flex flex-col gap-2 items-center justify-evenly">
          <div className="flex gap-3 items-center">
            <label htmlFor={`full-${id}`}>Full: </label>
            <input type={type} className={style} id={`full-${id}`} />
          </div>
          <div className="flex gap-3 items-center">
            <label htmlFor={`half-${id}`}>Half: </label>
            <input type={type} className={style} id={`half-${id}`} />
          </div>
        </div>
      ) : (
        <input type={type} className={style} id={id} />
      )}
      {branchOut ? (
        <Circle width={20} height={20} onClick={toggle} />
      ) : (
        <CircleSlash2 width={20} height={20} onClick={toggle} />
      )}
    </div>
  );
};

export default BranchableInput;
