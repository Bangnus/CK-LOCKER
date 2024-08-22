import { useState, useEffect, useRef } from 'react';
import Input from "../../components/inputfield";
import Buttons from "../../components/button";
import { useDispatch } from 'react-redux';
import { UserSignin } from '../../actions/authAction';
import AlertMsg from '../../components/content-alert/alertMsg';
import Typed from 'typed.js';
import { useNavigate } from 'react-router-dom';
import Snackbar from '../../components/content-alert/notfy/alert';
import Cookies from 'js-cookie';

//asset
import bg from '../../assets/image/img/web-ck.png';


const SignIn = () => {

    document.title = "Warehouse | Sign In";

    const navigate = useNavigate();
    const el = useRef(null);
    const dispatch = useDispatch();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [activeAlert, setActiveAlert] = useState(false);

    const InputField = [
        {
            title: "Username",
            value: username,
            type: 'text',
            onChange: setUsername,
        },
        {
            title: "Password",
            value: password,
            type: 'password',
            onChange: setPassword,
        },
    ];

    const handleSignIn = async (e) => {
        try {
            e.preventDefault();
            const lastPath = Cookies.get('lastPath');
            if (!username || !password) {
                throw 'กรุกรอกรายลักข้อมูลให้ครบถ้วน.';
            }
            const data = { username, password };
            const response = await dispatch(UserSignin(data));
            if (response.status == true) {
                Snackbar({message: 'SignIn successfully.'});
                setActiveAlert(false);
                if (lastPath === undefined || lastPath === '/') {
                    navigate('/home');
                } else {
                    navigate(lastPath);
                }
            } else {
                throw `${response.message.response.data.message}`;
            }
        } catch (error) {
            setActiveAlert(true);
            setErrMsg(error);
        }
    }

    useEffect(() => {

        const authToken = Cookies.get('authToken');
        const lastPath = Cookies.get('lastPath');

        if (authToken) {
            navigate(lastPath);
        }

        const typed = new Typed(el.current, {
            strings: ['<i className="text-blue-500">Wellcome to</i>', '<span className="text-red-600">ChooKiat Warehouse.</span>'],
            typeSpeed: 30,
            backSpeed: 20,
            backDelay: 1000,
            loop: true,
          });

          return () => {
            typed.destroy();
          };
    }, [navigate]);

    return(
        <>
            <div className="flex md:block h-screen font-primaryRegular">
                <div className="w-1/2 md:w-full flex justify-center">
                    <div className='mx-10 mt-10 xl:mx-5 2xl:mx-10 md:w-full md:mx-5 bg-white rounded-t-md md:rounded-md drop-shadow-sm animate-fade-up animate-once animate-duration-[600ms] animate-ease-in-out'>
                        <img src={bg} alt="" className='h-full object-cover rounded-t-md md:rounded-md' />
                    </div>
                </div>
                <div className="w-1/2 md:w-full flex justify-center items-center py-5 animate-fade-left animate-once animate-duration-[600ms] animate-ease-in-out">
                    <div className='ml-10 px-14 md:px-5 h-full lg:px-5 xl:ml-5 2xl:ml-10 w-full md:mx-5 bg-white md:py-5 rounded-l-md md:rounded-md drop-shadow-sm'>
                        <form className='w-full flex h-full items-center'>
                            <div className="w-full">
                                <div className='text-[28px] font-bold'>
                                    <span>Sign In</span>
                                </div>
                                <div className='text-[28px] py-2 font-medium text-red-500'>
                                    <span ref={el}></span>
                                </div>
                                <div>
                                    <AlertMsg errMsg={errMsg} active={activeAlert} onClick={() => {setActiveAlert(false)}} />
                                </div>
                                <div>
                                    {InputField.map((item, key) => (
                                        <Input key={key} id={key} styles="w-full" title={item.title} type={item.type} value={item.value} onChange={item.onChange} />
                                    ))}
                                </div>
                                <div className="my-2">
                                    <Buttons type="submit" name="Sign In" style="w-full" onEvent={handleSignIn} />
                                </div>
                            </div>
                        </form> 
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignIn;