import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { login, register, loginWithFacebook, loginWithGoogle } from "../api/loginFirebase";
import { firebaseErrors } from "../utils/firebaseErrors";
import { isASocialNetwork } from "../utils/helper";
import { setNewUser, getUserInfo, getTokenFromGoogle} from "../services/userService";
// import { isASocialNetwork } from "../utils/helper";

export default function useUsers() {
    const location = useLocation();
    const {
      register: formRegister,
      handleSubmit,
      formState: { errors },
    } = useForm();

    const [loginError, setLoginError] = useState();
    const [isCompleted, setIsCompleted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
  
    const actionUser = async (data, event) => {
        try {
          event.preventDefault();
          setLoginError();
          setIsLoading(true);
          const pressedButton = event.nativeEvent.submitter.value;
          const actions = {
            login: login,
            register: register,
            facebook: loginWithFacebook,
            google: loginWithGoogle
          };
          
          if (actions[pressedButton]) {
            const user = await actions[pressedButton](data);          
            const userExists = await verifIfUserExists(user.email);
            if(isASocialNetwork(pressedButton)) {
                if(!userExists.message){
                    console.log(user);
                    const googleUser =  await getTokenFromGoogle(user);
                    console.log(googleUser);
                }
            }
            setIsCompleted(true);
            // if (user) window.location.href = "/";
          }
        } catch (error) {
          console.error(error);
          setLoginError({ [event.nativeEvent.submitter.value]: firebaseErrors[error.code] });
        } finally {
          setIsLoading(false);
        }
      };

    const verifIfUserExists = async (user) => {
        const response = await getUserInfo(user);
        return !response.message;
    }

  return { loginError, isCompleted, isLoading, actionUser, formRegister, handleSubmit, errors };
}