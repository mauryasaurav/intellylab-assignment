import React from 'react';
import { useContext } from 'react';
import AppContext from '../context/AppContext';

function withAdminAccess(WrappedComponent) {
    return function (props) {
        const { loggedInUser } = useContext(AppContext);

        if (loggedInUser?.role != 1) {
            return <div>You do not have access to view this page.</div>;
        }

        return <WrappedComponent {...props} />;
    };
}

export default withAdminAccess;
