import { useForm } from "react-hook-form";
import { useUserStore } from "../../stores/userStore";
import FormLogin from "./formLogin";
import FormRegister from "./formRegister";
import FormRecoveryPassword from "./sendCode";
import FormRecoveryCode from "./recoveryCode";
import FormSetPassword from "./formSetPassword";

export default function Auth() {
  const { loginError, isCompleted, isLoading, actionUser } = useUserStore();
  const {
    register: formRegister,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const path = location.pathname;

  const forms = {
    login: (
      <FormLogin
        formRegister={formRegister}
        handleSubmit={handleSubmit}
        errors={errors}
        actionUser={actionUser}
        loginError={loginError}
        isLoading={isLoading}
      />
    ),
    register: (
      <FormRegister
        actionUser={actionUser}
        loginError={loginError}
        isLoading={isLoading}
        isCompleted={isCompleted}
      />
    ),
    "set-password": <FormSetPassword />,
    "success": <FormRecoveryCode />,
    "recovery-password": <FormRecoveryPassword />,
  };

  const getFormKey = () => {
    if (path.includes("login")) return "login";
    if (path.includes("register")) return "register";
    if (path.includes("success")) return "success";
    if (path.includes("set-password")) return "set-password";
    return "recovery-password";
  };

  const commonClasses = "flex flex-col w-3/4 gap-4";
  const maxWidths = {
    login: "max-w-[450px]",
    register: "max-w-[800px]",
    "set-password": "max-w-[800px]",
    "success": "max-w-[800px]",
    "recovery-password": "max-w-[800px]",
  };

  const formKey = getFormKey();

  return <div className={`${commonClasses} ${maxWidths[formKey]}`}>{forms[formKey]}</div>;
}
