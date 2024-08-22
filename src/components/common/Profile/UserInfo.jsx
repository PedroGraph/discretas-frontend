import React, {useEffect, useState, useRef} from "react";
import useProductContext from "../../hooks/useProductContext";
import {UpdateUserInfo} from "../../services/Auth";
import { Spinner } from "react-bootstrap";
import colombia from "../../../../colombia.json";
import profilePic from "../../../../image/profile.jpg"

const UserInfo = () => {

    const {userInfo, userLogged, isComplete, setIsComplete} = useProductContext();
    const [profile, setProfile] = useState({});
    const profileLoaded = useRef(false);

    useEffect(() => {
        if (userLogged.length > 0 && !profileLoaded.current) {
          userInfo().then((response) => {
            console.log(response);  
            setProfile(response);
           profileLoaded.current = true; 
          });
        }
    }, [userLogged]);

    const handleChange = (e) => {
      const { name, value } = e.target;
      setProfile((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    };

    const handleSaveChanges = (e) =>{
      e.preventDefault()
      setIsComplete(true);
      setTimeout(() =>{
        profile.uid = userLogged;
        UpdateUserInfo(profile).then(response => {
          console.log(response)
        });
        setIsComplete(false)
      },1000)
      
    }

    return(
        <> 
        <div className='d-flex'>
          <div className='col-md-3'>
            <img src={profile?.photourl || profilePic} alt="" />
          </div>
          <div className='col-md-9'>
              <p>{`${profile.name} ${profile.last_name}`}</p>
              <span>{profile.email}</span>
          </div>
        </div>
        <div className='personal-information'>
          <div className='text-center mt-4'>
            <span>Información Personal</span>
          </div>
          <div>
            <div>
              <span>Teléfono</span>
              <input onChange={(e)=>{handleChange(e)}} type="text" name="phone" value={profile.phone}/>
            </div>
            <div>
              <span>Cédula</span>
              <input onChange={(e)=>{handleChange(e)}} type="text" name="idcard" value={profile.idcard}/>
            </div>
            <div>
              <span>Dirección</span>
              <input onChange={(e)=>{handleChange(e)}} type="text" name="address" value={profile.address}/>
            </div>
            <div>
              <span>Departamento</span>
              <select
                  name="state"
                  id="state"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  <option hidden value="">
                    Departamento
                  </option>
                  {colombia.map((state) => (
                    <option key={state.id} value={state.departamento} selected={state.departamento === profile.state ? 'selected' : ''}>
                      {state.departamento}
                    </option>
                  ))}
                </select>
            </div>
            <div>
              <span>Ciudad</span>
              <select
                  name="city"
                  id="city"
                  onChange={(e) => {
                    handleChange(e);
                  }}
                >
                  <option hidden value="">
                    Departamento
                  </option>
                  {colombia.map((state, stateIndex) => {
                    if (state.departamento === profile.state) {
                      return state.ciudades.map((city, cityIndex) => (
                        <option
                          key={`${stateIndex}-${cityIndex}`}
                          value={city}
                          selected={city === profile.city ? 'selected' : ''}
                        >
                          {city}
                        </option>
                      ));
                    }
                  })}
                </select>
            </div>
          </div>
          <div>
            <button onClick={(e)=>{handleSaveChanges(e)}} className="save-infouser-button">
              {
                !isComplete ? (
                  <span>Guardar Cambios</span>
                ):(
                  <Spinner/>
                )
              }
            </button>
          </div>
        </div>
      </>
    )
}

export default UserInfo;