"use client";

import { useState } from "react";
import { CheckCircle2, XCircle } from "lucide-react";

import { isWithinOpeningHours } from "@/lib/utils";

interface Props {}

const OpeningTime: React.FC<Props> = () => {
  const [stillOpen, setStillOpen] = useState<boolean>(isWithinOpeningHours());

  return (
    <div className="w-full flex pc:flex-row mobile:flex-col mobile:gap-y-5 items-center justify-center pc:gap-x-60">
      <div className="bg-primaryBrown p-2 rounded-md flex flex-col justify-center items-center text-lg">
        <div className="flex flex-row justify-center items-center gap-x-2">
          <span className="text-orange-900">From </span>
          <span className="font-semibold">Sun - Fri</span>
        </div>
        <div className="flex flex-row justify-center items-center gap-x-2">
          <span className="text-orange-900">Opening Hours:</span>
          <span className="font-semibold">10:00 AM - 7:30PM</span>
        </div>
      </div>
      {stillOpen ? (
        <div className="flex flex-row items-center gap-x-3 pc:-translate-x-16">
          <CheckCircle2 className="text-green-500" width={40} height={40} />
          <span className="text-2xl font-bold">Open</span>
        </div>
      ) : (
        <div className="flex flex-row items-center gap-x-3 pc:-translate-x-16">
          <XCircle className="text-red-500" width={40} height={40} />
          <span className="text-2xl font-bold">Closed</span>
        </div>
      )}
    </div>
  );
};

export default OpeningTime;
