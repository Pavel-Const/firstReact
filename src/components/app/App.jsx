import React, { useEffect } from "react";
import AppHeader from "../app-header/app-header";
import { BurgerIngredients } from "../burger-indredients/burger-ingredients";
import { BurgerConstructor } from "../burger-constructor/burger-constructor";
import ModalMain from "../modal-main/modal-main";
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
    });
    const url = "https://norma.nomoreparties.space/api/ingredients";
    const loadData = () => {
        fetch(url)
            .then((response) => response.json())
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

    const openModal = (type, id) => {
        let product = dataProduct.find((item) => {
            return item._id === id;
        });

        setModal({
            open: true,
            type: type,
            product,
        });
        window.addEventListener("keydown", functionEscape);
        document.querySelector("body").classList.add("modalOpen");
    };
    const closeModal = () => {
        setModal({
            ...modal,
            open: false,
        });
        window.removeEventListener("keydown", functionEscape);
        document.querySelector("body").classList.remove("modalOpen");
    };

    const functionEscape = (event) => {
        if (event.keyCode === 27) {
            closeModal();
            console.log("esc");
        }
    };

    return (
        <div className="App">
            <AppHeader />
            <main className={[appStyles.main, "container"].join(" ")}>
                <BurgerIngredients data={dataProduct} openModal={openModal} />
                <BurgerConstructor data={dataProduct} openModal={openModal} />
                {modal.open && (
                    <ModalMain
                        type={modal.type}
                        closeModal={closeModal}
                        product={modal.product}
                    />
                )}
            </main>
        </div>
    );
};

export default App;
