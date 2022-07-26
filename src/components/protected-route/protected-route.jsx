import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

export function ProtectedRoute({ children, ...rest }) {
    const { userAuth } = useSelector((store) => store.reduceAuthorization);

    return (
        <Route
            {...rest}
            render={({ location }) =>
                userAuth ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: { from: location },
                        }}
                    />
                )
            }
        />
    );
}
