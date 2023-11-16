"use client";

import { useState, useEffect } from "react";

const getDimension = () => {
    try {
        if (window === undefined) {
          return { width: 0, height: 0 };
        } else {
          return { width: window.innerWidth, height: window.innerHeight };
        }
    } catch (error){
        return { width: 0, height: 0 };
    }
};

export const useWindowDimension = () => {
  const [dimensions, setDimensions] = useState(() => getDimension());

  useEffect( () => {
    const changeDimension =  () => {
        setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }

    window.addEventListener("resize", changeDimension);

    return () => {
        window.removeEventListener("resize", changeDimension);
    }
  }, []);

  return dimensions;
};
