import { createBrowserRouter } from "react-router-dom"
import Home from "../pages/Home/Home/Home"
import Main from "../layout/Main"
import Login from "../pages/Login/Login"
import Register from "../pages/Register/Register"
import ErrorPage from "../pages/ErrorPage/ErrorPage"
import AddToyPage from "../pages/AddToyPage/AddToyPage"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <Home />
            },
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/register',
                element: <Register />
            },
            {
                path: '/addToy',
                element: <AddToyPage />
            }

        ]
    },
])
export default router