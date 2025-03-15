import logo from "../../assets/logo.webp";
import logoGif from "/login/logo-login.gif";
import { ArrowLeft } from "lucide-react";
import { verifyCode } from "../../services/userService";
import { useState, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Loader from "../../components/loader";

export default function formRecoveryCode() {

    const [recoveryPassCode, setRecoveryPassCode] = useState(["", "", "", "", "", ""]);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const location = useLocation();
    const inputRefs = useRef([]);

    const handleChange = (index, value) => {
        if (value.length <= 1 && /^[0-9]*$/.test(value)) {
            const newCode = [...recoveryPassCode];
            newCode[index] = value;
            setRecoveryPassCode(newCode);
            setError("");

            if (value !== "" && index < 5) {
                inputRefs.current[index + 1]?.focus();
            }
        }
    };

    const handleKeyDown = (index, e) => {
        if (e.key === "Backspace" && index > 0 && code[index] === "") {
            inputRefs.current[index - 1]?.focus();
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault()
        const fullCode = recoveryPassCode.join("")
        if (fullCode.length === 6) {
          setIsSubmitted(true);
          const email = location.pathname.split("/")[3];
          const decodeEmail = atob(location.pathname.split("/")[3]);
          verifyCode({ recoveryCode: fullCode, email: email }).then((response) => {
            if (response.info) navigate(`/set-password`, { state: { email: decodeEmail } });
          }).catch((error) => {
            console.error(error);
          }).finally(() => {
            setIsSubmitted(false);
          });
        } else {
          setError("Por favor, ingresa el código completo de 6 dígitos.")
        }
    }


    return (
        <div className="flex flex-col w-full justify-center items-center">
            <div className="flex flex-col w-full lg:border-[1px] lg:p-8 lg:border-gray-200 gap-10 rounded-lg lg:bg-white dark:lg:bg-slate-700 dark:lg:border-gray-700 xs:bg-black">
                <img src={logo} alt="logo" className="w-64 rounded-lg px-2 py-4 mx-auto grayscale brightness-0 dark:grayscale-0 dark:brightness-100 xs:hidden lg:block" />
                <img src={logoGif} alt="logo" className="w-64 rounded-lg px-2 py-4 mx-auto  hidden xs:block lg:hidden" />
                <div className="flex flex-col items-center gap-2">
                    <h1 className="xs:text-md lg:text-2xl xs:text-white lg:text-black font-bold dark:text-white text-center">Ingresa tu código de recuperación</h1>
                    <p className="xs:text-xs lg:text-sm xs:text-gray-200 lg:text-gray-600 dark:text-gray-200 text-center">Verifica el correo que te enviamos e inserta el código de recuperación</p>
                </div>
                <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
                    <div className="flex justify-center space-x-2">
                        {recoveryPassCode.map((digit, index) => (
                            <input
                                key={index}
                                type="text"
                                value={digit}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                ref={(el) => (inputRefs.current[index] = el)}
                                className="xs:h-8 xs:w-8 xs:text-sm lg:text-xl lg:w-12 lg:h-12 text-center text-2xl rounded border-none bg-gray-200 font-bold"
                                maxLength={1}
                            />
                        ))}
                    </div>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <button type="submit" className="xs:w-1/2 lg:w-2/3 xl:w-1/2 mx-auto py-2 rounded bg-purple-600 hover:bg-purple-700 text-white xs:text-xs lg:text-base">
                        {isSubmitted ? <Loader className="w-4 h-4 border-r-white" /> : "Verificar Código"}
                    </button>
                </form>
                <a href="/login" className="flex items-center justify-center gap-2 text-sm xs:text-gray-200 lg:text-gray-600 dark:text-gray-200 font-bold">
                    <ArrowLeft /> Volver a iniciar sesión
                </a>
            </div>
        </div>
    )
}