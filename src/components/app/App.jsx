/* eslint-disable default-case */
import React from "react";
import {Route, Switch} from "react-router-dom";
import AppHeader from "../app-header/app-header";
import {BurgerIngredients} from "../burger-indredients/burger-ingredients";
import {BurgerConstructor} from "../burger-constructor/burger-constructor";
import {OrderDetails} from "../order-detail/order-detail";
import {IngredientDetails} from "../ingredient-detail/ingredient-detail";
import {useDispatch, useSelector} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import Modal from "../modal/modal";
import appStyles from "./App.module.css";
import {CLOSE_MODAL} from "../../services/actions/actions";
import {Login} from "../../pages/authorization/login";
import {Register} from "../../pages/authorization/register";
import {ForgotPassword} from "../../pages/authorization/forgot-password";
import {ResetPassword} from "../../pages/authorization/reset-password";
import {Profile} from "../../pages/profile/profile";

const App = () => {
    const dispatch = useDispatch();
    const closeModal = () =>
        dispatch({
            type: CLOSE_MODAL,
        });
    const {ingredientItem, open, title, kind, order} = useSelector(
        (store) => store.getIngredients.modalInfo
    );
    return (
        <div className="App">
            <AppHeader/>
            <Switch>
                <Route path={'/'} exact>
                    <main className={[appStyles.main, "container"].join(" ")}>
                        <DndProvider backend={HTML5Backend}>
                            <BurgerIngredients/>
                            <BurgerConstructor/>
                        </DndProvider>
                    </main>
                </Route>
                <Route path={'/login'} exact>
                    <Login/>
                </Route>
                <Route path={'/register'} exact>
                    <Register/>
                </Route>
                <Route path={'/forgot-password'} exact>
                    <ForgotPassword/>
                </Route>
                <Route path={'/reset-password'} exact>
                    <ResetPassword/>
                </Route>
                <Route path={'/profile'} exact>
                    <Profile/>
                </Route>
            </Switch>


            {open && (
                <Modal isOpen={open} title={title} closeModal={closeModal}>
                    {kind === "order" && <OrderDetails number={order}/>}
                    {kind === "detail" && (
                        <IngredientDetails product={ingredientItem[0]}/>
                    )}
                </Modal>
            )}
        </div>
    );
};

export default App;
