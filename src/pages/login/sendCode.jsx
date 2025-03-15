import logo from "../../assets/logo.webp";
import logoGif from "/login/logo-login.gif";
import { Mail, ArrowLeft } from "lucide-react";
import { recoveryPassword } from "../../services/userService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader";

export default function formRecoveryPassword() {

    const [recoveryPasswordMessage, setRecoveryPasswordMessage] = useState(null);
    const navigate = useNavigate();

    const handleRecoveryPassword = async (e) => {
        e.preventDefault();
        setRecoveryPasswordMessage("loading");
        const email = new FormData(e.target).get("email");
        try{
            const response = await recoveryPassword({ email });
            navigate(`/recovery-password/success/${response.encodedEmail}`);
        } catch (error) {
            console.error(error);
            setRecoveryPasswordMessage(error.message);
        }finally{
            setRecoveryPasswordMessage(null);
        }
    }

    return (
        <div className="flex flex-col w-full justify-center items-center">
            <div className="flex flex-col w-full lg:border-[1px] lg:p-8 lg:border-gray-200 gap-10 rounded-lg lg:bg-white dark:lg:bg-slate-700 dark:lg:border-gray-700 xs:bg-black">
                <img src={logo} alt="logo" className="w-64 rounded-lg px-2 py-4 mx-auto grayscale brightness-0 dark:grayscale-0 dark:brightness-100 xs:hidden lg:block" />
                <img src={logoGif} alt="logo" className="w-64 rounded-lg px-2 py-4 mx-auto  hidden xs:block lg:hidden" />
                <div className="flex flex-col items-center gap-2">
                    <h1 className="xs:text-lg lg:text-2xl xs:text-white lg:text-black font-bold dark:text-white text-center">Recuperar contraseña</h1>
                    <p className="xs:text-xs lg:text-sm xs:text-gray-200 lg:text-gray-600 dark:text-gray-200 text-center">Ingresa tu correo para recibir instrucciones para recuperar tu contraseña</p>
                </div>
                <form onSubmit={handleRecoveryPassword}>
                    <div className="">
                        <label htmlFor="email" className="text-sm font-medium text-gray-400 font-bold">
                            Correo Electrónico
                        </label>
                        <div className="relative flex items-center border-[1px] border-gray-200 rounded-lg ">
                            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                className="w-full rounded-lg border-none bg-transparent  pl-10 pr-4 py-4 text-gray-900 focus:border-transparent focus:outline-none focus:ring-0 dark:text-white"
                                placeholder="writteyourmail@gmail.com"
                                required
                            />
                        </div>
                        {recoveryPasswordMessage === "loading" && <Loader className={"h-8 w-8 my-4"}/>}
                        {!recoveryPasswordMessage &&  <button className="xs:bg-[#8941ff] lg:bg-black text-white px-4 py-2 rounded-lg w-full mt-4 hover:bg-gray-700 dark:lg:bg-[#8941ff]">Enviar código de recuperación</button>}
                    </div>
                </form>
                <a href="/login" className="flex items-center justify-center gap-2 text-sm xs:text-gray-200 lg:text-gray-600 dark:text-gray-200 font-bold">
                    <ArrowLeft /> Volver a iniciar sesión
                </a>
            </div>
        </div>
    )
}