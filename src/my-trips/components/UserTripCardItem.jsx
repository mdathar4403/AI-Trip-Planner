import { Link } from "react-router-dom"

const UserTripCardItem = ({trip}) => {
  return (
    <Link to={"/view-trip/"+trip?.id}>
    <div className="hover:scale-105 transition-all">
      <img className="object-cover rounded-xl h-[250px]" src="/placeholder.jpg" alt="" />
      <h2 className="font-bold text-lg mt-2">
        {trip?.userSelection?.place}
      </h2>
      <h2 className="text-sm text-gray-500">{trip?.userSelection?.days} Days trip with {trip?.userSelection?.budget} budget</h2>
    </div>
    </Link>
  )
}

export default UserTripCardItem
