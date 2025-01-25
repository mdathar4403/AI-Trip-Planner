import { Input } from "@/components/ui/input";
import { AI_PROMPT, SelectBudgetOptions, SelectTravelesList } from "@/constants/options";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Swal from 'sweetalert2';
import { FcGoogle } from "react-icons/fc";
import { chatSession } from "@/service/AIModel";
import { useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { doc, setDoc } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogClose,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { db } from "@/service/firebaseConfig";
import { useNavigate } from "react-router-dom";


const CreateTrip = () => {
    const [place, setPlace] = useState("");
    const [days, setDays] = useState("");
    const [budget, setBudget] = useState("");
    const [travelers, setTravelers] = useState("");
    const [formData, setFormData] = useState({});
    const [openDialog, setOpenDialog] = useState(false);

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    const closeTab = ()=>{
        setOpenDialog(false);
    }

    // Function to update formData
    const updateFormData = (key, value) => {
        setFormData((prevData) => ({ ...prevData, [key]: value }));
    };

    const login = useGoogleLogin({
        onSuccess: tokenResponse => GetUserProfile(tokenResponse),
        onError: error => console.log(error)
    });

    const GetUserProfile = (tokenInfo) => {
        axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
            headers: {
                Authorization: `Bearer ${tokenInfo?.access_token}`,
                Accept: 'Application/json'
            }
        }).then((resp) => {
            console.log(resp);
            localStorage.setItem('user', JSON.stringify(resp.data));
            setOpenDialog(false);
            handleGenerateTrip();
        })
    }
    const handleGenerateTrip = async () => {

        const user = localStorage.getItem('user');

        if (!user) {
            setOpenDialog(true);
            return;
        }

        if (formData.days <= 0) {
            Swal.fire({
                title: "Enter no of Days greater than 0",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "OK!"
            })
            return;
        }
        else if (formData.days >= 5) {
            Swal.fire({
                title: "Enter no of Days less than 5",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!"
            })
            return;
        }
        else if (!formData?.place || !formData?.budget || !formData?.travelers || !formData?.days) {
            Swal.fire({
                title: "Please enter all Details",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "OK"
            })
            return;
        }
        setLoading(true);
        const FINAL_PROMPT = AI_PROMPT
            .replace('{place}', formData?.place)
            .replace('{days}', formData?.days)
            .replace('{budget}', formData?.budget)
            .replace('{travelers}', formData?.travelers)
            .replace('{days}', formData?.days)

        console.log("Form Data:", FINAL_PROMPT);

        // const apiKey = import.meta.env.GEMINI_API_KEY;
        // console.log(apiKey);

        const result = await chatSession.sendMessage(FINAL_PROMPT);
        // console.log("hi");
        setLoading(false);
        console.log(result?.response?.text());
        SaveAiTrip(result?.response.text());
        // You can now send formData to an API or handle it as required
    };

    const SaveAiTrip = async (TripData) => {
        setLoading(true);
        const user = JSON.parse(localStorage.getItem('user'));
        const docId = Date.now().toString();

        await setDoc(doc(db, "AITrips", docId), {
            userSelection: formData,
            tripData: TripData,
            userEmail: user?.email,
            id: docId
        });
        setLoading(false);
        navigate('/view-trip/' + docId);

    }


    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
            <h2 className="font-bold text-3xl">Tell us your travel preferences ⛱️🌴</h2>
            <p className="mt-3 text-gray-500 text-xl">
                Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
            </p>

            <div className="mt-20 flex flex-col gap-10">
                <div>
                    <h2 className="my-3 font-medium text-xl">What is your destination of choice?</h2>
                    <Input
                        onChange={(e) => {
                            setPlace(e.target.value);
                            updateFormData("place", e.target.value);
                        }}
                        value={place}
                        type="text"
                        placeholder="Enter your Destination"
                    />
                </div>
                <div>
                    <h2 className="my-3 font-medium text-xl">How many days are you planning your trip?</h2>
                    <Input
                        type="number"
                        placeholder="Ex.3"
                        value={days}
                        onChange={(e) => {
                            setDays(e.target.value);
                            updateFormData("days", e.target.value);
                        }}
                    />
                </div>

                <div>
                    <h2 className="my-3 font-medium text-xl">What is Your Budget?</h2>
                    <div className="grid grid-cols-3 gap-5 mt-5">
                        {SelectBudgetOptions.map((item, index) => (
                            <div
                                key={index}
                                className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg ${budget === item.title ? "border-gray-800" : ""
                                    }`}
                                onClick={() => {
                                    setBudget(item.title);
                                    updateFormData("budget", item.title);
                                }}
                            >
                                <h2 className="text-4xl">{item.icon}</h2>
                                <h2 className="font-bold text-lg">{item.title}</h2>
                                <h2 className="text-sm text-gray-500">{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="my-3 font-medium text-xl">Who do you plan on traveling with on your next adventure?</h2>
                    <div className="grid grid-cols-3 gap-5 mt-5">
                        {SelectTravelesList.map((item, index) => (
                            <div
                                key={index}
                                className={`p-4 cursor-pointer border rounded-lg hover:shadow-lg ${travelers === item.title ? "border-gray-800" : ""
                                    }`}
                                onClick={() => {
                                    setTravelers(item.title);
                                    updateFormData("travelers", item.title);
                                }}
                            >
                                <h2 className="text-4xl">{item.icon}</h2>
                                <h2 className="font-bold text-lg">{item.title}</h2>
                                <h2 className="text-sm text-gray-500">{item.desc}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="my-10 justify-end flex">
                <Button
                    disabled={loading}
                    onClick={handleGenerateTrip}>
                    {
                        loading ? <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
                            : 'Generate Trip'
                    }
                </Button>
            </div>

            <Dialog open={openDialog}>
                <DialogContent>
                    <DialogHeader>

                        <DialogDescription>
                            <img src="/logo.svg" alt="" />
                            <h2 className="font-bold text-lg mt-7">Sign in with Google</h2>
                            <p>Sign in to the App with Google authentication securely</p>
                            <Button

                                onClick={login}
                                className="w-full mt-5 flex gap-4 items-center">

                                <FcGoogle className="w-8 h-8" />
                                Sign In with Google

                            </Button>
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button
                                onClick={closeTab}>
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

        </div>
    );
};

export default CreateTrip;
