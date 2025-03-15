import { create } from "zustand";
import { getProducts } from "../services/productsService";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { paymentStatus } from "../utils/helper";

const useCompletedPaymentStore = create((set) => ({
    order: null,
    infoProducts: {},
    error: false,
    paymentStatus: null,
    loading: true,
    setOrder: (order) => set({ order }),
    setError: (error) => set({ error }),
    setLoading: (loading) => set({ loading }),
    setPaymentStatus: (paymentStatus) => set({ paymentStatus }),
    setInfoProducts: (infoProducts) => set({ infoProducts }),
}));

export const useCompletedPayment = () => {
    const location = useLocation();
    const { order, infoProducts, setOrder, setInfoProducts, setError, setLoading, loading, error, paymentStatus, setPaymentStatus } = useCompletedPaymentStore();

    useEffect(() => {
        let navigationState = location.state?.order;
        if (!navigationState) {
            setTimeout(() => {
                setLoading(false);
                setError(true);
            }, 4000);
            return;
        };

        console.log(navigationState.order[0])

        setOrder({ ...navigationState, products: navigationState.order, payment: location.state.payment });
        setPaymentStatus(location.state.payment.info.status);
        setInfoProducts({
            images: navigationState.order.map((product) => ({ imageName: product.images })),
            text: navigationState.order.map((product) => product.productName),
        });
        setLoading(false);

    }, [location.state, setOrder, setInfoProducts]);

    return { order, infoProducts, loading, error, paymentStatus };
};
