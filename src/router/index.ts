import React from "react";
import Event from "../pages/Event";
import Login from "../pages/Login";

interface IRoute {
    path: string;
    exact?: boolean;
    element: React.ComponentType;
}

export enum RouteNames {
    LOGIN = '/login',
    EVENT = '/',
}

// /*Не работает ELEMENT */
// export const publicRoutes: IRoute[] = [
//     {path: RouteNames.LOGIN, element: Login}
// ]

// export const privateRoutes: IRoute[] = [
//     {path: RouteNames.EVENT, element: Event}
// ]