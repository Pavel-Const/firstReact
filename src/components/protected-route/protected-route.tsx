import {Redirect, Route} from "react-router-dom";
import {useSelector} from "react-redux";
import {FC, ReactNode} from "react";

interface IProps {
    children: ReactNode
    path: string
    exact: true
}

export const ProtectedRoute: FC<IProps> = ({children, ...rest}) => {
    const {userAuth} = useSelector((store: any) => store.reduceAuthorization);

    return (
        <Route
            {...rest}
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
