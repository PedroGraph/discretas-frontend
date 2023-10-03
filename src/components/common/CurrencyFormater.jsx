import React from 'react';

function CurrencyFormatter({ amount }) {
  const formattedAmount = amount.toLocaleString('es-ES', {
    style: 'currency',
    currency: 'COP', 
    maximumFractionDigits: 0, 
  });

  return <span>${formattedAmount.replace("COP", "")}</span>;
}

export default CurrencyFormatter;
