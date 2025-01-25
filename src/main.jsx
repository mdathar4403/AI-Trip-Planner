import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './create-trip'
import Header from './components/custom/Header'
import 'sweetalert2/dist/sweetalert2.js'
import { GoogleOAuthProvider } from '@react-oauth/google';
import ViewTrip from './view_trip/[tripId]'
import MyTrips from './my-trips/MyTrips'

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: '/create-trip',
        element: <CreateTrip />
    },
    {
        path: '/view-trip/:tripId',
        element: <ViewTrip />
    },
    {
        path: '/my-trips',
        element: <MyTrips />
    },

])
createRoot(document.getElementById('root')).render(
    <>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
            <Header />
            <RouterProvider router={router} />
        </GoogleOAuthProvider>;
    </>
)
