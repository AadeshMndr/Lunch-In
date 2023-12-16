"use client";

import { useState } from "react";

const useSearch = <T>(searchList: T[]) => {
    const [searchKeys, setSearchKeys] = useState<string>("");

    const search = (key: string) => {
        setSearchKeys(key);
    }

    return ({ search });
}   

export default useSearch;