import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Hotels = ({ trip }) => {
    const [hotels, setHotels] = useState([]);
    const [itinerary, setItinerary] = useState([]);

    const val = trip?.tripData || '{}';

    useEffect(() => {
        if (val) {
            try {
                const parsedData = JSON.parse(val);
                setHotels(parsedData.hotels || []);
                setItinerary(parsedData.itinerary || []);
            } catch (error) {
                console.error("Error parsing trip data:", error);
            }
        }
    }, [val]);

    return (
        <div>
            <h1 className="font-bold text-xl mt-5 my-3">Hotels Recommendation</h1>
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
                {hotels.length > 0 ? (
                    hotels.map((hotel, index) => (
                        <Link
                            to={`https://www.google.com/maps/search/?api=1&query=${hotel.name},${hotel.address}`}
                            target="_blank"
                            key={index}
                        >
                            <div className="border p-2 rounded-lg shadow-lg hover:scale-105 transition-all cursor-pointer">
                                <img
                                    src="/trip.jpeg"
                                    alt={hotel.name || "Hotel"}
                                    className="rounded-lg w-full"
                                />
                                <div className="my-2 flex flex-col gap-2">
                                    <h2 className="font-medium">{hotel.name}</h2>
                                    <h2 className="text-xs text-gray-500 font-semibold">📍{hotel.address}</h2>
                                    <h2 className="text-sm font-semibold">💰Price: {hotel.price}</h2>
                                    <h2 className="text-sm font-semibold">⭐Rating: {hotel.rating}</h2>
                                </div>
                            </div>
                        </Link>
                    ))
                ) : (
                    [1,2,3].map((item,index)=>(
                        <div key={index} className="h-[330px] w-full bg-slate-200 animate-pulse rounded-xl">
                        </div>
                    ))
                )}
            </div>
            <div className="mt-10">
                <h2 className="font-bold text-lg my-3">Places to Visit</h2>
                <div className="flex flex-col gap-5">
                    {itinerary.length > 0 ? (
                        itinerary.map((dayPlan, index) => (
                            <div key={index} className="border p-4 rounded-lg shadow-lg">
                                <h2 className="text-lg font-semibold">
                                    {dayPlan.day} - Best Time: {dayPlan.bestTime}
                                </h2>
                                <div className="mt-2 flex flex-col gap-3">
                                    {dayPlan.plan.map((place, placeIndex) => (
                                        <Link
                                            to={`https://www.google.com/maps/search/?api=1&query=${place.placeName},${trip?.userSelection?.place || ''}`}
                                            target="_blank"
                                            key={placeIndex}
                                        >
                                            <div className="flex gap-6 items-start hover:scale-105 transition-all cursor-pointer">
                                                <img
                                                    src="/mountain.jpg"
                                                    alt={place.placeName || "Place"}
                                                    className="rounded-lg w-1/4 object-cover"
                                                />
                                                <div>
                                                    <h4 className="font-semibold">{place.placeName}</h4>
                                                    <p className="text-sm text-gray-600 my-1">{place.placeDetails}</p>
                                                    <p className="text-sm font-semibold">💸 Ticket Price: {place.ticketPricing}</p>
                                                    <p className="text-sm font-semibold">⭐ Rating: {place.rating}</p>
                                                    <p className="text-sm font-semibold">⏳ Time Needed: {place.timeTravel}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        ))
                    ) : (
                        [1,2,3].map((item,index)=>(
                            <div key={index} className="h-[260px] w-full bg-slate-200 animate-pulse rounded-xl">
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Hotels;
