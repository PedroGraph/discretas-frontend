import axios from "axios";

const API_URL = process.env. __BACKEND_URL__;

const handleError = (error) => {
  if (error.response) {
    return {
      message: `Error del servidor: ${error.response.data.message || "Error desconocido"}`,
      status: error.response.status,
    };
  } else if (error.request) {
    return {
      message: "No se recibió respuesta del servidor. Verifica tu conexión a internet.",
      status: 503,
    };
  } else {
    return {
      message: `Error en la solicitud: ${error.message}`,
      status: 400,
    };
  }
};

export const processPayment = async (paymentData) => {
  try {
    const response = await axios.post(`${API_URL}/payment/process`, paymentData);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getPaymentDetails = async (paymentId) => {
  try {
    const response = await axios.get(`${API_URL}/payment/details/${paymentId}`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const refundPayment = async (paymentId) => {
  try {
    const response = await axios.post(`${API_URL}/payment/refund/${paymentId}`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};import axios from "axios";

export const makePayment = (FormData) => {
    return new Promise((resolve, reject) => {
      axios.post(
        `${__BACKEND_URL__}/api/mercadoPago/payment_process`,
        FormData
      ).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        reject(error);
      });
    })
}

export const getPaymentInfo = (orderId) => {
    return new Promise((resolve, reject) => {
      axios.get(
        `${__BACKEND_URL__}/api/mercadoPago/payment_info/${orderId}`
      ).then((response) => {
        resolve(response.data);
      }).catch((error) => {
        reject(error);
      });
    })
}