import { create } from "zustand";
import { getOrders } from "../services/ordersService";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useUserStore } from "./userStore";
import { getOrderDetails, DownloadOrderFile } from "../services/ordersService";
import { getPaymentInfo } from "../services/paymentService";

const useOrdersStore = create((set) => ({
    orders: [],
    isLoading: true,
    isLoadingDownloadButton: false,
    error: false,
    empty: false,
    orderDetails: null,
    setOrders: (orders) => set({ orders, isLoading: false, empty: orders.length === 0 }),
    setError: (error) => set({ error }),
    setLoading: (isLoading) => set({ isLoading }),
    setLoadingDownloadButton: (isLoadingDownloadButton) => set({ isLoadingDownloadButton }),
    getOrderDetails: async (orderId) => {
        try{
            const orderDetails = await getOrderDetails(orderId);
            const paymentInfo = await getPaymentInfo(orderDetails.paymentId);
            await useUserStore.getState().getAllUserInfo();
            set({ orderDetails: { ...orderDetails, paymentInfo, userInfo: useUserStore.getState().allUserInfo } });
            await useOrdersStore.getState().setLoading(false);
            return;
        }catch(error){
            useOrdersStore.getState().setError(true);
            console.error(error);
        }
    },
}));

export const   useOrders = () => {
    const location = useLocation();
    const { pathname } = location;
    const { orders, isLoading, error, empty, setOrders, setError, setLoading, orderDetails, getOrderDetails, isLoadingDownloadButton, setLoadingDownloadButton } = useOrdersStore();
    const { user } = useUserStore();

    useEffect(() => {
        // setLoading(true);
        const currentDate = new Date();
        const limitDateMonth = new Date(currentDate.setMonth(currentDate.getMonth() - 1));
        getOrders({ userId: user, date: limitDateMonth })
            .then((response) => {
                if (response.error) return setOrders([]);
                return setOrders(response);
            })
            .catch((error) => setError(error))
            // .finally(() => setLoading(false));
    }, [setOrders, setError, setLoading]);

    const heroTitle = {
        ordenes: "Órdenes",
        entregados: "Órdenes entregadas",
        cancelados: "Órdenes canceladas",
    };

    const handleDownloadOrder = (orderId) => {
        setLoadingDownloadButton(true);
        DownloadOrderFile(orderId)
            .then((response) => response.success && setLoadingDownloadButton(false))
            .catch((error) => {
                console.error(error);
                setLoadingDownloadButton(false);
            });
    }

    return { orders, isLoading, error, empty, heroTitle, pathname, orderDetails, getOrderDetails, user, isLoadingDownloadButton, handleDownloadOrder  };
};
