import PropTypes from 'prop-types';
import LocationIcon from '../icons/location';
import UserIcon from '../icons/user';
import DeliverIcon from '../icons/deliver';
import TotalPurchase from './TotalPurchase';
import PaymentIcon from '../icons/payment';

export default function PurchaseFinalInfo({ userInfo, shoppingCart, setSections }) {
    return (
        <>
        <section className="w-full flex gap-4">
          <div className="w-3/4 flex flex-col gap-4">
            <div className="border-[1px]  bg-white rounded flex flex-col p-4 gap-1 justify-center relative">
              <span className="text-[12px] text-gray-600">
                Detalles de la dirección de envío
              </span>
              <div className="flex gap-4">
                <span className="bg-white w-10 h-10  border-0 p-1 flex justify-center items-center rounded-full">
                  <LocationIcon className="w-10 h-10 " />
                </span>
                <div className="flex flex-col justify-center">
                  <span className="text-sm">{userInfo.address}</span>
                  <span className="text-sm">
                    {userInfo.city}, {userInfo.state}
                  </span>
                </div>
              </div>
              <span className='absolute top-0 right-0 text-[12px] text-blue-600 p-4 cursor-pointer' onClick={() => setSections({ personalInfo: true, paymentInfo: false, finalInfo: false })}>Editar detalles</span>
            </div>
            <div className="border-[1px]  bg-white rounded flex flex-col p-4 gap-1 justify-center relative">
              <span className="text-[12px] text-gray-600">
                Detalles de la persona que recibe
              </span>
              <div className="flex gap-4">
                <span className="bg-white border-0 p-1 w-10 h-10 flex justify-center items-center rounded-full">
                  <UserIcon className="w-8 h-8  " />
                </span>
                <div className="flex flex-col justify-center">
                  <span className="text-sm">
                    {userInfo.firstName} {userInfo.lastName}
                  </span>
                  <span className="text-sm">{userInfo.email}</span>
                  <span className="text-sm">
                    +57 {userInfo.phoneNumber}
                  </span>
                </div>
              </div>
              <span className='absolute top-0 right-0 text-[12px] text-blue-600 p-4 cursor-pointer' onClick={() => setSections({ personalInfo: true, paymentInfo: false, finalInfo: false })}>Editar detalles</span>
            </div>

            <div className="border-[1px]  bg-white rounded flex flex-col p-4 gap-1 justify-center relative">
              <span className="text-[12px] text-gray-600">
                Método de pago
              </span>
              <div className="flex gap-4">
                <span className="bg-white border-0 p-1 w-10 h-10 flex justify-center items-center rounded-full">
                  <PaymentIcon className="w-8 h-8  " />
                </span>
                <div className="flex flex-col justify-center">
                  <span className="text-sm">
                    {userInfo.firstName} {userInfo.lastName}
                  </span>
                  <span className="text-sm">{userInfo.email}</span>
                  <span className="text-sm">
                    +57 {userInfo.phoneNumber}
                  </span>
                </div>
              </div>
              <span className='absolute top-0 right-0 text-[12px] text-blue-600 p-4 cursor-pointer' onClick={() => setSections({ personalInfo: false, paymentInfo: true, finalInfo: false })}>Editar detalles</span>
            </div>

            <div className="border-[1px]  bg-white rounded flex flex-col p-4 gap-10 justify-center ">
              <div className="flex flex-col gap-2">
                <span className="text-[12px] text-gray-600 mb-auto">
                  Detalles de los productos
                </span>
                <div className="flex items-center gap-">
                  <span className="bg-white border-0 p-1 w-10 h-10 flex justify-center items-center rounded-full">
                    <DeliverIcon className="w-6 h-6" />
                  </span>
                  <span className="text-sm text-gray-600 flex flex-col">
                    <p>Fecha de entrega estimada: 6 de Enero de 2025</p>
                    <p>Productos: {shoppingCart.length}</p>
                  </span>
                </div>
              </div>
              {shoppingCart.map((product, index) => (
                <div className="flex gap-4" key={index}>
                  <img
                    src={product.product.images[0].imageName}
                    className="h-20 w-20 rounded"
                  />
                  <div className="flex flex-col justify-center">
                    <span className="text-sm line-clamp-1 font-bold">
                      {product.product.productName}
                    </span>
                    {product.color && (
                      <span className="text-sm text-gray-600">
                        Color: {product.color}
                      </span>
                    )}
                    {product.size && (
                      <span className="text-sm text-gray-600">
                        Talla: {product.size}
                      </span>
                    )}
                    <span className="text-sm text-gray-600h">
                      Cantidad: {product.quantity}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div></div>
          <div
            className={`w-1/4 rounded bg-white flex flex-col gap-4`}
          >
            <TotalPurchase setSections={setSections} />
          </div>
        </section>
      </>
    )
}

PurchaseFinalInfo.propTypes = {
    userInfo: PropTypes.object.isRequired,
    shoppingCart: PropTypes.object,
    setSections: PropTypes.func
}