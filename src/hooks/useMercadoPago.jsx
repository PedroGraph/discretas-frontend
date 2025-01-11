import { useEffect, useState, useCallback, useMemo } from "react";
import { CardPayment, initMercadoPago } from "@mercadopago/sdk-react";

export const useMercadoPago = () => {
    const [cardPaymentBrickController, setCardPaymentBrickController] = useState(null);
    const [cardPreviewData, setCardPreviewData] = useState({ number: "", name: "", expiry: "" });

    useEffect(() => {
        initMercadoPago("TEST-d69e783f-05cc-4f8f-810a-6526e021cd9f", {
          locale: "es-CO",
        });
      }, []);
    
      useEffect(() => {
        return () => {
          if (cardPaymentBrickController) {
            cardPaymentBrickController.unmount();
          }
        };
      }, [cardPaymentBrickController]);
    
      const initialization = {
        amount: 1000,
        marketplace: true,
        processingMode: "aggregator",
        installments: 6,
        customization: {
            visual: {
                style: {
                    theme: 'dark' | 'default' | 'bootstrap' | 'flat'
               }
            },
            paymentMethods: {
                maxIntallments: 6
            }
        } 
      };
    
      const onBinChange = useCallback((bin) => {
        if (bin) {
          setCardPreviewData((prevData) => ({
            ...prevData,
            number: bin
              .padEnd(16, "•")
              .replace(/(.{4})/g, "$1 ")
              .trim(),
          }));
        }
      }, []);
    
      const onError = useCallback((error) => {
        console.error("Payment error:", error);
        alert("Error al procesar el pago: " + error.message);
      }, []);
    
      const onReady = useCallback((controller) => {
        setCardPaymentBrickController(controller);
      }, []);
    
      const onSubmit = useCallback(async (formData) => {
        return new Promise((resolve, reject) => {
          fetch("http://localhost:3000/api/mercadoPago/payment_process", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          })
            .then((response) => {
              console.log(response);
              resolve();
            })
            .catch((error) => {
              console.error(error);
              reject();
            });
        });
      }, []);
    
      
    
      const memoizedCardPayment = useMemo(
        () => (
          <CardPayment
            initialization={initialization}
            onSubmit={onSubmit}
            onReady={onReady}
            onError={onError}
            onBinChange={onBinChange}
            
          />
        ),
        [onSubmit, onReady, onError, onBinChange]
      );

      return { cardPreviewData, memoizedCardPayment };

}