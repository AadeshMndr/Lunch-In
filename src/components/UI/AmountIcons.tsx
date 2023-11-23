"use client";

import { BatteryFull, BatteryMedium } from "lucide-react";

interface Props {
    quantity: "full" | "half",
    toggleQuantity: () => void,
}

const AmountIcons: React.FC<Props> = ({ quantity, toggleQuantity }) => {

    return (quantity === "full" ? (
        <BatteryFull
          width={30}
          height={30}
          className="-rotate-90 hover:scale-[1.03]"
          onClick={toggleQuantity}
        />
      ) : (
        <BatteryMedium
          width={30}
          height={30}
          className="-rotate-90 hover:scale-[1.03]"
          onClick={toggleQuantity}
        />
      ))
}

export default AmountIcons;