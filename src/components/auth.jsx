import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { login, register, loginWithFacebook, loginWithGoogle } from "../api/loginFirebase";
import { firebaseErrors } from "../utils/firebaseErrors";
import Loader from "./loader";

export default function Auth() {

  const location = useLocation();
  const [loginError, setLoginError] = useState();
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const actionUser = async (e) => {
    try{
      e.preventDefault();
      setLoginError();
      setIsLoading(true);
      const pressedButton = e.nativeEvent.submitter.value;
      console.log(pressedButton);
      const user = await (pressedButton === "login" 
        ? login(e) 
        : pressedButton === "facebook" 
        ? loginWithFacebook() 
        : pressedButton === "google" 
        ? loginWithGoogle() 
        : register(e)
      );
      setIsCompleted(true);
      if(user) window.location.href = "/";
    }catch(error){
      console.error(error.code);
      setLoginError(e.nativeEvent.submitter.value === "login" ? {login: firebaseErrors[error.code]} : {register: firebaseErrors[error.code]});
    }finally{
      setIsLoading(false);
    }
  }

  useEffect(() => {
    document.title = location.pathname.includes("login") ? "Iniciar sesión" : "Registrarse";
  }, [location.pathname]);

  return location.pathname.includes("login") ? (
    <form
      className="flex flex-col max-w-500 w-3/4 max-w-[450px]"
      onSubmit={(e) => actionUser(e)}
    >
      <img
        src={"/login/logo-login.gif"}
        alt="discreta seduccion logo"
        className="w-full xs:h-[300px] sm:h-[350px] md:h-[400px] lg:h-[400px] xs:block lg:hidden"
      />
      <input
        type="email"
        placeholder="usuario@tuemail.com"
        name="email"
        className="mt-2 p-2 rounded"
      />
      <input
        type="password"
        placeholder="************"
        name="password"
        className="mt-2 p-2 rounded mb-2"
      />
      {loginError && <div className="text-red-500 text-center mb-2"><p>{loginError?.login || loginError.register}</p></div>}
      {isLoading ? (
        <div className="flex items-center justify-center mt-4">
          <Loader className="w-[50px] h-[50px]"/>
        </div>
      ) : (
        <>
          <button
            type="submit"
            className="xs:bg-white mb-4 xs:text-black rounded p-2 lg:bg-black lg:text-white w-100"
            name="action"
            value="login"
          >
            Iniciar sesión
          </button>
          <div className=" flex items-center h-[4px] my-1">
            <div className="h-[0.1em] flex-1 bg-black" />
            <span className="mx-[0.5em] mb-[0.3em]">o</span>
            <div className="h-[0.1em] flex-1 bg-black" />
          </div>
          <button
            className="bg-white mt-2 text-black w-100 flex gap-2 items-center justify-center py-3 rounded mb-2"
            type="submit"
            name="action"
            value="google"
          >
            Iniciar sesión con{" "}
            <img
              src={"/login/social media/google.svg"}
              alt="google-img-logo"
              className="h-[20px]"
            />
          </button>
          <button
            className="text-white w-100 flex gap-2 items-center justify-center py-3 rounded"
            type="submit"
            style={{ backgroundColor: "#066CD2" }}
            name="action"
            value="facebook"
          >
            Iniciar sesión con{" "}
            <img
              src={`/login/social media/facebook.svg`}
              alt="facebook-img-logo"
              className="h-[20px]"
            />
          </button>
          <div className="mt-2 text-center flex justify-center gap-2">
            <span className="xs:text-white lg:text-black">
              ¿No tienes cuenta?
            </span>
            <a className="text-blue-600 font-bold" href="/register">
              Regístrate aquí
            </a>
          </div>
        </>
      )}
    </form>
  ) : (
    <form className="flex flex-col w-3/4 max-w-[400px] gap-4" onSubmit={(e) => actionUser(e, "register")}>
      <img
        src={"/login/logo-login.gif"}
        alt="discreta seduccion logo"
        className="w-full xs:h-[300px] sm:h-[350px] md:h-[400px] lg:h-[400px] xs:block lg:hidden"
      />
      <input
        className="xs:p-1 lg:p-2 rounded"
        type="text"
        placeholder="Nombre(s)"
        name="name"
      />
      <input
        className="xs:p-1 lg:p-2 rounded"
        type="text"
        placeholder="Apellido(s)"
        name="last_name"
      />
      <input
        className="xs:p-1 lg:p-2 rounded"
        type="email"
        placeholder="Correo electrónico"
        name="email"
      />
      <input
        className="xs:p-1 lg:p-2 rounded"
        type="phone"
        placeholder="Teléfono (opcional)"
        name="phone"
      />
      <input
        className="xs:p-1 lg:p-2 rounded"
        type="password"
        placeholder="Contraseña"
        name="password"
        max={20}
      />
      <input
        className="xs:p-1 lg:p-2 rounded"
        type="password"
        placeholder="Confirmar contraseña"
        name="repeat_password"
        max={20}
      />

      {loginError && <div className="text-red-500 text-center mb-2"><p>{loginError?.login || loginError.register}</p></div>}

      {isLoading ? (
        <div className="flex items-center justify-center mt-4">
          <Loader className="w-[50px] h-[50px]"/>
        </div>
      ) : isCompleted ? (
        <button className="success">
          ✅
        </button>
      ) : (
        <>
            <button
            type="submit"
            className="xs:bg-white xs:text-black rounded lg:bg-black lg:text-white mt-4"
            style={{ padding: "1em" }}
            >
                Registrarse
            </button>
            <span className="xs:text-white xs:text-center lg:text-start lg:text-black my-4">
                ¿Ya tienes una cuenta? Inicia sesión aquí
            </span>
        </>
      )}

      
    </form>
  );
}
