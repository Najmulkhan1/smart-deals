import { createBrowserRouter } from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../pages/Home";
import AllProducts from "../pages/AllProducts";
import Login from "../pages/Login";
import Register from "../pages/Register";
import About from "../pages/About";
import ForgotPassword from "../pages/ForgotPassword";
import PrivetRoute from "../provider/PrivetRoute";
import CreateProduct from "../pages/CreateProduct";
import ProductDetails from "../components/ProductDetails";

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

            },
            {
                path: "/forgot-password",
                Component: ForgotPassword

            },
            {
                path: "create-product",
                element: (
                    <PrivetRoute>
                        <CreateProduct></CreateProduct>
                    </PrivetRoute>
                )
            },
            {
                path: "product-details/:id",
                loader: ({params}) =>  fetch(`http://localhost:3000/products/${params}`),
                element: <ProductDetails></ProductDetails>
            }
        ],


    }
])

export default router