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

export const getProducts = async ({page, query}) => {
  try {
    const response = await axios.get(`${API_URL}/api/products/all`, {
      params: { page, ...query },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const getProductDetails = async (productId) => {
  try {
    const response = await axios.get(`${API_URL}/api/products/${productId}`);
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};

export const searchProducts = async (query) => {
  try {
    const response = await axios.get(`${API_URL}/api/products/search`, {
      params: { query },
    });
    return response.data;
  } catch (error) {
    return handleError(error);
  }
};