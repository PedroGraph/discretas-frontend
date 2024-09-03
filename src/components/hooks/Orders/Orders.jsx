import React, {useState, useEffect} from "react";
import {GettingOrders, SettingOrder} from "../../services/Orders";
import { GetUserInfo } from "../../services/Auth";
import useProductContext from "../useProductContext";
import { useLocation } from "react-router-dom";

export const Orders = () => {

    const location = useLocation();
    const { userLogged } = useProductContext();
    const [orders, setOrders] = useState([]);
    const selectedSection = location.pathname;

    const handleUserInfo = async () => {
      return await GetUserInfo(userLogged).then((response) =>{
        return response.id
      })
    }

    useEffect(() => {
      const getOrders = async () => {
        const id = userLogged.length > 0 ? await handleUserInfo() : null;
        if(id !== null){
          GettingOrders(id).then((orders) =>{
            setOrders(orders);
          });
        }
      }
      getOrders()
    },[userLogged]);
    

    const handleSetOrders = async (order) => {
        return await SettingOrder(order).then(response =>{
        return response
      })
    }


    return {orders, handleSetOrders, selectedSection};

}