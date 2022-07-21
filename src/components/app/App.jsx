/* eslint-disable default-case */
import React from "react";
import {
    Redirect,
    Route,
    Switch,
    useHistory,
    useLocation,
} from "react-router-dom";
import AppHeader from "../app-header/app-header";
import { BurgerIngredients } from "../burger-indredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { OrderDetails } from "../order-detail/order-detail";
import { IngredientDetails } from "../ingredient-detail/ingredient-detail";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Modal from "../modal/modal";
import appStyles from "./App.module.css";
import { CLOSE_MODAL } from "../../services/actions/actionsOrder";
import { Login } from "../../pages/authorization/login";
import { Register } from "../../pages/authorization/register";
import { ForgotPassword } from "../../pages/authorization/forgot-password";
import { ResetPassword } from "../../pages/authorization/reset-password";
import { Profile } from "../../pages/profile/profile";
import { ProtectedRoute } from "../protected-route/protected-route";

const App = () => {
    const dispatch = useDispatch();
    const location = useLocation();
    const history = useHistory();
    const background = location.state && location.state.background;
    const closeModal = () => {
        dispatch({
            type: CLOSE_MODAL,
        });
        history.goBack();
    };
    const closeModalOrder = () => {
        dispatch({
            type: CLOSE_MODAL,
        });
    };
    const { open, kind, order } = useSelector(
        (store) => store.reduceOrder.modalInfo
    );
    return (
        <div className="App">
            <AppHeader />
            <Switch location={background || location}>
                <Route path={"/"} exact>
                    <main className={[appStyles.main, "container"].join(" ")}>
                        <DndProvider backend={HTML5Backend}>
                            <BurgerIngredients />
                            <BurgerConstructor />
                        </DndProvider>
                    </main>
                </Route>
                <Route path={"/login"} exact>
                    <Login />
                </Route>
                <Route path={"/register"} exact>
                    <Register />
                </Route>
                <Route path={"/forgot-password"} exact>
                    <ForgotPassword />
                </Route>
                <Route path={"/reset-password"} exact>
                    <ResetPassword />
                </Route>
                <Route path={"/ingredients/:id"} exact>
                    <IngredientDetails />
                </Route>
                <ProtectedRoute path={"/profile"} exact>
                    <Profile />
                </ProtectedRoute>
                <ProtectedRoute path={"/profile/orders"} exact>
                    <Profile />
                </ProtectedRoute>
            </Switch>

            {background && (
                <Route path={"/ingredients/:id"}>
                    <Modal
                        title={"Детали ингредиента"}
                        isOpen={background}
                        closeModal={closeModal}
                    >
                        <IngredientDetails />
                    </Modal>
                </Route>
            )}
            {open && (
                <Modal isOpen={open} closeModal={closeModalOrder}>
                    {kind === "order" && <OrderDetails number={order} />}
                </Modal>
            )}
        </div>
    );
};

export default App;
