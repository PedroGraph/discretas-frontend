import { useUserStore } from "../../stores/userStore";
import { useEffect } from "react";
import { User, MapPin, Heart, Bell, Settings } from "lucide-react";
import PersonalInformation from "./personalInformation/personal";
import AddressesInfo from "./Addresses/address";
import Wishlist from "./wishlist/wishlist";
import Notifications from "./notifications/userNotifications";
import SettingsInfo from "./settings/setting";
import Loader from "../../components/loader";
import { useNavigate, useLocation } from "react-router-dom";
import ErrorPage from "../../components/errorProfile";

const SECTIONS = [
  { id: 'profile', Icon: User, label: 'Perfil', path: '/profile', Component: PersonalInformation },
  { id: 'addresses', Icon: MapPin, label: 'Direcciones', path: '/profile/addresses', Component: AddressesInfo },
  { id: 'wishlist', Icon: Heart, label: 'Lista de deseos', path: '/profile/wishlist', Component: Wishlist },
  { id: 'notifications', Icon: Bell, label: 'Notificaciones', path: '/profile/notifications', Component: Notifications },
  { id: 'settings', Icon: Settings, label: 'Configuración', path: '/profile/settings', Component: SettingsInfo }
];

export default function Profile() {
  const { 
    user,
    isLoading,
    profileError,
    allUserInfo,
    updateUserInformation, 
    getAllUserInfo, 
    profileSection, 
    setProfileSection,
    addresses, 
    getAddresses,
    setAddressToUser,
    deleteAddressFromUser,
    wishlist, 
    getWishlist,
    notifications, 
    getNotifications,
    setStatusNotifications,
    setWishlist
  } = useUserStore();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const page = location.pathname.split("/")[2] || location.pathname.split("/")[1];
    setProfileSection(page);
  } , [location]);

  useEffect(() => {
    getAllUserInfo();
    getAddresses();
    getWishlist();
    getNotifications();
  }, []);

  useEffect(() => {
    const section = SECTIONS.find(s => s.id === profileSection);
    if (section) navigate(section.path);
  }, [profileSection]);

  if (!user || profileError) return <ErrorPage />;

  const ActiveComponent = SECTIONS.find(s => s.id === profileSection)?.Component;
  const componentProps = {
    profile: { userInfo: allUserInfo, updateUserInformation },
    addresses: { addresses, setAddressToUser, deleteAddressFromUser },
    wishlist: { wishlist, setWishlist },
    notifications: { notifications, setStatusNotifications, userId: allUserInfo?.id },
    settings: { userInfo: allUserInfo }
  };

  if (isLoading) return (
    <div className="flex items-center justify-center bg-white h-screen dark:bg-gray-900">
      <Loader section={true} />|
    </div>
  );

  return !isLoading && (
    <div className="flex flex-col items-center bg-gray-200 dark:bg-gray-900 gap-4 w-full min-h-screen xs:py-4 lg:p-10">
      <div className="w-full bg-white dark:bg-slate-700 max-h-[600px] flex items-center gap-4 p-4 lg:rounded max-w-[2000px]">
        <img 
          src={allUserInfo?.photoUrl} 
          alt="profile_image" 
          className="w-full xs:max-w-[75px] lg:max-w-[150px] rounded-full object-cover" 
        />
        <div>
          <h1 className="xs:text-base lg:text-2xl font-bold dark:text-white">
            {allUserInfo?.firstName} {allUserInfo?.lastName}
          </h1>
          <p className="xs:text-xs lg:text-sm dark:text-white">{allUserInfo?.email}</p>
          <p className="xs:text-xs lg:text-sm dark:text-white">{allUserInfo?.phoneNumber}</p>
          <p className={`${allUserInfo?.accountStatus === "active" ? "text-[#8941ff]" : "text-red-500"} font-bold xs:text-xs lg:text-sm dark:text-white`}>
            {allUserInfo?.accountStatus === "active" ? "Cuenta verificada" : "Inactivo"}
          </p>
        </div>
      </div>

      <div className="grid xs:grid-cols-3 h-auto lg:grid-cols-5 gap-2 w-full bg-white dark:bg-slate-700 py-2 px-2 lg:rounded-lg max-w-[2000px]">
        {SECTIONS.map(({ id, Icon, label }) => (
          <div
            key={id}
            onClick={() => setProfileSection(id)}
            className={`${
              profileSection === id ? "bg-black dark:bg-[#8941ff]" : "bg-gray-200 hover:bg-gray-400 dark:hover:bg-[#bb91ff]"
            } flex xs:flex-col lg:flex-row items-center xs:gap-2 lg:gap-4 p-2 justify-center rounded-lg cursor-pointer`}
          >
            <Icon className={`w-5 h-5 ${profileSection === id ? "text-white" : "text-black"}`} />
            <span className={`lg:text-sm xs:text-xs ${profileSection === id ? "text-white" : "text-black"}`}>
              {label}
            </span>
          </div>
        ))}
      </div>

      <div className="xs:p-4 lg:p-10 border-2 bg-white dark:bg-slate-700 lg:rounded-lg border-gray-200 dark:border-none w-full max-w-[2000px]">
        {ActiveComponent && <ActiveComponent {...componentProps[profileSection]} />}
      </div>
    </div>
  );
}