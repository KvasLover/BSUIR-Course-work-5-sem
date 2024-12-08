//import { Component } from "react";
import Admin from "./pages/Admin";
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, STATION_ROUTE, FLIGHT_ROUTE, BUS_ROUTE, ROUTE_ROUTE, MAIN_PAGE_ROUTE, PROFILE_PAGE_ROUTE } from "./utils/consts";
import Basket from "./pages/Basket";
import Station from "./pages/Station";
import FlightPage from "./pages/FlightPage";
import Auth from "./pages/Auth";
import BusPage from "./pages/Bus";
import RoutePage from "./pages/Route";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";

export const authRoutes = [
    {
        path: ADMIN_ROUTE,
        Component: Admin
    },
    {
        path: BASKET_ROUTE,
        Component: Basket
    }
]

export const publicRoutes = [
    {
        path: MAIN_PAGE_ROUTE,
        Component: MainPage 
    },
    {
        path: STATION_ROUTE,
        Component: Station 
    },
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth 
    },
    {
        path: FLIGHT_ROUTE/* + '/:id'*/,
        Component: FlightPage
    },
    {
        path: BUS_ROUTE + '/:id',
        Component: BusPage
    },
    {
        path: ROUTE_ROUTE + '/:id',
        Component: RoutePage
    },
    {
        path: PROFILE_PAGE_ROUTE,
        Component: ProfilePage
    }
]