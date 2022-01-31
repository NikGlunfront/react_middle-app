import React from 'react';
import { Navigate, Routes } from 'react-router-dom';
import {  Route } from 'react-router-dom';
import { useTypedSelector } from '../hooks/useTypedSelector';
import Event from '../pages/Event';
import Login from '../pages/Login';
import { RouteNames } from '../router';

const AppRouter = () => {
    const {isAuth} = useTypedSelector(state => state.auth)

    return (
        isAuth
            ?
            <Routes>    
                <Route 
                    path={RouteNames.EVENT}
                    key={RouteNames.EVENT}
                    element={<Event/>}
                />
                <Route
                    path="*"
                    element={<Navigate to={RouteNames.EVENT} />}
                />
            </Routes>
            :
            <Routes>
                <Route 
                    path={RouteNames.LOGIN}
                    key={RouteNames.LOGIN}
                    element={<Login/>}
                />
                <Route
                    path="*"
                    element={<Navigate to={RouteNames.LOGIN} />}
                />
            </Routes>
    );
};

export default AppRouter;