import Loader from "../../components/loader";

export default function FormLogin({ formRegister, handleSubmit, errors, actionUser, loginError, isLoading }) {
    return (
        <form
            className="flex flex-col w-full"
            onSubmit={(e) => {
                const pressedButton = e.nativeEvent.submitter.value;
                if (pressedButton === "google" || pressedButton === "facebook") {
                    actionUser({}, e);
                } else {
                    handleSubmit((data) => actionUser(data, e))(e);
                }
            }}
        >
            <img
                src={"/login/logo-login.gif"}
                alt="discreta seduccion logo"
                className="w-full xs:h-[300px] sm:h-[350px] md:h-[400px] lg:h-[400px] xs:block lg:hidden"
            />


            <input
                type="email"
                placeholder="usuario@tuemail.com"
                {...formRegister("email", { required: "El correo es obligatorio" })}
                className={`mt-2 p-2 rounded border ${errors.email ? "border-red-500" : "border-gray-300"} lg:dark:bg-slate-700 lg:dark:text-white`}
            />


            <input
                type="password"
                placeholder="************"
                {...formRegister("password", { 
                    required: "La contraseña es obligatoria", 
                    minLength: { value: 6, message: "Mínimo 6 caracteres" } 
                })}
                className={`my-2 p-2 rounded border ${errors.password ? "border-red-500" : "border-gray-300"} lg:dark:bg-slate-700 lg:dark:text-white`}
            />

            {errors.password && !errors.email && <p className="text-red-500 text-center my-2">La contraseña es obligatoria</p>}
            {errors.email && !errors.password && <p className="text-red-500 text-center my-2">El correo es obligatorio</p>}

  
            {loginError && <div className="text-red-500 text-center mb-2"><p>{loginError?.login || loginError.register}</p></div>}
            
           

            {isLoading ? (
                <div className="flex items-center justify-center mt-4">
                    <Loader className="w-[50px] h-[50px]" />
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

                    <a href="/recovery-password" className="text-center mb-2">
                        <span className="text-black dark:text-white text-center cursor-pointer text-sm hover:text-blue-400 dark:hover:text-blue-400">
                            ¿Olvidaste tu contraseña?
                        </span>
                    </a>

                    <div className="flex items-center h-[4px] my-1">
                        <div className="h-[0.1em] flex-1 bg-black dark:bg-white" />
                        <span className="mx-[0.5em] mb-[0.3em] dark:text-white">o</span>
                        <div className="h-[0.1em] flex-1 bg-black dark:bg-white" />
                    </div>

                    <button
                        className="bg-white mt-2 text-black w-100 flex gap-2 items-center justify-center py-3 rounded mb-2"
                        type="submit"
                        name="action"
                        value="google"
                    >
                        Iniciar sesión con{" "}
                        <img src={"/login/social media/google.svg"} alt="google-img-logo" className="h-[20px]" />
                    </button>

                  
                    <button
                        className="text-white w-100 flex gap-2 items-center justify-center py-3 rounded"
                        type="submit"
                        style={{ backgroundColor: "#066CD2" }}
                        name="action"
                        value="facebook"
                    >
                        Iniciar sesión con{" "}
                        <img src={`/login/social media/facebook.svg`} alt="facebook-img-logo" className="h-[20px]" />
                    </button>

                    <div className="mt-2 text-center flex justify-center gap-2">
                        <span className="xs:text-white lg:text-black lg:dark:text-white">¿No tienes cuenta?</span>
                        <a className="text-blue-600 font-bold dark:text-[#8941ff] hover:text-black dark:hover:text-white" href="/register">Crear una cuenta</a>
                    </div>
                </>
            )}
        </form>
    );
}
