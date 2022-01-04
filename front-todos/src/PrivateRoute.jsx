import { Route, Navigate } from 'react-router-dom';

export { PrivateRoute };

function PrivateRoute({ component: Component, ...rest }) {
    const auth = (localStorage.get('Authorization') != null && 
                  localStorage.get('Authorization') != "");
    return (
        <Route {...rest} render={props => {
            if (!auth) {
                return <Navigate to="/login" replace={true} />
            }
            return <Component {...props} />
        }} />
    );
}