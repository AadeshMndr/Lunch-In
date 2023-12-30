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

            const position = {
                lat: 27.698916653445256, 
                lng: 85.31014236171056
            }

            const map = new Map(mapRef.current!, {
                center: position,
                zoom: 17,
                mapId: "super secret ID",
            });
        }

        initMap();

    }, []);

    return <div ref={mapRef} className="h-80" />
}

export default GoogleMaps;