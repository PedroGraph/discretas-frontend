import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { currencyFormat } from "../utils/formats";
import { colorMap } from "../utils/helper";
import PropTypes from "prop-types";
import { banksAvailables } from "../utils/helper";
import PackageIcon from "../components/icons/package";
import LocationIcon from "../components/icons/location";
import UserIcon from "../components/icons/user";
import InvoiceIcon from "../components/icons/invoice";
import { getUserInfo, updateUserInfo } from "../services/userService";
import { phoneNumberFormat }  from "../utils/formats";
import { colombiaCitiesAndStates } from "../utils/colombia";
import { userInfoValidation } from "../utils/validations";
import { orderFormat } from "../utils/formats";
import { createOrder } from "../services/ordersService";
import Loader from "./loader";
import SuccessIcon from "./icons/success";

export default function Modal({ product, setModal }) {
  const [section, setSection] = useState(0);
  const [userInfo, setUserInfo] = useState({bank: ""});
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState();

  useEffect(() => {
    getUserInfo('dec0acd7-49d9-48df-ba81-fb927f2e9ea7').then((response) => {
      setUserInfo(response);
    });
  }, []);

  const handleSectionChange = (index) => {
    setError(null);
    const validations = userInfoValidation(userInfo);
    if(validations) return setError(validations);
    updateUserInfo('dec0acd7-49d9-48df-ba81-fb927f2e9ea7', userInfo)
      .then(() => {
        setSection(index);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleOrder = () => {
    setLoading(true);
    const info = {...userInfo, product};
    const order = orderFormat(info);
    createOrder(order).then(() => {
      setCompleted(true);
    }).catch((error) => {
      console.error(error);
    }).finally(() => {
      setLoading(false);
    })
  };

  return (
    <form
      className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50"
      onSubmit={(e) => e.preventDefault()}
    >
      <div className="flex relative">
        <button
          className="absolute bg-black rounded-full flex items-center justify-center font-bold z-60 -top-3 -right-3 p-2 h-8 w-8 text-white"
          onClick={() => setModal(false)}
        >
          X
        </button>
        <div className="flex relative  max-w-[600px] max-h-[600px] bg-gray-200">
          <img
            src={product?.images[0]?.imageName}
            alt="Product image"
            className="rounded rounded-r-none blur-[1px] contrast-50 object-cover h-[600px] w-[600px]"
          />
          <img
            src={product?.images[0]?.imageName}
            alt="Product image"
            className="rounded absolute h-[500px] w-[500px] top-[50%] left-[50%] bottom-[50%] right-[50%] translate-x-[-50%] translate-y-[-50%] object-cover"
          />
        </div>
        {section === 0 && !completed && !loading && (
          <div className="flex flex-col max-w-[600px] w-[700px] max-h-[600px] bg-gray-200 p-4 rounded rounded-l-none">
            <div className="flex flex-col h-[600px] bg-gray-200 p-4">
              <h1 className="text-center text-3xl mb-10 w-full">
                Llena tus datos
              </h1>
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Nombre"
                  className="rounded p-2 w-1/2"
                  defaultValue={userInfo?.firstName}
                  onChange={(e) => {
                    setUserInfo({
                      ...userInfo,
                      firstName: e.target.value,
                    });
                  }}
                />
                <input
                  type="text"
                  placeholder="Apellido"
                  className="rounded p-2 w-1/2"
                  defaultValue={userInfo?.lastName}
                  onChange={(e) => {
                    setUserInfo({
                      ...userInfo,
                      lastName: e.target.value,
                    });
                  }}
                />
              </div>
              <input
                type="text"
                placeholder="Correo electronico"
                className="rounded p-2 mt-4"
                defaultValue={userInfo?.email}
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    email: e.target.value,
                  });
                }}
              />
              <input
                type="text"
                placeholder="Telefono"
                className="rounded p-2 mt-4 focus:outline-none [&::-webkit-inner-spin-button]:hidden"
                maxLength={12}
                defaultValue={userInfo?.phoneNumber}
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    phoneNumber: e.target.value,
                  });
                }}
                value={phoneNumberFormat(userInfo?.phoneNumber)}
              />
              <input
                type="text"
                placeholder="Direccion"
                className="rounded p-2 mt-4"
                defaultValue={userInfo?.address}
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    address: e.target.value,
                  });
                }}
              />
              <select name="selectedCity" className="p-2 rounded mt-4" onChange={(e) => {setUserInfo({...userInfo, state: e.target.value})}}>
                <option hidden selected>
                  Selecciona un departamento
                </option>
                {colombiaCitiesAndStates?.map((state, index) => (
                  <option key={index} value={state.departamento} selected={state.departamento === userInfo?.state} className="text-black">
                    {state.departamento}
                  </option>
                ))}
              </select>
              <select name="selectedCity" className="p-2 rounded mt-4" onChange={(e) => {setUserInfo({...userInfo, city: e.target.value})}}>
                <option hidden selected>
                  Elige una ciudad
                </option>
               {
                colombiaCitiesAndStates[colombiaCitiesAndStates.findIndex((state) => state.departamento === userInfo.state)]?.ciudades?.map((city, index) => (
                  <option key={index} value={city} selected={city === userInfo?.city} className="text-black">
                    {city}
                  </option>
                ))
               }
              </select>
              <select name="selectedBank" className="p-2 rounded mt-4" onChange={(e) => {setUserInfo({...userInfo, bank: e.target.value})}}>
                <option hidden selected>
                  Elige un método de pago
                </option>
                {banksAvailables.map((bank, index) => (
                  <option key={index} value={bank} selected={bank === userInfo?.bank} className="text-black">
                    {bank}
                  </option>
                ))}
              </select>
              {error && <span className="text-red-600 text-center py-4">{error}</span>}
              <button
                className="text-white p-2 rounded mt-auto ml-auto"
                onClick={() => {
                  handleSectionChange(1);
                }}
              >
                <svg
                  height="20px"
                  width="20px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 512 512"
                  xmlSpace="preserve"
                >
                  <g>
                    <polygon
                      style={{ fill: "#000000" }}
                      points="512,256 0,0 167.724,256 0,512 	"
                    />
                  </g>
                </svg>
              </button>
            </div>
          </div>
        )}
        {section === 1 && !completed && !loading && (
          <div className="flex flex-col max-w-[700px] max-h-[600px] w-[700px] bg-gray-200 p-4  rounded rounded-l-none">
            <div className="flex flex-col h-[600px] p-4 gap-4">
              <h1 className="text-2xl text-center mb-6 w-full">
                Revisa y confirma tu compra
              </h1>
              <div className="w-full border-[1px] border-gray-400  rounded flex items-center p-4 gap-4">
                <LocationIcon />
                <ul className="flex flex-col gap-2">
                  <li className="text-[14px]">{userInfo.address}</li>
                  <li className="text-[14px]">{userInfo.city}, {userInfo.state}</li>
                </ul>
              </div>
              <div className="w-full border-[1px] border-gray-400  rounded flex flex-col p-4 gap-4">
                <h1 className="font-bold text-[14px]">{product.name}</h1>
                <div className="flex gap-4">
                  <PackageIcon className="w-8 h-8" />
                  <div className="flex flex-col gap-2 ">
                    <p className="font-bold text-[14px]">{currencyFormat(product.price)}</p>
                    <p className="text-[14px]">Cantidad: {product.quantityAvailable}</p>
                  </div>
                  <div className="flex flex-col justify-start gap-2">
                    <span className="flex gap-4 justify-between text-[14px]">
                      Color seleccionado:{" "}
                      <span
                        className={`${
                          colorMap[product.color + "Selected"]
                        } w-6 h-6 rounded text-white text-[10px] flex items-center justify-center mr-auto`}
                      ></span>
                    </span>
                    <span className="flex gap-4 justify-between text-[14px]">
                      Talla seleccionada:{" "}
                      <span
                        className={`bg-black w-6 h-6 rounded text-white text-[10px] flex items-center justify-center`}
                      >
                        {product.size}
                      </span>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-full border-[1px] border-gray-400  rounded flex  p-4 gap-4">
                  <UserIcon className="w-8 flex items-center h-full" />
                  <address className="flex flex-col gap-2">
                    <p className="font-bold text-[14px]">{userInfo.firstName} {userInfo.lastName}</p>
                    <p className="text-[12px]">{userInfo.email}</p>
                    <p className="text-[12px]">{userInfo.phoneNumber}</p>
                  </address>
                </div>
                <div className="w-full border-[1px] border-gray-400  rounded flex items-center p-4 gap-4">
                  <InvoiceIcon className="w-8 flex items-center h-full" />
                  <ul className="flex flex-col gap-2">
                    <li className="text-[14px]">Método de pago: {userInfo.bank}</li>
                    <li className="text-[14px]">
                      Monto a pagar: {currencyFormat(product.price * product.quantity)}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-auto flex justify-between">
                <button
                  className="text-white p-2 rounded"
                  onClick={() => {
                    setSection(0);
                  }}
                >
                  <svg
                    height="20px"
                    width="20px"
                    version="1.1"
                    id="Layer_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512 512"
                    xmlSpace="preserve"
                  >
                    <g>
                      <polygon
                        className="fill-black"
                        points="0,256 512,512 344.276,256 512,0 	"
                      />
                    </g>
                  </svg>
                </button>
                <button className="bg-black text-white p-2 rounded w-1/2" onClick={handleOrder}>
                  {loading ? <Loader /> : "Finalizar Compra"}
                </button>
              </div>
            </div>
          </div>
        )}
        {
          !loading && completed && (
            <div className="flex flex-col max-w-[600px] w-[700px] max-h-[600px] bg-gray-200 p-4 rounded rounded-l-none">
            <div className="flex flex-col h-[600px] bg-gray-200 p-4 items-center gap-10">
                <SuccessIcon />
              <h1 className="text-2xl text-center mb-6 w-full">
                ¡Felicidades! Hemos recibido tu compra
              </h1>
                <Link to="/ordenes" state={{ user: userInfo }}><button className="bg-black text-white px-4 py-2 rounded">Ver mis ordenes</button></Link>
              </div>
            </div>
          )}
      </div>
    </form>
  );
}

Modal.propTypes = {
  product: PropTypes.object,
  user: PropTypes.object,
  setModal: PropTypes.func,
  setSelectedCharactetiristic: PropTypes.func,
};
