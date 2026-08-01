import React, { use } from 'react';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../Context/AuthContext'
import LoadingCompo from '../Components/LoadingCompo'

const PrivateRoute = ({ children }) => {
    const { user, loading } = use(AuthContext)
    const location = useLocation();
    


    if (loading) {
        return <LoadingCompo></LoadingCompo>
    }

    if (!user) {
        return <Navigate state={{ from: location.pathname }} to="/login"></Navigate>
    }

    return children;
}; 

export default PrivateRoute;