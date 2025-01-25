import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"


const Hero = () => {
    return (
        <div className='flex flex-col items-center mx-56 gap-9'>
            <h1 className='font-extrabold text-[50px] text-center mt-16'>
                <span className='text-[#f56551]'>
                    Discover Your Next Adventure with AI:
                </span>
                <br />
                Personalizeed Itineraries at your Fingertips
            </h1>
            <p className='text-xl text-gray500 text-center'>Your personal trip planner and travel curator, creating custom itineraties tailored to your interests and budget.</p>


            <Link to="/create-trip">
                <Button>Get's Started</Button>
            </Link>

            <img src="/landing.png" className="w-full -mt-20" alt="" />

        </div >
    )
}

export default Hero
