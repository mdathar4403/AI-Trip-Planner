import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
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
import axios from "axios";
// import { useNavigate } from "react-router-dom";


const Header = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const user = JSON.parse(localStorage.getItem('user'));
  // const navigate = useNavigate();
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
    })
  }
  const handleGenerateTrip = () => {

    const user = localStorage.getItem('user');

    if (!user) {
      setOpenDialog(true);
      return;
    }
  }
  const closeTab = () => {
    setOpenDialog(false);
  }
  useEffect(() => {
    console.log(user);
  }, [])

  return (
    <div className="p-3 shadow-sm flex justify-between items-center px-5">
      <img src="/logo.svg" alt="" />

      <div>
        {
          user ?
            <div className="flex item-center gap-5">
              <a href="/create-trip">
                <Button variant="outline" className="rounded-full">Create Trips</Button>
              </a>
              <a href="/my-trips">
                <Button variant="outline" className="rounded-full">My Trips</Button>
              </a>
              <Popover>
                <PopoverTrigger>
                  <img src={user?.picture} className="size-[35px] rounded-full"></img>
                </PopoverTrigger>
                <PopoverContent>
                  <h2
                    className="cursor-pointer"
                    onClick={() => {
                      googleLogout();
                      localStorage.clear();
                      window.location.reload();
                    }}
                  >
                    Logout</h2>
                </PopoverContent>
              </Popover>

            </div>
            :
            <Button
              onClick={handleGenerateTrip}>
              Sign-In
            </Button>
        }

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
    </div >
  )
}

export default Header
