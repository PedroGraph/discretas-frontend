export const currencyFormat = (number) => {
    const format = new Intl.NumberFormat('co-CO', { 
        style: 'currency', 
        currency: 'COP', 
        minimumFractionDigits: 0 
    }).format(number); 
    return "$" + format.replace("COP", "").trim();
};

export const phoneNumberFormat = (number) => {

 if (!number) return '';
 const cleaned = number.replace(/\D/g, '');
 const truncated = cleaned.slice(0, 10);
 
 if (truncated.length === 0) return '';
 if (truncated.length <= 3) return truncated;
 if (truncated.length <= 6) return `${truncated.slice(0, 3)} ${truncated.slice(3)}`;
 return `${truncated.slice(0, 3)} ${truncated.slice(3, 6)} ${truncated.slice(6)}`;
};

export const orderFormat = (info) => {
    return {
        userId: info.id,
        products: {
            productId: info.productId,
            quantity: info.quantity,
            size: info.size,
            color: info.color,
            discount: info.discount || 0
        },
        shippingAddress: {
            address: info.address,
            city: info.city,
            state: info.state
        },
        PaymentMethod: info.bank
    }
}

export const shoppingCartFormat = (info) => {
    return{
        userId: info.userId,
        productId: info.id,
        quantity: info.quantity,
        size: info?.size,
        color: info?.color,
        discount: info?.discount || 0
    }
}

export const extractProductId = (pathname) => {
    const parts = pathname.split('_');
    return parts[parts.length - 1];
};


export const maskCardNumber = (cardNumber) => {
 let cardString = cardNumber.toString();
 cardString = cardString.slice(0, 19);
 const masked = cardString.slice(0, -4).replace(/\d/g, 'X') + cardString.slice(-4);
 return masked.replace(/\s+/g, '').replace(/(.{4})/g, '$1 ').trim();
}

export const setAsCardNumber = (cardNumber) => {
    let cardString = cardNumber.toString();
    cardString = cardString.slice(0, 19);
    return cardString.replace(/\s+/g, '').replace(/(.{4})/g, '$1 ').trim();
}

export const setAsCVV = (cvv) => {
    let cvvString = cvv.toString();
    cvvString = cvvString.slice(0, 3);
    return cvvString;
}

export const setAsExpirationMonth = (expirationMonth) => {
    let expirationMonthString = expirationMonth.toString();
    expirationMonthString = expirationMonthString.slice(0, 2);
    if(expirationMonthString > 12) expirationMonthString = 12;
    return expirationMonthString;
}

export const setAsExpirationYear = (expirationYear) => {
    let expirationYearString = expirationYear.toString();
    expirationYearString = expirationYearString.slice(0, 4);
    const date = new Date();
    const currentYear = date.getFullYear();
    if((expirationYear.length === 4 && expirationYearString < currentYear) || (expirationYear.length === 4 && expirationYearString > 2099)) expirationYearString = currentYear;
    return expirationYearString;
}

export const setIdNumber = (idNumber) => {
    let idNumberString = idNumber.toString();
    idNumberString = idNumberString.slice(0, 10);
    return idNumberString;
}

export const validateCard = (cardNumber) => {
    const cardString = cardNumber.toString().replace(/\s+/g, '');
  
    if (!/^\d{16}$/.test(cardString)) {
      return { valid: false, type: null };
    }
  
    if (!luhnCheck(cardString)) {
      return { valid: false, type: null };
    }
  
    let cardType = null;
    if (/^4/.test(cardString)) {
      cardType = 'visa';
    } else if (/^5[1-5]/.test(cardString)) {
      cardType = 'mastercard';
    }
  
    return { valid: true, type: cardType };
  }
  
  function luhnCheck(cardNumber) {
    let sum = 0;
    let shouldDouble = false;
    for (let i = cardNumber.length - 1; i >= 0; i--) {
      let digit = parseInt(cardNumber.charAt(i), 10);
  
      if (shouldDouble) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
  
      sum += digit;
      shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
  }