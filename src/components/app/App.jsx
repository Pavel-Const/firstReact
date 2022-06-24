import React, { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import { BurgerIngredients } from "../burger-indredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import { OrderDetails } from "../order-detail/order-detail";
import { IngredientDetails } from "../ingredient-detail/ingredient-detail";
import Modal from "../modal/modal";
import appStyles from "./App.module.css";

const App = () => {
    const [dataProduct, setDataProduct] = React.useState([
        {
            _id: "",
            name: "",
            type: "",
            proteins: null,
            fat: null,
            carbohydrates: null,
            calories: null,
            price: 1255,
            image: "",
            image_mobile: "",
            image_large: "",
            __v: null,
        },
    ]);
    const [modal, setModal] = React.useState({
        type: "",
        open: false,
        product: {},
        title: "",
    });
    const url = "https://norma.nomoreparties.space/api/ingredients";
    const loadData = () => {
        fetch(url)
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Ошибка ${res.status}`);
            })
            .then((json) => {
                if (json.success) {
                    setDataProduct(json.data);
                } else {
                    alert(json.message);
                }
            })
            .catch((error) => {
                alert(error);
            });
    };

    useEffect(() => {
        loadData();
    }, []);

    const openModal = (type, title, id) => {
        const product = dataProduct.find((item) => {
            return item._id === id;
        });

        setModal({
            open: true,
            type: type,
            title: title,
            product,
        });
    };
    const closeModal = () => {
        setModal({
            ...modal,
            open: false,
        });
    };
    return (
        <div className="App">
            <AppHeader />
            <main className={[appStyles.main, "container"].join(" ")}>
                <BurgerIngredients data={dataProduct} openModal={openModal} />
                <BurgerConstructor data={dataProduct} openModal={openModal} />
                {modal.open && (
                    <Modal
                        closeModal={closeModal}
                        isOpen={modal.open}
                        title={modal.title}
                    >
                        {modal.type === "order" && <OrderDetails />}
                        {modal.type === "detail" && (
                            <IngredientDetails product={modal.product} />
                        )}
                    </Modal>
                )}
            </main>
        </div>
    );
};

export default App;
