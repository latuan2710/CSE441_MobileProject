import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy( () => import( "../layouts/FullLayout.js" ) );

/***** Pages ****/
const Login = lazy( () => import( "../views/Login.js" ) );
const Starter = lazy( () => import( "../views/Starter.js" ) );
const Cards = lazy( () => import( "../views/ui/Cards" ) );
const Grid = lazy( () => import( "../views/ui/Grid" ) );
const Products = lazy( () => import( "../views/ui/Products" ) );
const Brands = lazy( () => import( "../views/ui/Brands" ) );
const Categories = lazy( () => import( "../views/ui/Categories" ) );
const Subcategories = lazy( () => import( "../views/ui/Subcategories" ) );
const Staffs = lazy( () => import( "../views/ui/Staffs" ) );
const Users = lazy( () => import( "../views/ui/Users" ) );
const Orders = lazy( () => import( "../views/ui/Orders" ) );

/***** Routes ****/
const ThemeRoutes = [
  // First, handle the login route
  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/login" /> },  // Default redirect after login
      { path: "/starter", element: <Starter /> },
      { path: "/products", element: <Products /> },
      { path: "/brands", element: <Brands /> },
      { path: "/categories", element: <Categories /> },
      { path: "/cards", element: <Cards /> },
      { path: "/grid", element: <Grid /> },
      { path: "/staffs", element: <Staffs /> },
      { path: "/users", element: <Users /> },
      { path: "/orders", element: <Orders /> },
      { path: "/subcategories", element: <Subcategories /> },
    ],
  },
];

export default ThemeRoutes;
