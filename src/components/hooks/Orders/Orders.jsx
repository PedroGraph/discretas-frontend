import React, {useState, useEffect} from "react";
import {GettingOrders, SettingOrder} from "../../services/Orders";
import useProductContext from "../useProductContext";

export const Orders = () => {

    const { userLogged } = useProductContext();

    const [orders, setOrders] = useState([]);

    useEffect(() => {
      if(userLogged.length > 0){
        GettingOrders(userLogged).then((orders) =>{
          setOrders(orders);
        });
      }
    },[userLogged]);

    const handleSetOrders = async (order) => {
        return await SettingOrder(order).then(response =>{
        return response
      })
    }


    return {orders, handleSetOrders};

}