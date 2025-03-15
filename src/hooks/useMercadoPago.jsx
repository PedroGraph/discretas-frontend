import { useEffect, useState, useCallback, useMemo } from "react";
import { CardPayment, initMercadoPago } from "@mercadopago/sdk-react";
import { makePayment } from "../services/paymentService";
import { createOrder } from "../services/ordersService";
import { deleteShoppingCart } from "../services/shoppingCartService";
import { useNavigate } from "react-router-dom";
import { initializationMercadoPago, mercadoPagoDarkMode } from "../utils/helper";
import { useShoppingCartStore } from "../stores/cartStore";
import { formatShoppingCartData } from "../utils/formats";
import { useThemeStore } from "../stores/themeStore";

export const useMercadoPago = () => {
  const { handleTotal, shoppingCart, userInfo } = useShoppingCartStore();
  const { darkMode } = useThemeStore();
  const [cardPaymentBrickController, setCardPaymentBrickController] = useState(null);
  const [cardPreviewData, setCardPreviewData] = useState({ number: "", name: "", expiry: "" });
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const navigate = useNavigate();

  // Inicializar MercadoPago cuando se monta el componente
  useEffect(() => {
    const initialize = async () => {
      await initMercadoPago(__TOKEN_MERCADO_PAGO__, { locale: "es-CO" });
      setIsLoading(false);
    };
    
    initialize();
  }, []);

  // Limpiar el controlador al desmontar
  useEffect(() => {
    return () => {
      if (cardPaymentBrickController) {
        cardPaymentBrickController.unmount();
      }
    };
  }, [cardPaymentBrickController]);

  const onBinChange = useCallback((bin) => {
    if (bin) {
      setCardPreviewData((prevData) => ({
        ...prevData,
        number: bin.padEnd(16, "•").replace(/(.{4})/g, "$1 ").trim(),
      }));
    }
  }, []);

  const onError = useCallback((error) => {
    console.error("Payment error:", error);
    alert("Error al procesar el pago: " + error.message);
    setIsReady(false);
  }, []);

  const onReady = useCallback((controller) => {
    setCardPaymentBrickController(controller);
    setIsReady(true);
  }, []);

  const onSubmit = useCallback(async (formData) => {
    try {
      const paymentResponse = await makePayment(formData);
      if (!paymentResponse.info.payment) throw paymentResponse;

      const orderResponse = await createOrder(formatShoppingCartData({ 
        shoppingCart, 
        paymentId: paymentResponse.info.id, 
        ...userInfo 
      }));
      
      if (!orderResponse.status) throw orderResponse;

      const shoppingCartResponse = await deleteShoppingCart(userInfo.id);
      if(!shoppingCartResponse.info) throw shoppingCartResponse;

      const paymentInfo = {
        order: formatShoppingCartData({ shoppingCart, ...userInfo }),
        payment: paymentResponse,
      };

      setTimeout(() => {
        navigate(`completedpayment/${paymentResponse.info.id}`, { state: paymentInfo });
      }, 4000);

      return paymentResponse;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }, [shoppingCart, userInfo, navigate]);

  // Renderizar el componente CardPayment solo cuando no está cargando
  const renderCardPayment = useMemo(() => {
    if (isLoading) {
      return null;
    }

    return (
      <CardPayment
        initialization={{ ...initializationMercadoPago, amount: handleTotal() }}
        customization={{
          visual: { 
            hideFormTitle: true, 
            ...(darkMode && mercadoPagoDarkMode),
          },  
          paymentMethods: { maxInstallments: 2 },
        }}
        onSubmit={onSubmit}
        onReady={onReady}
        onError={onError}
        onBinChange={onBinChange}
      />
    );
  }, [isLoading, onSubmit, onReady, onError, onBinChange, handleTotal, darkMode]);

  // Determinar el estado actual para consumidores del hook
  const getStatus = () => {
    if (isLoading) return "loading";
    if (isReady) return "ready";
    return "error";
  };

  return { 
    cardPreviewData, 
    memoizedCardPayment: renderCardPayment, 
    status: getStatus(),
    isReady 
  };
};