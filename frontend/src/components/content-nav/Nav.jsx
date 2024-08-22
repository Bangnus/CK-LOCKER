import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './nav.css';
import { FaHome } from "react-icons/fa";
import { BsSafeFill } from "react-icons/bs";
import { PiSignOutFill } from "react-icons/pi";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from 'react-router-dom';
// import { useState, useEffect } from 'react';
import { IoPersonOutline } from "react-icons/io5";
import { FcSafe } from "react-icons/fc";
import Cookies from 'js-cookie';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
// import NavLoading from '../content-loading/nav-loading';     
import Headroom from "react-headroom";
import { MdOutlineDisplaySettings } from "react-icons/md";
import { IoDocumentText } from "react-icons/io5";
import { IoDocumentAttach } from "react-icons/io5";


const Nav = ({user, Avatar}) => {
    return(
        <Headroom>
            <div className=''>
                <div className="bg-white w-full drop-shadow-sm">
                    <div className='flex justify-between'>
                        <div className='flex items-center'>
                            <div className='bg-red-500 text-white rounded-r-lg px-[15px] flex justify-center items-center text-[20px] font-primaryMedium gap-x-2 h-full'>
                                <div className='text-[40px]'>
                                    <FcSafe />
                                </div>
                                <span className='md:hidden'>Chookiat Warehouse</span>
                            </div>
                        </div>
                        {
                            user ?
                            <div>
                                <Menu as="div" className="relative inline-block text-left">
                                    <div>
                                        <MenuButton>
                                            <div className='flex gap-x-3 items-center py-3 px-5'>
                                                <div className='bg-red-500 text-white h-[40px] w-[40px] flex justify-center items-center border-[2px] border-red-400 rounded-[10px]'>
                                                    <span>{Avatar}</span>
                                                </div>
                                                <div className='md:hidden'>
                                                    <span>{user.body[0].name === null ? user.body.name : user.body[0].name}</span>
                                                </div>
                                                <IoIosArrowDown className='md:hidden' />
                                            </div>
                                        </MenuButton>
                                        <Setting /> 
                                    </div>
                                </Menu>
                            </div>
                            :
                            <div>
                                <div className='flex gap-x-3 items-center py-3 px-5'>
                                    <div className="animate-pulse flex space-x-4">
                                        <div className="rounded-[10px] bg-red-400 h-[40px] w-[40px]"></div>
                                    </div>
                                    <div className="animate-pulse flex space-x-4">
                                        <div className=" bg-red-400 h-[20px] rounded-md w-[150px]"></div>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                    <div className='border-dashed border mt-[1px]'></div>
                    <div className='px-2'>
                        <div className='mx-2 flex items-center h-full'>
                            <OptionNav />
                        </div>
                    </div>
                </div>
            </div> 
        </Headroom>
    );
}

const Setting = () => {

    const navigate = useNavigate();
    const SignOut = () => {
        Cookies.remove('authToken');
        if(Cookies.get('authToken') === undefined) return navigate('/');
    }

    const GotoSystemManage = () => {
        navigate('/view-authorize');
    }

    const menu = [
        {
            label: 'Account Settings',
            action: null,
            icon: <IoPersonOutline />,
        },
        {
            label: 'System Management',
            action: GotoSystemManage,
            icon: <MdOutlineDisplaySettings />,
        },
        {
            label: 'Sign out',
            action: SignOut,
            icon: <PiSignOutFill />,
        },
    ];

    return(
        <MenuItems
          transition
          className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
        >
          <div className="py-1">
            {menu.map((item, key) => (
                <MenuItem key={key}>
                 <button className='px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 w-full flex justify-start items-center gap-x-2' onClick={item.action}>
                     <div className='text-[18px]'>
                        {item.icon}
                     </div>
                     <span>
                        {item.label}
                     </span>
                 </button>
               </MenuItem>
            ))}
          </div>
        </MenuItems>
    );
}

const OptionNav = () => {

    const option = [
        {
            label: 'Home',
            link: '/home',
            icon: <FaHome />
        },
        {
            label: 'ล็อคเกอร์',
            link: '/view-safe',
            icon: <BsSafeFill />
        },
        {
            label: 'ขอเบิกเอกสาร',
            link: '/view-takedoc',
            icon: <IoDocumentText />
        },
        {
            label: 'รายการขอเบิกเอกสาร',
            link: '/view-takedoc-list',
            icon: <IoDocumentAttach />
        },
    ];

    return(
        <nav className='w-full mx-2'>
            <ul className='flex gap-x-3'>
                {option.map((item, key) => (
                    <li key={key}>
                        <NavLink to={item.link} className={({isActive}) => (isActive ? 'active' : 'inactive' )}>
                            <div className='text-[18px]'>
                                {item.icon}
                            </div>
                            <span>{item.label}</span>
                        </NavLink> 
                    </li>
                ))}
            </ul>
        </nav>
    );
};

Nav.propTypes = {
    user: PropTypes.object,
    Avatar: PropTypes.any,
}

export default Nav;