"use client";

import { useRef, useEffect } from "react";

import  { Loader } from "@googlemaps/js-api-loader";

interface Props {

}

const GoogleMaps:React.FC<Props> = () => {
    const mapRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const initMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
                version: "weekly",
            });

            const { Map } = await  loader.importLibrary("maps");

            const { Marker } = await loader.importLibrary("marker");

            const position = {
                lat: 27.698916653445256, 
                lng: 85.31014236171056
            }

            const map = new Map(mapRef.current!, {
                center: position,
                zoom: 18,
                mapId: "c60f46a662925ce1",
            });

            const marker = new Marker({
                map,
                position,
            });
        }

        initMap();

    }, []);

    return <div ref={mapRef} className="h-96 w-[90%] mx-auto rounded-lg" />
}

export default GoogleMaps;