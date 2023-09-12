import React, {useState} from "react";
import Currency from "./CurrencyFormater";
import useProductContext from "../hooks/useProductContext";
import Checkout from "./Checkout";
import { useNavigate } from "react-router-dom";


const Store = () =>{
    
    const shopping = JSON.parse(localStorage.getItem('store')) || [];
    const [orderItems, setOrderItems] = useState(shopping);
    const [ordered, setOrdered] = useState(false);
    const [payment, setPayment] = useState(false);

    const { setOrderList } = useProductContext();
    const navigate = useNavigate();

    const isThereProducts = orderItems.length > 0 && !ordered;
    
    const handleQuantityChange = (id, newQuantity) => {
        setOrderItems(prevItems =>
          prevItems.map(item => (item._id === id ? { ...item, quantity: newQuantity } : item))
        );
    };
    
    const handleDeleteItem = (id) => {
      setOrderItems(prevItems =>{
        const newArray = [...prevItems]; 
        newArray.splice(id, 1); 
        localStorage.setItem('store', JSON.stringify(newArray));
        return newArray; 
      });
  
      setOrderList(prevItems =>{
        const newArray = [...prevItems]; 
        newArray.splice(id, 1); 
        return newArray; 
      });
    };
      
    const handlePayment = () =>{
      setPayment(!payment);
    }

    const totalAmount = orderItems.reduce((total, item) => total +  item.price * item.quantity, 0);
    const shipment = 12000;

    return (
        <>
          <div className='products-table d-flex p-5 pt-3 align-items-center justify-content-center flex-column'>
          {
           isThereProducts && (
            <div className='items-section p-5 pb-1 d-flex align-items-center justify-content-center'>
                <div className='d-flex p-3 items-table-titles'>
                  <div className="col-md-5 ps-5">Producto</div>
                  <div className="col-md-1 text-center ps-3">Precio</div>
                  <div className="col-md-4 text-center ms-3">Cantidad</div>
                  <div className="col-md-1 text-center">Total</div>
                  <div className=" text-center"></div>
                </div>
              </div>
            )}
            {
             isThereProducts ? (
                orderItems.map((items, index) => (
                  <div key={items._id} className='items-section p-5 pt-1 pb-1 d-flex align-items-center justify-content-end'>
                    <div className='d-flex  p-3 items-table-products'>
                      <div className='d-flex col-md-5'>
                        <img src={items.image[0]} alt="" />
                        <div className='d-flex flex-column justify-content-center'>
                          <strong>{items.name}</strong>
                          {items?.size && <p>Talla: {items?.size}</p>}
                          {items?.color &&<p>Color: {items?.color}</p>}
                        </div>
                      </div>
                      <div className='text-center col-md-1'><strong>$<Currency amount={items.price}/></strong></div>
                      <div className='col-md-4 d-flex items-section-products-quantity justify-content-start'>
                        <button onClick={() => handleQuantityChange(items._id, Math.max(1, items.quantity - 1))}>-</button>
                        <div><input type="text" value={items.quantity} readOnly/></div>
                        <button onClick={() => handleQuantityChange(items._id, items.quantity + 1)}>+</button>
                      </div>
                      <div className='col-md-1 text-center'>
                        <strong>$<Currency amount={items.price * items.quantity}/></strong>
                       
                      </div>
                      <div className="col-md-1 d-flex justify-content-center" onClick={()=> handleDeleteItem(index)}> 
                        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="25" height="25" viewBox="0 0 30 30">
                          <path d="M 14.984375 2.4863281 A 1.0001 1.0001 0 0 0 14 3.5 L 14 4 L 8.5 4 A 1.0001 1.0001 0 0 0 7.4863281 5 L 6 5 A 1.0001 1.0001 0 1 0 6 7 L 24 7 A 1.0001 1.0001 0 1 0 24 5 L 22.513672 5 A 1.0001 1.0001 0 0 0 21.5 4 L 16 4 L 16 3.5 A 1.0001 1.0001 0 0 0 14.984375 2.4863281 z M 6 9 L 7.7929688 24.234375 C 7.9109687 25.241375 8.7633438 26 9.7773438 26 L 20.222656 26 C 21.236656 26 22.088031 25.241375 22.207031 24.234375 L 24 9 L 6 9 z"></path>
                        </svg>
                      </div>
                    </div>
                  </div>
                ))
              ):(
                <div className="d-flex align-items-center flex-column p-3"> 
                    <h3 className="text-center">¿Quieres ver nuestros productos? Haz clic acá</h3>
                    <button className="w-50" onClick={(e) =>{navigate('/')}}>Let's Go</button>
                </div>
              ) 
            }
          </div>
          <div className='d-flex p-5 pt-3 align-items-center justify-content-center store-section-value'>
            <div>
              <strong>Cupón de Descuento</strong>
              <p>¿Tienes un código de descuento? Ingrésalo aquí</p>
              <input type="text" name="coupon" id="coupon" placeholder='Escribe el código del cupón'/>
              <button>Aplicar Cupón</button>
            </div>
            <div>
              <strong>Detalles de Pago</strong>
              <div className='d-flex justify-content-between'>
                <span>Subtotal Carrito</span>
                <p>$<Currency amount={totalAmount}/></p>
              </div>
              <div className='d-flex justify-content-between'>
                <span>Subtotal descuento</span>
                <p>$<Currency amount={0}/></p>
              </div>
              <div className='d-flex justify-content-between'>
                <span>Subtotal envío</span>
                <p>$<Currency amount={12000}/></p>
              </div>
              <div className='d-flex justify-content-between'>
                <span>Valor total</span>
                <p>$<Currency amount={totalAmount + shipment}/></p>
              </div>
            </div>
          </div>
          {
            !payment & isThereProducts ? (
              <div className="d-flex justify-content-center align-items-center">
                <div className="p-3 arrow-store-section d-flex flex-column" onClick={handlePayment}>
                  <span>Finalizar Compra</span>
                  <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                    <path d="M23.245 4l-11.245 14.374-11.219-14.374-.781.619 12 15.381 12-15.391-.755-.609z"/>
                  </svg>
                </div>
              </div>
            ):(
              isThereProducts && (
                <Checkout/>
              )
            )
          }
        
          </>
    )
}

export default Store;