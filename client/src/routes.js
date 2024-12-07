import { Component } from "react";
import Admin from "./pages/Admin";
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, STATION_ROUTE, FLIGHT_ROUTE, BUS_ROUTE } from "./utils/consts";
import Basket from "./pages/Basket";
import Station from "./pages/Station";
import FlightPage from "./pages/FlightPage";
import Auth from "./pages/Auth";
import BusPage from "./pages/Bus";

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
    },/*
    {
        path: FLIGHT_ROUTE + '/:id',
        Component: FlightPage
    },*/
    {
        path: BUS_ROUTE + '/:id',
        Component: BusPage
    }
]