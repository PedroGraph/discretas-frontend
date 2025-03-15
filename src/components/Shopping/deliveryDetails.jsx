import PropTypes from 'prop-types';
import { MapPin, PenIcon, Calendar, Package, User } from 'lucide-react';
import { currencyFormat } from '../../utils/formats';
import { useUserStore } from '../../stores/userStore';
import { lazy, Suspense, useState, useRef } from 'react';
import Loader from '../../components/loader';

export default function DeliveryDetails({ userInfo, shoppingCart }) {
    return (
        <>
        <section className="w-full flex gap-4 xs:mb-16 lg:mb-0">
          <div className="w-full flex flex-col gap-4">
            <div className="border-[1px] dark:bg-slate-500 dark:border-none bg-white rounded flex flex-col p-8 gap-8 justify-center relative">
              <div className='flex gap-4 items-center'>
                <MapPin className="w-8 h-8 text-black dark:text-white" />
                <h1 className="text-lg font-bold dark:text-white">Dirección de envío</h1>
              </div>
              <div className='grid grid-rows-2  items-center'>
                <span className="text-base font-bold text-gray-600 dark:text-white cols-span-2">
                  {userInfo.address}
                </span>
                <span className="text-sm text-gray-600 dark:text-white">
                  {userInfo.city}, {userInfo.state}
                </span>
                <span className="text-sm text-gray-600 dark:text-white">
                  {userInfo?.zip}
                </span>
              </div>
              <div className='absolute flex items-center gap-2 xs:top-5 xs:right-1 lg:top-5 lg:right-10 cursor-pointer text-white group hover:bg-gray-900 rounded-lg px-4 py-2'>
                <PenIcon className="w-4 h-4 text-black dark:text-white group-hover:text-[#8941ff]" />
                <span className='text-base text-black dark:text-white group-hover:text-[#8941ff] xs:hidden lg:block' onClick={()=> window.location.href = `/profile/addresses`}>Editar detalles</span>
              </div>
            </div>
            <div className="border-[1px] dark:bg-slate-500 dark:border-none bg-white rounded flex flex-col p-8 gap-8 justify-center relative">
              <div className='flex gap-4 items-center'>
                <User className="w-8 h-8 text-black dark:text-white" />
                <h1 className="text-lg font-bold dark:text-white">Información de contacto</h1>
              </div>
              <div className='grid grid-rows-2  items-center'>
                <span className="text-base font-bold text-gray-600 dark:text-white cols-span-2">
                  {userInfo.email}
                </span>
                <span className="text-sm text-gray-600 dark:text-white">
                  +57 {userInfo.phoneNumber}
                </span>
              </div>
              <div className='absolute flex items-center gap-2 xs:top-5 xs:right-1 lg:top-5 lg:right-10 cursor-pointer text-white group hover:bg-gray-900 rounded-lg px-4 py-2'>
                <PenIcon className="w-4 h-4 text-black dark:text-white group-hover:text-[#8941ff]" />
                <span className='text-base text-black dark:text-white group-hover:text-[#8941ff] xs:hidden lg:block' onClick={()=> window.location.href = `/profile`}>Editar detalles</span>
              </div>
            </div>
            <div className="border-[1px] dark:bg-slate-500 dark:border-none bg-white rounded flex flex-col p-8 gap-8 justify-center relative">
              <div className='flex gap-4 items-center'>
                <Package className="w-8 h-8 text-black dark:text-white" />
                <h1 className="text-lg font-bold dark:text-white">Detalles del Pedido</h1>
              </div>
              <div className='flex items-center gap-4'>
                  <Calendar className="w-6 h-6 text-gray-600 dark:text-gray-300 " />
                  <span className="xs:text-sm lg:text-base font-bold text-gray-600 dark:text-gray-300 cols-span-2">
                    Fecha de entrega estimada: 6 de Enero de 2025
                  </span>
              </div>
              <div className='grid grid-cols-1 gap-8'>
                  {shoppingCart.map((product, index) => (
                    <div className="grid xs:grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-4" key={index}>
                      <img
                        src={product.product.images[0].imageName}
                        className="xs:h-20 xs:w-20 sm:h-24 sm:w-24 md:h-32 md:w-32 lg:h-36 lg:w-36 xl:h-40 xl:w-40 rounded object-cover"
                      />
                      <div className="flex flex-col xs:col-span-2 lg:col-span-3 md:col-span-4 lg:col-span-5 xl:col-span-6 justify-center gap-2">
                        <span className="text-sm line-clamp-2 font-bold dark:text-white">
                          {product.product.productName}
                        </span>
                        <span className="text-sm text-gray-600 dark:text-white">
                          {product.product.productCategory}
                        </span>
                        <span className="text-sm font-bold text-gray-600 dark:text-white">
                          {currencyFormat(
                            product.product.productPrice * product.quantity
                          )}
                        </span>
                        <div className='xs:grid xs:grid-cols-2 sm:flex gap-4'>
                          {product.color && (
                            <span className="text-sm text-gray-600 dark:text-white bg-gray-100 dark:bg-slate-700 rounded-full px-2 py-1">
                              Color: {product.color}
                            </span>
                          )}
                          {product.size && (
                            <span className="text-sm text-gray-600 dark:text-white bg-gray-100 dark:bg-slate-700 rounded-full px-2 py-1">
                              Talla: {product.size}
                            </span>
                          )}
                          <span className="text-sm text-gray-600 dark:text-white bg-gray-100 dark:bg-slate-700 rounded-full px-2 py-1">
                            Cantidad: {product.quantity}
                          </span>
                        </div>
                       
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </section>
      </>
    )
}

DeliveryDetails.propTypes = {
    userInfo: PropTypes.object.isRequired,
    shoppingCart: PropTypes.array.isRequired,
}