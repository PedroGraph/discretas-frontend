import logo from "../../assets/logo.webp";
import logoGif from "/login/logo-login.gif";
import { LockKeyhole, ArrowLeft } from "lucide-react";
import { setPassword } from "../../services/userService";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../../components/loader";

export default function FormSetPassword() {

    const [recoveryPasswordMessage, setRecoveryPasswordMessage] = useState(null);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();


    const handleRecoveryPassword = async (e) => {
        e.preventDefault();
        setIsSubmitted("loading");
        const email = location.state.email;
        const password = new FormData(e.target).get("password");
        const confirmPassword = new FormData(e.target).get("confirmPassword");

        if(password.length < 8) {
            setRecoveryPasswordMessage("La contraseña debe tener al menos 8 caracteres");
            setIsSubmitted(null);
            return;
        }

        if (password !== confirmPassword) {
            setRecoveryPasswordMessage("Las contraseñas no coinciden");
            setIsSubmitted(null);
            return;
        }

        setRecoveryPasswordMessage(null);

        setPassword({ email, password }).then((response) => {
            if (response.info) navigate(`/login`);
        }).catch((error) => {
            console.error(error);
        }).finally(() => {
            setIsSubmitted(null);
        });
   
    }

    return (
        <div className="flex flex-col w-full justify-center items-center">
            <div className="flex flex-col w-full lg:border-[1px] lg:p-8 lg:border-gray-200 gap-10 rounded-lg lg:bg-white dark:lg:bg-slate-700 dark:lg:border-gray-700 xs:bg-black">
                <img src={logo} alt="logo" className="w-64 rounded-lg px-2 py-4 mx-auto grayscale brightness-0 dark:grayscale-0 dark:brightness-100 xs:hidden lg:block" />
                <img src={logoGif} alt="logo" className="w-64 rounded-lg px-2 py-4 mx-auto  hidden xs:block lg:hidden" />
                
                <form onSubmit={handleRecoveryPassword} className="flex flex-col gap-4">
                    <div className="">
                        <label htmlFor="password" className="text-sm font-medium text-gray-400 font-bold">
                            Contraseña
                        </label>
                        <div className="relative flex items-center border-[1px] border-gray-200 rounded-lg ">
                            <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                className="w-full rounded-lg border-none bg-transparent  pl-10 pr-4 py-4 text-gray-900 focus:border-transparent focus:outline-none focus:ring-0 dark:text-white"
                                placeholder="************"
                                required
                            />
                        </div>
                    </div>
                    <div className="">
                        <label htmlFor="confirmPassword" className="text-sm font-medium text-gray-400 font-bold">
                            Confirmar contraseña
                        </label>
                        <div className="relative flex items-center border-[1px] border-gray-200 rounded-lg">
                            <LockKeyhole className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                className="w-full rounded-lg border-none bg-transparent pl-10 pr-4 py-4 text-gray-900 focus:border-transparent focus:outline-none focus:ring-0 dark:text-white"
                                placeholder="************"
                                required
                            />
                        </div>
                        {recoveryPasswordMessage && <p className="text-red-500 text-center">{recoveryPasswordMessage}</p>}
                        {isSubmitted === "loading" && <Loader className={"h-8 w-8 my-4"}/>}
                        {!isSubmitted &&  <button className="xs:bg-[#8941ff] lg:bg-black text-white px-4 py-2 rounded-lg w-full mt-4 hover:bg-gray-700 dark:lg:bg-[#8941ff]">Restablecer contraseña</button>}
                    </div>
                </form>
                <a href="/login" className="flex items-center justify-center gap-2 text-sm xs:text-gray-200 lg:text-gray-600 dark:text-gray-200 font-bold">
                    <ArrowLeft /> Volver a iniciar sesión
                </a>
            </div>
        </div>
    )
}