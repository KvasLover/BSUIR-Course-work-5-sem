import { Component } from "react";
import Admin from "./pages/Admin";
import { ADMIN_ROUTE, BASKET_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, STATION_ROUTE, TICKET_ROUTE } from "./utils/consts";
import Basket from "./pages/Basket";
import Station from "./pages/Station";
import TicketPage from "./pages/TicketPage";
import Auth from "./pages/Auth";

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
    },
    {
        path: TICKET_ROUTE + '/:id',
        Component: TicketPage
    }
]