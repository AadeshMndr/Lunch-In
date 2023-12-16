"use client";

import { useState, useEffect } from "react";

const useSearch = <T extends { id: string }>(searchList: T[], keys: (keyof T)[]) => {
    const [searchKeys, setSearchKeys] = useState<string>("");

    const [filteredList, setFilteredList] = useState<T[]>(searchList);

    useEffect( () => {
        let count = 0;

        searchList.forEach( (item) => {
            if (keys.some( (key) => {
                const value = item[key];

                return typeof value === "string" && value.toLocaleUpperCase().startsWith(searchKeys.trim().toLocaleUpperCase());
            })){
                count++;
                setFilteredList((prevState) => prevState.includes(item) ? prevState :  [...prevState, item]);
            } else {
                setFilteredList( (prevState) => prevState.filter( (oldItem) => oldItem.id !== item.id ) )
            }
        });

        if (searchKeys.trim().length >= 3 && count === 0 ){
            searchList.forEach( (item) => {
                if (keys.some( (key) => {
                    const value = item[key];
    
                    return typeof value === "string" && value.toLocaleUpperCase().includes(searchKeys.trim().toLocaleUpperCase());
                })){
                    count++;
                    setFilteredList((prevState) => prevState.includes(item) ? prevState :  [...prevState, item]);
                } else {
                    setFilteredList( (prevState) => prevState.filter( (oldItem) => oldItem.id !== item.id ) )
                }
            })
        }

        if (searchKeys.trim().length === 0){
            setFilteredList(searchList);
        }
      
    }, [searchKeys, keys, searchList]);

    const search = (key: string) => {
        setSearchKeys(key);
    }

    return ({ search, filteredList });
}   

export default useSearch;