import {Redirect, Route, RouteProps} from "react-router-dom";
import {FC, ReactNode} from "react";
import {useSelector} from "../../index";

interface IProps {
    children: ReactNode
    path: string
    exact: true
}

export const ProtectedRoute: FC<RouteProps> = ({children, ...rest}) => {
    const {userAuth} = useSelector((store: any) => store.reduceAuthorization);

    return (
        <Route
            {...rest}
            // @ts-ignore
            render={({location}) =>
                userAuth ? (
                    children
                ) : (
                    <Redirect
                        to={{
                            pathname: "/login",
                            state: {from: location},
                        }}
                    />
                )
            }
        />
    );
}
