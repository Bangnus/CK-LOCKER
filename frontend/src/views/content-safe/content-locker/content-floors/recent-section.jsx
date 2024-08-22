import { useContext } from 'react';
import { LockerFloorsContext } from './view-floor';
import IconDropdown from '../../../../components/content-dropdown/icon-drop';
import { BiSolidFileDoc } from "react-icons/bi";

const RecentSction = () => {

    const lockerContext = useContext(LockerFloorsContext);

    return(
        <div className="w-full my-5">
            {
                lockerContext.floors.map((item, key) => (
                    <div key={key} className={`border-2 px-2 py-2 border-gray-200 rounded-xl my-2 animate-fade-up animate-once animate-duration-${key}000 animate-ease-in-out`}>
                        <div className='flex justify-between items-center'>
                            <div className='flex gap-x-2 items-center'>
                                <div className='bg-gray-100 h-[40px] w-[40px] text-[30px] rounded-md flex justify-center items-center text-red-400'>
                                    <BiSolidFileDoc className='animate-jump animate-once animate-duration-1000 animate-ease-in-out animate-delay-500' />
                                </div>
                                <span>{item.FloorNo}</span>
                            </div>
                            <div>
                                <IconDropdown />
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default RecentSction;