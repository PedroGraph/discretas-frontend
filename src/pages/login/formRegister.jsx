import { useForm } from "react-hook-form";
import { Mail, Lock, User, Phone } from "lucide-react";
import Loader from "../../components/loader";

export default function FormRegister({ actionUser, loginError, isLoading, isCompleted }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <div className="flex items-center justify-center">
      <div className="bg-white dark:bg-slate-700 p-8 rounded-lg shadow-lg w-full">
        <h2 className="text-2xl font-bold text-center mb-2 dark:text-white">Crea tu cuenta</h2>
        <p className="text-gray-600 text-center mb-4 dark:text-white">
          Únete a nuestra comunidad y descubre nuestra colección exclusiva
        </p>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit((data) => actionUser(data))}>
          <div className="flex gap-2">
            <div className="relative w-1/2">
              <User className="absolute left-3 top-3 text-gray-400 dark:text-white" size={20} />
              <input
                className={`w-full pl-10 p-2 border rounded dark:bg-slate-500 dark:border-slate-700 dark:text-white ${errors.name ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-300"}`}
                type="text"
                placeholder="Nombre"
                {...register("name", { required: "El nombre es obligatorio" })}
              />
            </div>

            <div className="relative w-1/2">
              <User className="absolute left-3 top-3 text-gray-400 dark:text-white" size={20} />
              <input
                className={`w-full pl-10 p-2 border rounded dark:bg-slate-500 dark:border-slate-700 dark:text-white ${errors.last_name ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-300"}`}
                type="text"
                placeholder="Apellido"
                {...register("last_name", { required: "El apellido es obligatorio" })}
              />
            </div>
          </div>

          <div className="relative">
            <Mail className="absolute left-3 top-3 text-gray-400 dark:text-white" size={20} />
            <input
              className={`w-full pl-10 p-2 border rounded dark:bg-slate-500 dark:border-slate-700 dark:text-white ${errors.email ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-300"}`}
              type="email"
              placeholder="Correo electrónico"
              {...register("email", {
                required: "El correo es obligatorio",
                pattern: { value: /\S+@\S+\.\S+/, message: "Correo inválido" },
              })}
            />
          </div>

          <div className="relative">
            <Phone className="absolute left-3 top-3 text-gray-400 dark:text-white" size={20} />
            <input
              className={`w-full pl-10 p-2 border rounded dark:bg-slate-500 dark:border-slate-700 dark:text-white ${errors.phone ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-300"}`}
              type="tel"
              placeholder="Teléfono (opcional)"
              {...register("phone")}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400 dark:text-white" size={20} />
            <input
              className={`w-full pl-10 p-2 border rounded dark:bg-slate-500 dark:border-slate-700 dark:text-white ${errors.password ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-300"}`}
              type="password"
              placeholder="Contraseña"
              {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: { value: 6, message: "Mínimo 6 caracteres" },
              })}
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-3 text-gray-400 dark:text-white" size={20} />
            <input
              className={`w-full pl-10 p-2 border rounded dark:bg-slate-500 dark:border-slate-700 dark:text-white ${errors.repeat_password ? "border-red-500 dark:border-red-500" : "border-gray-300 dark:border-gray-300"}`}
              type="password"
              placeholder="Confirmar contraseña"
              {...register("repeat_password", {
                required: "Debes confirmar tu contraseña",
                validate: (value, { password }) =>
                  value === password || "Las contraseñas no coinciden",
              })}
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              id="terms"
              type="checkbox"
              {...register("terms", { required: "Debes aceptar los términos" })}
              className="w-5 h-5 rounded border border-gray-400 text-purple-600 focus:ring-purple-500 cursor-pointer rounded-lg"
            />
            <label htmlFor="terms" className="text-gray-700 dark:text-white cursor-pointer">
              Acepto los <span className="text-purple-600 font-medium">términos y condiciones</span>
            </label>
          </div>
          
          {loginError && <div className="text-red-500 text-center mb-2">{loginError?.login || loginError.register}</div>}

          {isLoading ? (
            <div className="flex items-center justify-center mt-4">
              <Loader className="w-[50px] h-[50px]" />
            </div>
          )  : (
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded font-bold hover:bg-purple-700"
            >
              Crear cuenta
            </button>
          )}
          
          <p className="text-center text-gray-600 mt-4 dark:text-white">
            ¿Ya tienes una cuenta? {" "}
            <span className="text-purple-600 font-bold cursor-pointer" onClick={() => window.location.href = "/login"}>
              Inicia sesión
            </span>
          </p>
        </form>
      </div>
    </div>
  );
}
