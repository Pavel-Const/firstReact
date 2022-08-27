/* eslint-disable no-lone-blocks */
import React, {useEffect} from "react";
import styles from "./feed.module.css";
import {FeedBlock} from "../feed-block/feed-block";
import {FeedOrders} from "../feed-orders/feed-orders";
import {WS_CONNECTION_CLOSE, WS_CONNECTION_START} from "../../services/actions/actionsWs";
import {wsUrl} from "../../services/api/url";
import {useDispatch} from "../../index";


export const Feed = () => {
    const dispatch = useDispatch();

    useEffect(
        () => {
            dispatch({type: WS_CONNECTION_START, url: wsUrl});
            return () => {
                dispatch({type: WS_CONNECTION_CLOSE});
            }
        },
        []
    );
    return (
        <section className={[styles.main, 'container'].join(" ")}>
            <FeedBlock path={'feed'}/>
            <FeedOrders/>
        </section>
    );
};
