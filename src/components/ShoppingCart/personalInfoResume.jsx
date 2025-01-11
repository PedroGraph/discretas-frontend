import PropTypes from 'prop-types';
import UserIcon from '../icons/user';
import DeliverIcon from '../icons/deliver';

export default function PersonalInfoResume ({userInfo, handleUserInfo, setSections}) {

    const userInfoCompleted = () => {
        return (
          userInfo?.firstName &&
          userInfo?.lastName &&
          userInfo?.email &&
          userInfo?.phoneNumber
        );
      };
    
      const deliveryInfoCompleted = () => {
        return userInfo?.address && userInfo?.city && userInfo?.state;
      };

    return(
        <>
        <section className="w-full gap-4 flex justify-between">
          <details open className="group rounded-md  overflow-hidden w-1/2">
            <summary
              className={`flex items-center justify-between px-4 py-3 pointer-events-none  ${
                userInfoCompleted()
                  ? "group-open:bg-green-400"
                  : "group-open:bg-gray-400"
              }  h-[100px] text-white font-medium rounded-md group-open:rounded-b-none text-3xl group-open:text-white group-open:bg-gray-600`}
            >
              Información del usuario
              <span className="ml-2">
                <UserIcon className="w-10 h-10 text-white" />
              </span>
            </summary>
            <ul className="p-4 bg-white group-open:animate-appears flex flex-col gap-4">
              <li className="flex w-full gap-4">
                <div className="w-1/2">
                  <span className="text-[12px] text-gray-400">Nombres</span>
                  <input
                    className="px-4 py-2 border-[1px] rounded w-full text-md"
                    type="text"
                    value={userInfo?.firstName}
                    onChange={(e) =>
                      handleUserInfo({
                        ...userInfo,
                        firstName: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="w-1/2">
                  <span className="text-[12px] text-gray-400">
                    Apellidos
                  </span>
                  <input
                    className="px-4 py-2 border-[1px] rounded w-full text-md"
                    type="text"
                    value={userInfo?.lastName}
                    onChange={(e) =>
                      handleUserInfo({
                        ...userInfo,
                        lastName: e.target.value,
                      })
                    }
                  />
                </div>
              </li>
              <li className="flex w-full gap-4">
                <div className="w-1/2">
                  <span className="text-[12px] text-gray-400">
                    Correo electrónico
                  </span>
                  <input
                    className="px-4 py-2 border-[1px] rounded w-full text-md"
                    type="email"
                    value={userInfo?.email}
                    onChange={(e) =>
                      handleUserInfo({ ...userInfo, email: e.target.value })
                    }
                  />
                </div>
                <div className="w-1/2">
                  <span className="text-[12px] text-gray-400">
                    Número de teléfono
                  </span>
                  <input
                    className="px-4 py-2 border-[1px] rounded w-full text-md"
                    type="text"
                    value={userInfo?.phoneNumber}
                    onChange={(e) =>
                      handleUserInfo({
                        ...userInfo,
                        phoneNumber: e.target.value,
                      })
                    }
                  />
                </div>
              </li>
            </ul>
          </details>
          <details open className="group rounded-md overflow-hidden w-1/2">
            <summary
              className={`flex items-center justify-between px-4 py-3 pointer-events-none ${
                deliveryInfoCompleted()
                  ? "group-open:bg-green-400"
                  : "group-open:bg-gray-400"
              }  h-[100px] text-white font-medium rounded-md group-open:rounded-b-none text-3xl group-open:text-white group-open:bg-gray-600`}
            >
              Información de envío
              <span className="ml-2">
                <DeliverIcon className="w-10 h-10 text-white fill-white" />
              </span>
            </summary>
            <ul className="p-4 bg-white group-open:animate-appears flex flex-col gap-4">
              <li className="w-full gap-4">
                <span className="text-[12px] text-gray-400">Dirección</span>
                <input
                  className="px-4 py-2 border-[1px] rounded w-full text-md"
                  type="text"
                  value={userInfo?.address}
                  onChange={(e) =>
                    handleUserInfo({ ...userInfo, address: e.target.value })
                  }
                />
              </li>
              <li className="w-full gap-4">
                <span className="text-[12px] text-gray-400">Ciudad</span>
                <input
                  className="px-4 py-2 border-[1px] rounded w-full text-md"
                  type="text"
                  value={userInfo?.city}
                  onChange={(e) =>
                    handleUserInfo({ ...userInfo, city: e.target.value })
                  }
                />
              </li>
              <li className="w-full gap-4">
                <span className="text-[12px] text-gray-400">
                  Departamento
                </span>
                <input
                  className="px-4 py-2 border-[1px] rounded w-full text-md"
                  type="text"
                  value={userInfo?.state}
                  onChange={(e) =>
                    handleUserInfo({ ...userInfo, state: e.target.value })
                  }
                />
              </li>
            </ul>
          </details>
        </section>
        <div className="w-full pr-4 flex justify-end">
          <button
            className="text-white rounded p-2 px-4 bg-black hover:bg-[#8941ff] mt-auto"
            onClick={() => {
              if (userInfoCompleted() && deliveryInfoCompleted()) {
                setSections({ personalInfo: false, paymentInfo: false, finalInfo: true });
              }
            }}
          >
            Siguiente
          </button>
        </div>
      </>
    )
}

PersonalInfoResume.propTypes = {
    userInfo: PropTypes.object.isRequired,
    handleUserInfo: PropTypes.func.isRequired,
    setSections: PropTypes.func.isRequired
}