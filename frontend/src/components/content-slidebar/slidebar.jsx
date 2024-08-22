import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './slideBar.css';
import { FaBars } from "react-icons/fa6";
import { FaHome } from "react-icons/fa";
import { BsSafeFill } from "react-icons/bs";
import Proptypes from 'prop-types';
import { IoIosLogOut } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const SildeBar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const navigate = useNavigate();

    const SignOut = () => {
        Cookies.remove('authToken');
        if(Cookies.get('authToken') === undefined) return navigate('/');
    }

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1024) {
                setIsOpen(false);
            }
        }
        handleResize();
    }, []);

    return(
        <div className={`slideBar bg-slate-900 ${isOpen ? 'w-[280px]' : 'w-[70px]'} xl:${() => setIsOpen(!isOpen)} my-5 ml-5 rounded-xl h-[95vh] animate-fade-right animate-once animate-duration-[600ms] animate-ease-in-out transition duration-200 ease-in-out`}>
            <div className="py-3 flex justify-center text-[20px] font-bold bg-red-500 rounded-lg text-white">
                <span>{isOpen ? <FullSildeBar hanbleBar={() => setIsOpen(!isOpen)} /> : <SmailSildeBar hanbleBar={() => setIsOpen(!isOpen)} />}</span>
            </div>
            <div className='flex justify-center items-center w-full'>
                <SildeBarOption isFullBar={isOpen} />
            </div>
            <div className='px-2'>
                <button className='my-2 bg-red-400 text-white w-full flex justify-center items-center gap-x-2 py-2 rounded-lg hover:bg-red-500 duration-100 ease-in-out' onClick={() => SignOut()}>
                    <div className='text-[20px]'>
                        <IoIosLogOut />
                    </div>
                    <span className={`${isOpen ? '' : 'hidden'}`}>Sign Out</span>
                </button>
            </div>
        </div>
    );
}

const FullSildeBar = ({hanbleBar}) => {
    return(
        <div className='flex justify-between items-center gap-x-3'>
            <div>
                <span>ChooKiat Locker</span>
            </div>
            <button className='px-2 py-2 bg-red-400 rounded-lg' onClick={hanbleBar}>
                <FaBars />
            </button>
        </div>
    );
};

const SmailSildeBar = ({hanbleBar}) => {
    return(
        <div className='flex justify-between items-center gap-x-3'>
            <button className='px-2 py-2 bg-red-400 rounded-lg' onClick={hanbleBar}>
                <FaBars />
            </button>
        </div>
    );
};

const SildeBarOption = ({isFullBar}) => {

    const option = [
        {
            label: 'Home',
            link: '/home',
            icon: <FaHome />
        },
        {
            label: 'Safe',
            link: '/view-safe',
            icon: <BsSafeFill />
        },
    ];

    return(
        <nav className='w-full mx-2'>
            <ul>
                {option.map((item, key) => (
                    <li key={key}>
                        <NavLink to={item.link} className={({isActive}) => (isActive ? 'active' : 'inactive' )}>
                            <div className='text-[18px]'>
                                {item.icon}
                            </div>
                            <span className={`${isFullBar ? '' : 'hidden'}`}>{item.label}</span>
                        </NavLink> 
                    </li>
                ))}
            </ul>
        </nav>
    );
};

FullSildeBar.propTypes = {
    hanbleBar: Proptypes.func,
}

SmailSildeBar.propTypes = {
    hanbleBar: Proptypes.func,
}

SildeBarOption.propTypes = {
    isFullBar: Proptypes.bool,
}

export default SildeBar;