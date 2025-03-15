import axios from "axios";

const API_URL = __BACKEND_URL__;

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

export const getOrders = async (userId) => {
  try {
    const response = await axios.get(`${API_URL}/api/orders/${userId}`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getOrderDetails = async (orderId) => {
  try {
    const response = await axios.get(`${API_URL}/api/orders/details/${orderId}`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const createOrder = async (userId, orderData) => {
  try {
    const response = await axios.post(`${API_URL}/api/orders/${userId}`, orderData);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const updateOrderStatus = async (orderId, status) => {
  try {
    const response = await axios.put(`${API_URL}/api/orders/${orderId}`, { status });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const cancelOrder = async (orderId) => {
  try {
    const response = await axios.delete(`${API_URL}/api/orders/${orderId}`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};