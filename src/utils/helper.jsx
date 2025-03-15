export const colorMap = {
    red: 'bg-red-100',
    blue: 'bg-blue-100',
    green: 'bg-green-100',
    orange: 'bg-orange-100',
    black: 'bg-gray-800',
    white: 'bg-white',
    redSelected: 'bg-red-600',
    blueSelected: 'bg-blue-600',
    greenSelected: 'bg-green-600',
    orangeSelected: 'bg-orange-600',
    blackSelected: 'bg-black',
    whiteSelected: 'bg-white',
};

export const paymentStatus = {
    "approved": "bg-green-500",
    "in_process": "bg-yellow-500",
    "rejected": "bg-red-700",
}

export const paymentStatusMessage = {
    "approved": "Puedes revisar el estado de tu pedido en la sección de órdenes",
    "in_process": "Tu pedido está siendo procesado y esperando aprobación de pago.",
    "rejected": "",
}

export const colorText = {
    red: "rojo",
    blue: "azul",
    green: "verde",
    orange: "naranja",
    black: "negro",
    white: "blanco",
}

export const banksAvailables = [
    'AV Villas',
    'Bancolombia',
    'Colpatria',
    'Davivienda',
    'Banco de Bogotá',
    'Banco de Occidente',
    'Banco de Santander',
    'Banco Caja Social',
    'Banco Popular',
    'BBVA',
    'Scotiabank',
    'Daviplata',
    'Nequi',
    'Nubank',
];

export const userData = {
    city: "ciudad",
    state: "departamento",
    address: "direccion",
    phone: "telefono",
    email: "correo electrónico",
    firstName: "nombre",
    lastName: "apellidos",
}

export const initializationMercadoPago = {
    marketplace: true,
    processingMode: "aggregator",
    installments: 6,
    payer: {
        identification: {
            type: 'CC',
        },
    }
};

export const mercadoPagoDarkMode = {
    style: {
        customVariables: {
        formBackgroundColor: "#374151", 
        inputBackgroundColor: "#64748b", 
        textPrimaryColor: "#ffffff", 
        buttonTextColor: "#ffffff" 
        }
    }
}

export const paymentCards = {
    visa: 'Visa',
    mastercard: 'MasterCard',
    amex: 'American Express',
    discover: 'Discover',
    diners: 'Diners Club',
    hipercard: 'Hipercard',
    jcb: 'JCB',
}

export const isASocialNetwork = (socialNetwork) => {
    return socialNetwork.includes("facebook") || socialNetwork.includes("google") || socialNetwork.includes("twitter");

}