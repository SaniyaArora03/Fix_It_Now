import { useEffect, useState } from "react";

export default function useLocation(){
    const[location,setLocation]=useState(null);
    const[error,setError]=useState(null);
    useEffect(()=>{
        if(!navigator.geolocation){
            setError("Geolocation not supported");
            return;
        }
        navigator.geolocation.getCurrentPosition((pos)=>{
            setLocation({
                lat:pos.coords.latitude,
                lng:pos.coords.longitude
            });
        },
    ()=>setError("Permission denied"));
    },[]);
    return { location, error };
}
