import Auth from "../../components/auth";
export default function login () {
    const image = Math.floor(Math.random() * 5) ;
    return (
      <div className="xs:grid  lg:flex">
        <div className='lg:relative xs:hidden lg:block lg:w-2/6'>
            <img src={`/login/image-login-${image > 0 ? image : 1}.jpg`} alt="login_image_background" className='xs:hidden lg:block lg:w-full lg:h-[100vh] xl:h-[90.2vh] lg:object-cover'/>
        </div>
        <div className='flex flex-col lg:justify-center items-center xs:bg-black lg:bg-gray-200 lg:w-4/6 lg:h-[100vh] xl:h-[90.2Svh]'>
            <Auth form={false}/>
        </div>
      </div>
    )
}