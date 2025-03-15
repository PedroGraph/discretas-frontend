import { useEffect } from "react";
import logo from "../assets/logo.webp";
import shoppingCart from "../assets/shopping.svg";
import InputSearch from "./inputsearch";
import HamburguerIcon from "./icons/hamburguer";
import { useUserStore } from "../stores/userStore";
import { useThemeStore } from "../stores/themeStore";
import { Sun, Moon } from "lucide-react";
import UserIcon from "./icons/user";

export default function Navbar() {
  const { user, logout } = useUserStore();
  const { darkMode, toggleTheme } = useThemeStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <nav className="bg-black flex py-1 gap-4 justify-between">
      <a className="xs:w-4/6 lg:w-1/6 px-4 flex items-center" href="/">
        <img
          className="xs:h-[45px] xs:w-[130px] lg:h-[40px] "
          src={logo}
          alt="Logo"
          loading="lazy"
        />
      </a>
      <div className="w-1/4">
        <InputSearch />
      </div>
      <div className="w-1/2 items-center justify-end px-2 xs:hidden lg:flex lg:gap-4">
        <button
          className="relative flex items-center bg-white dark:bg-slate-700 h-[30px] w-[60px] rounded-full p-1 transition-all duration-300"
          onClick={() => toggleTheme()}
        >
          <div
            className={`transform transition-all duration-300 ${darkMode ? "translate-x-[25px]" : "translate-x-0"
              }`}
          >
            {darkMode ? (
              <Moon className="text-white text-sm p-0.5" />
            ) : (
              <Sun className="text-yellow-500 text-sm p-0.5" />
            )}
          </div>
        </button>
        <a href="/carrito" className="relative">
          <p className="bg-white py-1 px-4 rounded">
            <img
              src={shoppingCart}
              alt="Shopping Cart"
              className="h-[30px]"
              loading="lazy"
            />
          </p>
        </a>
      </div>
      <div className="items-center pl-4 pr-8 xs:hidden lg:flex">
        {user ? (
          <details className="cursor-pointer">
            <summary className="list-none">
              <UserIcon className="w-8 h-8 text-white" />
            </summary>
            <div className="absolute right-0 bg-black top-[80px] z-20 w-full flex flex-col items-end animation-ctn p-4">
              <a href="/profile" className="text-white text-lg py-2 px-2 hover:text-[#8941ff]">
                Ver perfil
              </a>
              <a href="/ordenes" className="text-white text-lg py-2 px-2 hover:text-[#8941ff]">
                Mis órdenes
              </a>
              <button
                className="text-white text-lg py-2 px-2 hover:text-[#8941ff]"
                onClick={(e) => {
                  e.preventDefault();
                  logout();
                }}
              >
                Cerrar sesión
              </button>
            </div>
          </details>
        ) : (
          <a href="/login">
            <UserIcon className="w-8 h-8 text-white" />
          </a>
        )}
      </div>
      <details className="xs:block lg:hidden">
        <summary className="list-none">
          <HamburguerIcon className="h-12 w-12 px-2 xs:block lg:hidden" />
        </summary>
        <div className="absolute right-0 bg-black top-[45px] px-1 z-20 w-full flex flex-col items-end animation-ctn">
          <a href="/ordenes" className="text-white text-sm py-2 px-2">
            Mis ordenes
          </a>
          <a href="/profile" className="text-white text-sm py-2 px-2">
            Mi cuenta
          </a>
          {user ? (
            <button
              className="text-white text-sm p-2"
              onClick={logout}
            >
              Cerrar sesión
            </button>
          ) : (
            <a href="/login" className="text-white text-sm p-2">
              Iniciar sesión
            </a>
          )}
          <div className="flex items-center gap-2">
            <button
              className="relative flex items-center bg-white dark:bg-slate-700 h-[25px] w-[60px] rounded-full p-1 transition-all duration-300"
              onClick={() => toggleTheme()}
            >
              <div
                className={`transform transition-all duration-300 ${darkMode ? "translate-x-[30px]" : "translate-x-0"
                  }`}
              >
                {darkMode ? (
                  <Moon className="text-white text-sm p-0.5" />
                ) : (
                  <Sun className="text-yellow-500 text-sm p-0.5" />
                )}
              </div>
            </button>

            <a href="/carrito" className="relative p-2">
              <p className="bg-white py-1 px-2 rounded">
                <img
                  src={shoppingCart}
                  alt="Shopping Cart"
                  className="h-[20px]"
                  loading="lazy"
                />
              </p>
            </a>
          </div>
        </div>
      </details>
    </nav>
  );
}