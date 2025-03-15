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

export const getShoppingCart = async ({userId}) => {
  if(!userId) return handleError({ message: "No userId provided" });
  try {
    const response = await axios.get(`${API_URL}/api/shopping/${userId}`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const addToShoppingCart = async ({userId, productId, quantity}) => {
  if(!userId) return handleError({ message: "No userId provided" });
  try {
    const response = await axios.post(`${API_URL}/api/shopping/${userId}`, { productId, quantity });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const updateShoppingCartItem = async ({userId, productId, quantity}) => {
  if(!userId) return handleError({ message: "No userId provided" });
  try {
    const response = await axios.put(`${API_URL}/api/shopping/${userId}`, { productId, quantity });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const removeFromShoppingCart = async ({userId, productId}) => {
  if(!userId) return handleError({ message: "No userId provided" });
  try {
    const response = await axios.delete(`${API_URL}/api/shopping/${userId}`, { data: { productId } });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const clearShoppingCart = async ({userId}) => {
  if(!userId) return handleError({ message: "No userId provided" });
  try {
    const response = await axios.delete(`${API_URL}/api/shopping/${userId}/clear`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};