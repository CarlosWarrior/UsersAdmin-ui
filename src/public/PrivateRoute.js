import React from 'react'
import {Context} from '../contexts/Auth'
import { Navigate, Outlet } from 'react-router-dom'

function PrivateRoute({ component, Loader, ...rest }) {

    const auth = React.useContext(Context)
    return (
        <React.Fragment>
            {auth.loading && Loader}
            {!auth.loading && auth.auth && (<React.Fragment>{component}<Outlet/></React.Fragment>)}
            {!auth.loading && !auth.auth && <Navigate to="/login" replace/>}
        </React.Fragment>
    );
}

export default PrivateRoute