import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../pages/Home";
import AllProducts from "../pages/AllProducts";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";

const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home
            },
            {
                path:"/all-products",
                Component: AllProducts
            },
            {
                path:"/login",
                Component: Login
            },
            {
                path: "/register",
                Component: Register
            },
            {
                path: "/about",
                Component: About

            }
        ]
    }
])

export default router