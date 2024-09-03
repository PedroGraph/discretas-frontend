import React, {useState, useEffect} from 'react';
import { Link, useLocation  } from 'react-router-dom';
import useProductContext from '../../hooks/useProductContext';
import UserInfo from './UserInfo';
import Orders from './Orders';
import '../../css/profile.css';


const Profile = () => {
    const {userLogged} = useProductContext();
    const [pathname, setPathname] = useState('');
    const [activeOptionsMobile, setActiveOptionsMobile] = useState(false);
    const location = useLocation();

    const handleActiveOptions = () => {
      setActiveOptionsMobile(!activeOptionsMobile);
    };
    
    useEffect(() => {
      if (userLogged !== undefined) {
        const timeoutId = setTimeout(() => {
          if (userLogged.length === 0) {
            window.location.href = '/login';
          }
        }, 1000);
        return () => clearTimeout(timeoutId);
      }
    }, [userLogged]);

    useEffect(() => {
      setPathname(location.pathname);
    }, [location.pathname]);

    return(
        <div className='d-flex profile-section-container-main'>
            {
              pathname === '/my-profile' && (
                <div className='col-md-10 profile-info'> 
                  <UserInfo/>
                </div>
              )
            }
            {
              pathname === '/orders' && (
                <Orders/>
              )
            }
        </div>
    )
}

export default Profile;