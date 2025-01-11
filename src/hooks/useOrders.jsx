import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getOrders } from "../services/ordersService";

export default function useOrders() {
  const location = useLocation();
  const { pathname } = location;
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  const [empty, setEmpty] = useState(false);

  useEffect(() => {
    const currentDate = new Date();
    const limitDateMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
    getOrders({userId: "dec0acd7-49d9-48df-ba81-fb927f2e9ea7", date: limitDateMonth}).then(() => {
      setOrders([{
        orderId: 23124123,
        shippingAddress:{
          address: "Pene",
          state: "Sucio",
          city: "Y jugoso"
        },
        createdAt: "2023/02/31",
        products:[{
          name: "Penesote grande jugoso sabroso y lleno de lechita",
          id: 123213213123,
          category: "lenceria",
          color: "red",
          size: "XL",
          price: 3245
        }]
      },
      {
        orderId: 4233232,
        shippingAddress:{
          address: "Carrera 34 #39A-13",
          state: "Bolivar",
          city: "Cartagena"
        },
        createdAt: "2023/02/31",
        products:[{
          name: "Penesote grande jugoso sabroso y lleno de lechita",
          id: 1223,
          category: "lenceria",
          color: "red",
          size: "XL",
          price: 3245
        },
        {
          name: "Penesote grande jugoso sabroso y lleno de lechita",
          id: 232,
          category: "lenceria",
          color: "red",
          size: "XL",
          price: 3245
        },
        {
          name: "Penesote grande jugoso sabroso y lleno de lechita",
          id: 3123,
          category: "lenceria",
          color: "red",
          size: "XL",
          price: 3245
        }]
      }
    ])
      // if(response.error) setEmpty(true);
      // else setOrders(response);
    }).catch((error) => 
      setError(error)
    ).finally(() => setIsLoading(false));
  }, []);

  const heroTitle = {
    ordenes: "Órdenes",
    entregados: "Órdenes entregadas",
    cancelados: "Órdenes canceladas"
  }

  return { orders, isLoading, error, empty, heroTitle, pathname };
}