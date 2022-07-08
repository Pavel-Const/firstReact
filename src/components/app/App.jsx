/* eslint-disable default-case */
import React from "react";
import AppHeader from "../app-header/app-header";
import { BurgerIngredients } from "../burger-indredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { OrderDetails } from "../order-detail/order-detail";
import { IngredientDetails } from "../ingredient-detail/ingredient-detail";
import { useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import Modal from "../modal/modal";
import appStyles from "./App.module.css";
import { useDispatch } from "react-redux";
import { CLOSE_MODAL } from "../../services/actions/actions";

const App = () => {
    const dispatch = useDispatch();
    const closeModal = () =>
        dispatch({
            type: CLOSE_MODAL,
        });
    const { ingredientItem, open, title, kind, order } = useSelector(
        (store) => store.getIngredients.modalInfo
    );
    return (
        <div className="App">
            <AppHeader />
            <main className={[appStyles.main, "container"].join(" ")}>
                <DndProvider backend={HTML5Backend}>
                    <BurgerIngredients />
                    <BurgerConstructor />
                </DndProvider>

                {open && (
                    <Modal isOpen={open} title={title} closeModal={closeModal}>
                        {kind === "order" && <OrderDetails number={order} />}
                        {kind === "detail" && (
                            <IngredientDetails product={ingredientItem[0]} />
                        )}
                    </Modal>
                )}
            </main>
        </div>
    );
};

export default App;
