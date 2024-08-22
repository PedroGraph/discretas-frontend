import React from 'react';

function CurrencyFormatter({ amount, className, currency }) {
  const formattedAmount = amount.toLocaleString('es-ES', {
    style: 'currency',
    currency: 'COP', 
    maximumFractionDigits: 0, 
  });
  return (
  <span className={className} >
    $ { formattedAmount.replace("COP", "") } 
      { currency && (<span className='text-xs font-light'>COP</span>)}
  </span>);
}

export default CurrencyFormatter;
